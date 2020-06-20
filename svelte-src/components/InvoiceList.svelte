<script>
import { onMount } from 'svelte';
import { detailedView, filterKeys } from '../app';
import storage from '../modules/storage';

import FilterComponent from './FilterComponent.svelte';
import SingleCard from './SingleCard.svelte';
import InvoiceView from './InvoiceView.svelte';
import Info from './Info.svelte';

onMount(readOrders);

let orders = [];
let orders2 = [];

let y = 0;

function filter(values) {
	let filteredArr = []
	console.log(values);
	values.forEach(key => {
		let arr = orders.filter(order => order.order_status === key).forEach(e => filteredArr.push(e))
	});
	console.log(filteredArr);
	orders2 = [...filteredArr];
}

filterKeys.subscribe(filter)

async function readOrders() {
	let data = await storage.get('orders').catch(console.log);
	orders = data.orders;
	orders2 = data.orders;
}
chrome.storage.local.onChanged.addListener(readOrders);

</script>

<div class="list">
	<FilterComponent />
	{#if $detailedView === 0}
        {#if orders2.length !== 0 }
            <Info />
            {#each orders2 as order (order.invoice_no) }
                <SingleCard orderDetails={order} />
            {/each}
        {:else}
            <div class="loader">Loading...</div>
            <h3>no data yet, Fetching your orders, please wait...</h3>
        {/if}
    {:else}
        <InvoiceView />
    {/if}
</div>
<style>
.loader,
.loader:after {
	border-radius: 50%;
	width: 10em;
  	height: 10em;
}
.loader {
	margin: 60px auto;
	font-size: 10px;
	position: relative;
	text-indent: -9999em;
	border-top: 1.1em solid rgba(255, 255, 255, 0.2);
	border-right: 1.1em solid rgba(255, 255, 255, 0.2);
	border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
	border-left: 1.1em solid #1152df;
	transform: translateZ(0);
	animation: load8 1.1s infinite linear;
}

@keyframes load8 {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

</style>