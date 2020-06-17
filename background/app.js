/* eslint-disable no-undef */
class Storage {
	constructor() {
		this.type = 'chromeLocalStorage';
	}

	set(object) {
		return new Promise((resolve, reject) => {
			try {
				chrome.storage.local.set(object, resolve);
			} catch (e) {
				reject(e);
			}
		});
	}

	get(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, data => {
				if (Object.keys(data).length === 0 && data.constructor === Object) reject('no data returned by localStorage');
				resolve(data);
			});
		});
	}
}

const storage = new Storage();

async function getToken() {
	return new Promise((resolve) => {
		// eslint-disable-next-line no-undef
		chrome.cookies.get({ 'url': 'https://evaly.com.bd', 'name': 'token' }, cookie => {
			if (cookie.value !== null) {
				storage.set({ token: cookie.value });
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}

class EvalyAccount {
	constructor(token) {
		this.token = token;
	}

	async getOrders({ cancel, pending }) {
		const res = await fetch('https://api.evaly.com.bd/core/custom/orders/?page=1&limit=1000', {
			'headers': {
				'authorization': `Bearer ${this.token}`
			},
			'referrer': 'https://evaly.com.bd/',
			'method': 'GET',
		}).then(res => res.json());

		if (cancel === false && pending === true) {
			const orders = res.results.filter(order => order.order_status !== 'cancel');
			return orders;
		}

		if (cancel === true && pending === false) {
			const orders = res.results.filter(order => order.order_status !== 'pending');
			return orders;
		}

		const orders = res.results.filter(order => !(order.order_status === 'cancel' || order.order_status === 'pending'));
		return orders;

	}
}

async function getInvoice(invoiceID) {
	const { token } = await storage.get('token');
	const { data = history } = await fetch(`https://api.evaly.com.bd/core/orders/histories/${invoiceID}/`, {
		'headers': {
			'authorization': 'Bearer ' + token,
		},
	}).then(res => res.json());
	const details = await fetch(`https://api.evaly.com.bd/core/custom/orders/${invoiceID}/`, {
		'headers': {
			'authorization': 'Bearer ' + token,
		},
	}).then(res => res.json());
	return { ...details, history: { ...data.histories } };
}

async function firstData() {
	if (await getToken()) {
		const { token } = await storage.get('token');
		const account = new EvalyAccount(token);
		const orders = await account.getOrders({ cancel: false, pending: false });
		const orderWithStatus = await Promise.all(orders.map(async order => {
			const { history, shop } = await getInvoice(order.invoice_no);
			return { history, shop, ...order };
		}));
		await storage.set({ orders: orderWithStatus });
	}
}

async function main() {
	if (!getToken()) return; //stop executing if the user is not logged in

	const { token } = await storage.get('token');
	const account = new EvalyAccount(token);
	const orders = await account.getOrders({ cancel: true, pending: false });
	const orderWithStatus = await Promise.all(orders.map(async order => {
		const { history, shop } = await getInvoice(order.invoice_no);
		return { history, shop, ...order };
	}));
	const { orders: existingData } = await storage.get('orders');
	const newOrders = [];
	orderWithStatus.forEach(order => {
		if (!findExisting(order.invoice_no, existingData)) {
			newOrders.push(order);
		}
	});
	const currentData = [...newOrders, ...existingData]; //join new orders and current orders

	const nonExistingCancelledOrders = currentData.filter(order => { //remove cancelled orders that does not exist in the current DB;
		if (order.order_status === 'cancel') {
			return findExisting(order.invoice_no, existingData);
		} else if (order.order_status !== 'cancel') {
			return true;
		}
		return false;
	});

	const newData = nonExistingCancelledOrders.map(order => { //add a tag to the updated orders
		if (!findExisting(order.invoice_no, existingData)) {
			order.isUpdated = Date.now();
		}
		return order;
	});
	await storage.set({ orders: newData });
}

function findExisting(id, array) { //returns false if the item does not exist
	const filteredArr = array.filter(({ invoice_no }) => {
		if (id === invoice_no) return true;
		return false;
	});
	if (filteredArr.length === 0) return false;
	return true;
}


chrome.runtime.onInstalled.addListener(() => {
	// create alarm after extension is installed / upgraded
	chrome.alarms.create('refresh', { periodInMinutes: 10 });
	firstData();
});

chrome.alarms.onAlarm.addListener(main);