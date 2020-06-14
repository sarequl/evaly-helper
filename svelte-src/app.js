import { writable } from 'svelte/store';
import storage from './modules/storage';
import EvalyAccount from './modules/evalyAccount';
export default function getCookie(callback) {
	// eslint-disable-next-line no-undef
	chrome.cookies.get({ 'url': 'https://evaly.com.bd', 'name': 'token' }, cookie => cookie ? callback(cookie.value) : void (0));
}


export const token = writable('none');
export const spinner = writable(false);
export const orders = writable(null);

export async function main(reload) {
	spinner.set(true);
	if (reload) {
		const tokenObj = await storage.get('token');
		const account = new EvalyAccount(tokenObj.token);
		const orders = await account.getOrders({ cancel: false, pending: false });
		await storage.set({ orders });
	}
	const ordersObj = await storage.get('orders');
	orders.set(ordersObj.orders);
	spinner.set(false);
}