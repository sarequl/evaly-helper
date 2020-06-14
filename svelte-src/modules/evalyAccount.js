export default class EvalyAccount {
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
			const orders = res.results.filter(order => order.order_status === 'cancel');
			return orders;
		}

		if (cancel === true && pending === false) {
			const orders = res.results.filter(order => order.order_status === 'pending');
			return orders;
		}

		const orders = res.results.filter(order => !(order.order_status === 'cancel' || order.order_status === 'pending'));
		return orders;

	}

	// async init() {
	// 	let token = await fetch('https://api.evaly.com.bd/auth/api/login/', {
	// 		'headers': {
	// 			'content-type': 'application/json;charset=UTF-8',
	// 		},
	// 		'body': JSON.stringify({ username: this.username, password: this.password }),
	// 		'method': 'POST',
	// 	}).then(res => res.ok ? res.json() : new Error('Username and Password Does not match'));
	// 	this.token = token.access;
	// }

}