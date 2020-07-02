import storage from './storage';
export default async function getInvoice (invoiceID) {
	let access = await storage.get('token');
	const { data = history } = await fetch(`https://api.evaly.com.bd/core/orders/histories/${invoiceID}/`, {
		headers: {
			authorization: 'Bearer ' + access.token
		}
	}).then(res => res.json());
	const details = await fetch(`https://api.evaly.com.bd/core/custom/orders/${invoiceID}/`, {
		headers: {
			authorization: 'Bearer ' + access.token
		}
	}).then(res => res.json());
	return { ...details, history: { ...data.histories } };
}
