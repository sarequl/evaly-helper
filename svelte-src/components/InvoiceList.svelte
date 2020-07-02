<script>
import { onMount, afterUpdate } from 'svelte';
import { detailedView, filterKeys, sortKey, scrollPos } from '../app';
import storage from '../modules/storage';

import FilterComponent from './FilterComponent.svelte';
import SingleCard from './SingleCard.svelte';
import InvoiceView from './InvoiceView.svelte';
import Info from './Info.svelte';

let orders = [];
let orders2 = [];
let y = 0;

function filter(values) {
	try {
		let filteredArr = []
		for (let i = 0; i < values.length; i++) {
			let newArr = orders.filter(order => order.order_status === values[i]);
			for(let j = 0; j < newArr.length; j++){
				filteredArr.push(newArr[j]);
			}
		}
		orders2 = [...filteredArr];
		sort($sortKey);
	} catch (error) {
		console.log(error);
	}
}

function sort(order){
	try {
		switch (order) {
			case 'dateNew':
				orders2 = orders2.sort((a,b) => new Date(b.date) - new Date(a.date));
				break;
			case 'dateOld':
				orders2 = orders2.sort((a,b) => new Date(a.date) - new Date(b.date));
				break;
			case 'priceHigh':
				orders2 = orders2.sort((a,b) => parseInt(b.total) - parseInt(a.total));
				break;
			case 'priceLow':
				orders2 = orders2.sort((a,b) => parseInt(a.total) - parseInt(b.total));
				break;
			case 'updatedNew':
				orders2 = orders2.sort((a,b) => {
					if (a.isUpdated == null) {
						return 1;
					} else if (b.isUpdated == null) {
						return -1;
					} else{
						return new Date(b.isUpdated) < new Date(a.isUpdated) ? -1 : 1;
					}
				});
				break;
			default:
				orders2 = orders2.sort((a,b) => new Date(b.date) - new Date(a.date));
				break;
		}
	} catch (error) {
		console.log(error);
	}
}

async function readOrders() {
	try {
		let data = await storage.get('orders').catch(console.log);
		orders = data.orders;
		orders2 = data.orders;
	} catch (error) {
		console.log(error);
	}
}

filterKeys.subscribe(filter);
sortKey.subscribe(sort);
chrome.storage.local.onChanged.addListener(readOrders);

afterUpdate(() => {
	setTimeout(() => {
		window.scrollTo({
			top: $scrollPos,
			left: 0,
		});
	}, 100);
})

onMount(readOrders);

</script>

<div class="list">
	{#if $detailedView === 0}
        {#if orders2.length !== 0 }
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