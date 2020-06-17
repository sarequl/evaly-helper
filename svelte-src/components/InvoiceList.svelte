<script>
import { onMount } from 'svelte';
import { detailedView } from '../app';
import SingleCard from './SingleCard.svelte';
import InvoiceView from './InvoiceView.svelte';

//state and functions
import {main, orders} from '../app'
onMount(main);
</script>

<div class="list">
    {#if $detailedView === 1}
        {#if $orders.length !== 0}
            <!-- add order length, balance etc[todo] -->
            {#each $orders as order}
                <SingleCard status={order.order_status} statusPrev={order.history[1].order_status} shopName={order.shop.name} invoiceID={order.invoice_no} amount={order.total} date={order.date}/>
            {/each}
        {:else}
            <p>no data yet, Fetching your orders, please wait...</p>
        {/if}
    {:else}
        <svelte:component this={InvoiceView}></svelte:component>
    {/if}
</div>


