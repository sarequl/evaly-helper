import { writable } from 'svelte/store';
export default function getCookie(callback) {
	// eslint-disable-next-line no-undef
	chrome.cookies.get({ 'url': 'https://evaly.com.bd', 'name': 'token' }, cookie => cookie ? callback(cookie.value) : void (0));
}


export const token = writable('none');
export const spinner = writable(false);