<script>
import { onMount } from 'svelte';
import {token, spinner } from '../app';
import SingleCard from './SingleCard.svelte';

import {main, orders} from '../app'


onMount(async () => await main());

// async function getInvoiceHistory(invoice){
//     return await invoice.getHistory($token);
// }

</script>

<section>
{#if $orders}
    {#each $orders as order}
        <SingleCard status={order.order_status} invoiceID={order.invoice_no} amount={order.total} date={order.date}/>
    {/each}

{:else}
    <p>no data yet, press reload</p>
{/if}
</section>
