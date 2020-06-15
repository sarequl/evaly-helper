<script>
import { onMount } from 'svelte';
import {token, spinner, detailedView } from '../app';
import SingleCard from './SingleCard.svelte';
import InvoiceView from './InvoiceView.svelte';

//state and functions
import {main, orders} from '../app'
onMount(main);

// async function getInvoiceHistory(invoice){
//     return await invoice.getHistory($token);
// }

</script>
<div class="list">
    {#if $detailedView === 1}
        {#if $orders}
            {#each $orders as order}
                <SingleCard status={order.order_status} invoiceID={order.invoice_no} amount={order.total} date={order.date}/>
            {/each}

        {:else}
            <p>no data yet, press reload</p>
        {/if}
    {:else}
        <svelte:component this={InvoiceView}></svelte:component>
    {/if}
</div>


