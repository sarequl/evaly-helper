<script>
import Paper, { Title, Content } from '@smui/paper';

export let shopDetails;
let { logo_image, name, slug, contact_number , address } = shopDetails;

function openURL(){
    window.open('https://evaly.com.bd/shops/' + slug, '_blank');
}

if(contact_number == null || contact_number === '0') contact_number = false

</script>
<div class="shopPaperContainer">
    <Paper elevation={9} class="shopPaper">
        <Content>
            <div class="cardContainer">
                <img src="{logo_image}" alt="shop logo" class="shopImage" on:click={openURL}> 
                <div class="infoContainer">
                    <span class="shopTitle" on:click={openURL}>{name}</span>
                    <span class="shopLocation">{address}</span>
                    {#if contact_number !== false }
                        <span class="shopNumber">{contact_number}</span>
                    {/if}
                </div>
            </div>
        </Content>
    </Paper>
</div>
<style>
* :global(.shopPaper){
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
.shopPaperContainer {
	margin-bottom: 12px;
}
.shopImage{
    max-width: 100px;
    margin-right: 15px;
    cursor: pointer;
    object-fit: contain;
}
.shopTitle{
    font-weight: 600;
    cursor: pointer;
}
.shopNumber{
    color: #fff;
	font-weight: bold;
	background-color: #21d481;
	border-radius: 16px;
	text-align: center;
	width: 170px;
	margin-top: 10px;
}
</style>
