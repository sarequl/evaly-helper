<script>
import EvalyAccount from '../modules/evalyAccount';
import {token} from '../app';


async function main(){
    const account = new EvalyAccount($token);
    const orders = await account.getOrders({ cancel: false, pending: false })
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
           <h2>{order.invoice_no}</h2>
           <p>status: {order.order_status}</p>
           <p>Order Date: {new Date(order.date).toLocaleString()}</p>
        {/each}
    {:catch}
    <p>an error occured</p>
    {/await}
</section>