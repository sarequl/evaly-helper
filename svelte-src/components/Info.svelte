<script>
	import { onMount } from 'svelte';
	import storage from '../modules/storage';

	onMount(count);

	let processing, shipped, delivered, picked;

	async function count() {
		try {
			const { orders } = await storage.get('orders').catch(console.log);
			processing = orders.filter(order => order.order_status === 'processing').length;
			shipped = orders.filter(order => order.order_status === 'shipped').length;
			delivered = orders.filter(order => order.order_status === 'delivered').length;
			picked = orders.filter(order => order.order_status === 'picked').length;
		} catch (error) {
			console.log(error);
		}
	}
	chrome.storage.local.onChanged.addListener(count);
</script>

{#if processing !== undefined}Processing: {processing}<br /> picked: {picked}<br /> shipped: {shipped}<br /> delivered: {delivered}{/if}

<style>
</style>
