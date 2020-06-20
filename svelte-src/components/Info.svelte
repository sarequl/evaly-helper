<script>
import { onMount } from 'svelte';
import { scrollPos, filterKeys } from '../app';
import storage from '../modules/storage';


onMount(count);

let processing,shipped,delivered,picked;

async function count(){
	const {orders} = await storage.get('orders');
	processing = orders.filter(order => order.order_status === 'processing').length;
	shipped = orders.filter(order => order.order_status === 'shipped').length;
	delivered = orders.filter(order => order.order_status === 'delivered').length;
	picked = orders.filter(order => order.order_status === 'picked').length;
}
chrome.storage.local.onChanged.addListener(count);
</script>


{#if processing !== undefined}
    Processing: {processing}<br>
    picked: {picked}<br>
    shipped: {shipped}<br>
    delivered: {delivered}
{/if}

<style>

</style>