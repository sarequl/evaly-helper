/* eslint-disable no-undef */
class Storage {
	constructor() {}

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
				if (Object.keys(data).length === 0 && data.constructor === Object) {
					reject('no data returned by localStorage');
				} else {
					resolve(data);
				}
			});
		});
	}
}

const storage = new Storage();

async function getToken() {
	return new Promise(resolve => {
		// eslint-disable-next-line no-undef
		chrome.cookies.get({ url: 'https://evaly.com.bd', name: 'token' }, cookie => {
			if (cookie?.value !== null) {
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
		this.baseURL = 'https://api.evaly.com.bd';
		this.headers = { authorization: `Bearer ${token}` };
	}

	async getOrders({ cancel, pending }) {
		const res = await this.get('/core/custom/orders/?page=1&limit=1000');

		if (cancel === false && pending === true) {
			const orders = res.results.filter(order => order.order_status !== 'cancel');
			return orders;
		}

		if (cancel === true && pending === false) {
			const orders = res.results.filter(order => order.order_status !== 'pending');
			return orders;
		}

		const orders = res.results.filter(
			order => !(order.order_status === 'cancel' || order.order_status === 'pending')
		);

		return orders;
	}

	async getBalance() {
		const { username } = await storage.get('username');
		const res = await this.get(`pay/complete-balance/${username}`);
		return res.data;
	}

	async claimCashback() {
		const { username } = await storage.get('username');
		const res = await this.get(`pay/apply/cashback-balance/${username}`);
		return res.message;
	}
	async getInvoice(invoiceID) {
		const { data = history } = await this.get(`/core/orders/histories/${invoiceID}/`);
		const details = await this.get(`/core/custom/orders/${invoiceID}/`);
		return { ...details, history: { ...data.histories } };
	}

	get(endpoint) {
		return fetch(`${this.baseURL}/${endpoint}`, { headers: this.headers }).then(r => r.json());
	}
}

async function firstData() {
	if (await getToken()) {
		const { token } = await storage.get('token');
		const account = new EvalyAccount(token);
		const orders = await account.getOrders({ cancel: false, pending: true });

		const orderWithStatus = await Promise.all(
			orders.map(async order => {
				const { history, shop } = await account.getInvoice(order.invoice_no);
				return { history, shop, ...order };
			})
		);
		await storage.set({ orders: orderWithStatus });
		await storage.set({ username: orderWithStatus[0].customer.username });
	}
}

async function main() {
	if (!getToken()) return; //stop executing if the user is not logged in

	const { token } = await storage.get('token');
	const account = new EvalyAccount(token);
	const serverOrders = await account.getOrders({ cancel: true, pending: false });
	const { orders: existingData } = await storage.get('orders');

	const newOrders = serverOrders.filter(order => {
		//remove cancelled orders that does not exist in the current DB;
		if (order.order_status === 'cancel') {
			return findExisting(order.invoice_no, existingData);
		} else if (order.order_status !== 'cancel') {
			return true;
		}
		return false;
	});

	const newData = await Promise.all(
		newOrders.map(async order => {
			const storageData = existingData.find(e => e.invoice_no === order.invoice_no);
			if (storageData !== undefined) {
				if (storageData.order_status !== order.order_status) {
					order.isUpdated = Date.now();
					chrome.notifications.create(null, {
						type: 'basic',
						title: 'Order Update',
						message: `order ${order.invoice_no} was marked as '${order.order_status}', open extension to see details`,
						iconUrl: 'icons/icon128.png',
					});
					const { history, shop } = await getInvoice(order.invoice_no);
					return { history, shop, ...order };
				} else {
					return storageData;
				}
			}
			const { history, shop } = await getInvoice(order.invoice_no);
			return { history, shop, ...order };
		})
	);

	await storage.set({ orders: newData });
	const balance = await account.getBalance();
	if (balance.cashback_balance !== 0) {
		chrome.notifications.create(null, {
			type: 'basic',
			title: 'Cashback update',
			message: `৳${balance.cashback_balance} cashback can be claimed, open extension to claim it`,
			iconUrl: 'icons/icon128.png',
		});
	}
}

function findExisting(id, array) {
	//returns false if the item does not exist
	const data = array.find(el => el.invoice_no === id);
	if (!data) return false;
	return true;
}

async function userListener(change) {
	if (Object.keys(change)[0] === 'token') {
		const { orders } = await storage.get('orders');
		const res = await getInvoice(orders[0].invoice_no);
		if (res.detail === 'Not found.') {
			console.log('user changed resetting data');
			firstData().then(() => console.log('done'));
		}
	}
}

//chrome specific event listeners

chrome.runtime.onInstalled.addListener(() => {
	// create alarm after extension is installed / upgraded
	chrome.alarms.create('refresh', { periodInMinutes: 10 });
	firstData();
});

chrome.alarms.onAlarm.addListener(main);
chrome.runtime.onStartup.addListener(main);

chrome.storage.local.onChanged.addListener(userListener);
