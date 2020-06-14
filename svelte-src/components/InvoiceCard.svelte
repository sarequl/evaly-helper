<script>
import EvalyAccount from '../modules/evalyAccount';
import {token, spinner } from '../app';
import SingleCard from './SingleCard.svelte';


async function main(){
    const account = new EvalyAccount($token);
    spinner.set(true)
    const orders = await account.getOrders({ cancel: false, pending: false })
    spinner.set(false)
    return orders;
}
async function getInvoiceHistory(invoice){
    return await invoice.getHistory($token);
}

</script>
<section>
    {#await main()}
    <p>loading invoices</p>
    {:then orders}
        {#each orders as order}
        <SingleCard status={order.order_status} invoiceID={order.invoice_no} amount={order.total} date={order.date}/>
           <!-- <div class="invoice-card">
            <h2>{order.invoice_no} <span>{order.order_status}</span></h2>
            <h4>TK {order.total}</h4>
            <p>Order Date: {new Date(order.date).toLocaleString()}</p>
           </div> -->
        {/each}
    {:catch}
    <p>an error occured</p>
    {/await}
</section>
