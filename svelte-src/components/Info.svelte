<script>
    import Paper,{Title,Content} from '@smui/paper';
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
    import {orders} from '../app';
    import {onMount} from 'svelte';

    let processing,shipped,delivered,picked,cancel;
    
    function filter(){
        let storeValue = $orders;
        processing = storeValue.filter(order => order.order_status === 'processing').length;
        shipped = storeValue.filter(order => order.order_status === 'shipped').length;
        delivered = storeValue.filter(order => order.order_status === 'delivered').length;
        picked = storeValue.filter(order => order.order_status === 'picked').length;
        cancel = storeValue.filter(order => order.order_status === 'cancel').length;
    }
    onMount(filter)
</script>
<div class="infoPaper">
    <Paper elevation={9} color={'primary'}>
        <Title class="infoTitle">Total Active Orders: {$orders.length}</Title>
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
<style>
.infoPaper{
    margin-bottom: 15px;
}
* :global(.infoTitle){
    margin-bottom: 20px!important;
    text-align: center;
} 
* :global(.countTable){
    padding: 15px;
    text-align: center;
} 
</style>