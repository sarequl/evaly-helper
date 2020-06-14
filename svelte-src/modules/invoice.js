export default class Invoice {
	constructor(invoiceData) {
		this.invoice = invoiceData;
	}
	async getHistory(token) {
		const history = await fetch('https://api.evaly.com.bd/core/orders/histories/EVL499991364/', {
			'headers': {
				'authorization': 'Bearer ' + token,
			},
		}).then(res => res.json());
		return history.data;
	}

}