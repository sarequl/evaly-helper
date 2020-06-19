<script>
import {onMount} from 'svelte';
import { detailedView } from '../app';
import SingleCard from './SingleCard.svelte';
import InvoiceView from './InvoiceView.svelte';
import Info from './Info.svelte';
import storage from '../modules/storage';

$: orders = [];
export async function readOrders(){
  storage.get('orders').then(data => orders = data.orders).catch(console.log);
}
chrome.storage.local.onChanged.addListener(readOrders);
onMount(readOrders);
</script>

<div class="list">
    {#if $detailedView === 1}
        {#if orders.length !== 0 }
            <Info />
            {#each orders as order}
                <SingleCard orderDetails={order} />
            {/each}
        {:else}
            <div class="loader">Loading...</div>
            <h3>no data yet, Fetching your orders, please wait...</h3>
        {/if}
    {:else}
        <svelte:component this={InvoiceView}></svelte:component>
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
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>