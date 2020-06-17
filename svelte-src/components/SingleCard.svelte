<script>
import ActionButton from './ActionButton.svelte';
import Paper, {Title, Content} from '@smui/paper';
import {parseDate , detailedView } from '../app';
export let orderDetails;
const { order_status, invoice_no, history , date, total, shop, isUpdated} = orderDetails;

function showUpdateBadge(){
    const currentDate = Date.now()
    if ('isUpdated' in orderDetails){
        const time = currentDate - isUpdated;
        if( (((time / 1000) /60) / 60) / 24 < 7){
            return true
        }
    }
    return false;
}

function changeView(id){
    detailedView.set(id)
}
</script>

<div class="paper">
    <Paper class="paper-bg">
        <div class="invoice-card">
            <Title class="title">
                {invoice_no} 
                <div class="{order_status} common" > 
                    {history[1].order_status}
                    <span class="material-icons">arrow_right_alt</span>
                    {order_status}
                </div>
            </Title>
            <Content>
                <Paper class="detailsPaper" elevation={9} color={'primary'}>
                    <Title class="amount">
                        TK {parseInt(total).toFixed()}
                        {#if showUpdateBadge()}
                            <div class="updatedBadge">updated</div>
                        {/if}
                    </Title>
                    <Content>
                        <p>{shop.name}</p>
                        <p>{parseDate(date)}</p>
                        <ActionButton clickHandler={() => changeView(invoice_no)} icon={'arrow_forward'} text={'Go To Details'} first={false} />
                    </Content>
                </Paper>
            </Content>
        </div>
    </Paper>
</div>
<style>
span{
    vertical-align: middle;
	padding-bottom: 4px;
}
* :global(.fab){
    margin-inline-start: 93px;
}
* :global(.detailsPaper){
    margin: 12px 0 3px 0px;
	padding: 15px;
}

* :global(.detailsPaper p){
    margin-block-start: 5px;
	margin-block-end: 5px;
}
.invoice-card{
    margin:0;
    line-height: 0;
    margin-block-end: 0!important;
    margin-block-start: 0!important;
    position: relative;
}


* :global(.paper-bg){
    color: #fff;
    background-color: #215dfd;
    background-image: linear-gradient(62deg, #215dfd 0%, #21f1ff 100%);
    box-shadow: 0 4px 4px rgba(54,176,247,.220), 0 5px 5px rgba(32,141,243,0.200);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    padding:10px;
}
* :global(.paper-bg:hover){
    background-image: linear-gradient(62deg, rgb(33, 93, 253) 0%, rgb(33, 241, 255) 100%);
    /* opacity: 0.8; */
    box-shadow: 0 14px 28px rgba(28, 141, 233, 0.568), 0 10px 10px rgba(35, 183, 241, 0.22);
}
.paper{
    margin-bottom: 15px;
}
.common{
    margin-left: 30px;
	font-size: 13.5px;
	border-radius: 16px;
	font-weight: 500;
	text-align: center;
	text-transform: uppercase;
	display: inline-block;
	width: 204px;
}
.updatedBadge{
    width: 90px;
	margin-left: 170px;
	background: #21d481;
	box-shadow: 0px 2px 5px 0px rgba(4, 109, 60, 0.48);
	font-size: 13.5px;
	border-radius: 16px;
	font-weight: 500;
	text-align: center;
	text-transform: uppercase;
	display: inline-block;
}
.processing {
    background: #3c2bff;
	box-shadow: 2px 2px 9px 0 #3c2bff6e;
}
.shipped {
    background: #8b19ff;
	box-shadow: 2px 2px 9px 0 #8b19ff8f;
}
.delivered {
    background: #f321e2;
    box-shadow: 2px 2px 9px 0px #f3216796;
}
.cancel {
    background: #f32121;
    box-shadow: 2px 2px 9px 0px #f3212196;
}
.picked {
    background: #f36e21;
    box-shadow: 2px 2px 9px 0px #f3872196;
}
    
</style>