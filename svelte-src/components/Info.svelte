<script>
    import Paper,{Title,Content} from '@smui/paper';
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
    import storage from '../modules/storage';
    import {onMount} from 'svelte';
    import { scrollPos } from '../app';

    let processing,shipped,delivered,picked,cancel,total;
    
    async function filter(){
        window.scrollTo(0,$scrollPos);
        const {orders} = await storage.get('orders');
        total = orders.length
        processing = orders.filter(order => order.order_status === 'processing').length;
        shipped = orders.filter(order => order.order_status === 'shipped').length;
        delivered = orders.filter(order => order.order_status === 'delivered').length;
        picked = orders.filter(order => order.order_status === 'picked').length;
        cancel = orders.filter(order => order.order_status === 'cancel').length;
    }
    onMount(filter)
    chrome.storage.local.onChanged.addListener(filter);
</script>
{#if processing !== undefined}
    <div class="infoPaper">
        <Paper elevation={9} color={'primary'}>
            <Title class="countTitle">Total Active Orders: {total}</Title>
            <Content>
                <div>
                    <DataTable table$aria-label="Orders Count" class="countTable">
                        <Head>
                            <Row>
                                <Cell>Processing</Cell>
                                <Cell>Shipped</Cell>
                                <Cell>Picked</Cell>
                                <Cell>Delivered</Cell>
                            </Row>
                        </Head>
                        <Body>
                            <Row>
                                <Cell>{processing}</Cell>
                                <Cell>{shipped}</Cell>
                                <Cell>{picked}</Cell>
                                <Cell>{delivered}</Cell>
                            </Row>
                        </Body>
                    </DataTable>
                </div>
            </Content>
        </Paper>
    </div>
{/if}

<style>
.infoPaper{
    margin-bottom: 15px;
}
* :global(.countTitle){
    margin-bottom: 20px;
    text-align: center;
} 
* :global(.countTable){
    padding: 15px;
    text-align: center;
} 
</style>