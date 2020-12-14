import storage from './storage';
export default class EvalyAccount {
	constructor(token) {
		this.token = token;
	}

	async getOrders({ cancel, pending }) {
		const res = await fetch('https://api.evaly.com.bd/core/custom/orders/?page=1&limit=1000', {
			headers: {
				authorization: `Bearer ${this.token}`,
			},
			referrer: 'https://evaly.com.bd/',
			method: 'GET',
		}).then(res => res.json());

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
		const res = await fetch(`https://api.evaly.com.bd/auth/user-info-pay/${username}/`, {
			headers: {
				authorization: `Bearer ${this.token}`,
			},
			referrer: 'https://evaly.com.bd/',
			method: 'GET',
		}).then(res => res.json());
		return res.data;
	}
	async claimCashback() {
		const { username } = await storage.get('username');
		const res = await fetch(
			`https://api.evaly.com.bd/pay/apply/cashback-balance/${username}/`,
			{
				headers: {
					authorization: `Bearer ${this.token}`,
				},
				referrer: 'https://evaly.com.bd/',
				method: 'GET',
			}
		).then(res => res.json());
		return res.message;
	}
}
