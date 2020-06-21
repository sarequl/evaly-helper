import { writable } from 'svelte/store';
import storage from './modules/storage';
import EvalyAccount from './modules/evalyAccount';
// import getInvoice from './modules/invoice';


export const token = writable('none');
export const spinner = writable(false);
export const detailedView = writable(0);
export const scrollPos = writable(0);
export const filterKeys = writable(['processing', 'picked', 'shipped', 'delivered']);
export const sortKey = writable('dateNew');
export const isDrawerOpen = writable(false);

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
}

export function parseDate(date) {
	const dateStr = new Date(date).toDateString();
	const time = new Date(date).toLocaleTimeString();
	const arr = time.split(':');
	arr[2] = arr[2].split(' ')[1]; //remove seconds
	const final = `${arr[0]}:${arr[1]} ${arr[2]}`;
	return `${dateStr} ${final}`;
}

export function calcDays(strDate) {
	const currentDate = Date.now();
	const time = currentDate - new Date(strDate);
	const days = Math.round((((time / 1000) / 60) / 60) / 24);
	if (days < 2) return `${days} day ago`;
	return `${days} days ago`;
}

export async function getBalance() {
	const { token } = await storage.get('token').catch(console.log);
	const account = new EvalyAccount(token);
	return await account.getBalance();
}
export async function claimBalance(callBack) {
	const { token } = await storage.get('token').catch(console.log);
	const account = new EvalyAccount(token);
	await account.claimCashback();
	setTimeout(callBack, 1000);
}