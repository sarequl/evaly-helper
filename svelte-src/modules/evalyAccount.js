import storage from './storage';

export default class EvalyAccount {
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

	get(endpoint) {
		return fetch(`${this.baseURL}/${endpoint}`, { headers: this.headers }).then(r => r.json());
	}
}
