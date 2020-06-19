<script>
    import Paper, { Title, Content} from '@smui/paper';
    export let item;
    let { item_images, item_name, order_time_price, product_slug, quantity } = item;
    function openURL(){
        window.open('https://evaly.com.bd/products/' + product_slug, '_blank');
    }
</script>

<div class="orderedItems">
    <Paper elevation={9} class="orderedItemsPaper">
        <Content>
            <div class="cardContainer">
                <img src="{item_images[0]}" alt="item_name" class="productImage" on:click={openURL}> 
                <div class="infoContainer">
                    <span class="productTitle" on:click={openURL}>{item_name} X {quantity}</span>
                    <span class="productPrice">Price: TK {parseInt(order_time_price).toFixed()}</span>
                </div>
            </div>
        </Content>
    </Paper>
</div>


<style>
* :global(.orderedItemsPaper){
    padding: 8px;
}
.cardContainer{
    display: flex;
    flex-direction: row;
    padding: 10px 0;
}

.infoContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.orderedItems {
	margin-bottom: 12px;
}
.productImage{
    max-width: 100px;
    margin-right: 15px;
    cursor: pointer;
}
.productTitle{
    font-weight: 600;
    cursor: pointer;
}
.productPrice{
    color: #fff;
	font-weight: bold;
	background-color: #21d481;
	border-radius: 16px;
	text-align: center;
	width: 170px;
	margin-top: 10px;
}



</style>