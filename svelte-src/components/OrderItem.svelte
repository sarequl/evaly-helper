<script>
    import Paper, { Title, Content} from '@smui/paper';
    export let item;
    let { item_images, item_name, order_time_price, product_slug, quantity } = item;
    function openURL(){
        window.open('https://evaly.com.bd/products/' + product_slug, '_blank');
    }
</script>

<div class="orderedItems">
    <Paper elevation={9} >
        <Content>
            <h3 class="productTitle" on:click={openURL}>{item_name} X {quantity}</h3>
            <h4 class="productPrice">Price: TK {parseInt(order_time_price).toFixed()}</h4>
            <img src="{item_images[0]}" alt="item_name" class="productImage">       
        </Content>
    </Paper>
</div>


<style>
.orderedItems {
	margin-bottom: 12px;
}
.productImage{
    max-width: 330px;
    padding: 5px;
}
.productTitle{
    margin: 0;
}
.productPrice{
    margin-top:5px;
}

/* .card-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    min-width: 380px;
    background-color: #f8f8f8;
    margin-right: 20px;
    margin-bottom: 20px;
} */


</style>