import { writable } from 'svelte/store';
import storage from './modules/storage';
// import getInvoice from './modules/invoice';
// import EvalyAccount from './modules/evalyAccount';


export const token = writable('none');
export const spinner = writable(false);
export const detailedView = writable(0);
export const scrollPos = writable(0);

//get Token and save to store and LocalStorage
export default async function getToken() {
	return new Promise((resolve) => {
		// eslint-disable-next-line no-undef
		chrome.cookies.get({ 'url': 'https://evaly.com.bd', 'name': 'token' }, cookie => {
			if (cookie.value !== null) {
				token.set(cookie.value);
				storage.set({ token: cookie.value });
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}

//main function to get orders and save to localStorage
export async function main() {
	spinner.set(true);
	setTimeout(() => {
		spinner.set(false);
	}, 2000);
	// const { token } = await storage.get('token');
	// const account = new EvalyAccount(token);
	// const serverOrders = await account.getOrders({ cancel: true, pending: false });
	// const { orders: existingData } = await storage.get('orders');

	// const newOrders = serverOrders.filter(order => { //remove cancelled orders that does not exist in the current DB;
	// 	if (order.order_status === 'cancel') {
	// 		return findExisting(order.invoice_no, existingData);
	// 	} else if (order.order_status !== 'cancel') {
	// 		return true;
	// 	}
	// 	return false;
	// });

	// 	const newData = await Promise.all(newOrders.map(async order => {
	// 		const storageData = existingData.find(e => e.invoice_no === order.invoice_no);
	// 		console.log(storageData);
	// 		if (storageData !== undefined) {
	// 			if (storageData.status !== order.status) {
	// 				order.isUpdated = Date.now();
	// 				const { history, shop } = await getInvoice(order.invoice_no);
	// 				return { history, shop, ...order };
	// 			} else {
	// 				return storageData;
	// 			}
	// 		}
	// 		const { history, shop } = await getInvoice(order.invoice_no);
	// 		return { history, shop, ...order };
	// 	}));
	// 	// await storage.set({ orders: newData });
	// 	// spinner.set(false);
	// 	// return;
}

export function parseDate(date) {
	const dateStr = new Date(date).toDateString();
	const time = new Date(date).toLocaleTimeString();
	const arr = time.split(':');
	arr[2] = arr[2].split(' ')[1]; //remove seconds
	const final = `${arr[0]}:${arr[1]} ${arr[2]}`;
	return `${dateStr} ${final}`;
}

// function findExisting(id, array) { //returns false if the item does not exist
// 	const data = array.find(el => el.invoice_no === id);
// 	if (data === undefined) return false;
// 	return true;
// }
