<script>
import Paper, {Title, Content} from '@smui/paper';
import Fab, {Icon} from '@smui/fab';
import {parseDate , detailedView } from '../app';
export let status;
export let invoiceID;
export let date;
export let amount;

function changeView(id){
    detailedView.set(id)
}
</script>

<div class="paper">
    <Paper class="paper-bg">
        <div class="invoice-card">
            <Title class="title">{invoiceID} <span class="{status}" >{status}</span></Title>
            <Content>
                <h4>TK {amount}</h4>
                <small>{parseDate(date)}</small>
                <Fab on:click={() => changeView(invoiceID)} class="fab" color="primary" mini><Icon class="material-icons">arrow_forward</Icon></Fab>
            </Content>
        </div>
    </Paper>
</div>
<style>
* :global(.fab){
    margin-inline-start: 93px;
}
small{
    font-style: italic;
}
.invoice-card{
    margin:0;
    line-height: 0;
    margin-block-end: 0!important;
    margin-block-start: 0!important;
}
.invoice-card h4{
    margin-block-end: 0;
	margin-block-start: 0;
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
span{
    align-self: flex-end;
    margin-left: 100px;
    padding: 6px;
    font-size: 60%;
    border-radius: 5px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
}
span.processing {
    background: #3c2bff;
	box-shadow: 2px 2px 9px 0 #3c2bff6e;
}
span.shipped {
    background: #8b19ff;
	box-shadow: 2px 2px 9px 0 #8b19ff8f;
}
span.delivered {
    background: #f321e2;
    box-shadow: 2px 2px 9px 0px #f3216796;
}
span.cancel {
    background: #f32121;
    box-shadow: 2px 2px 9px 0px #f3212196;
}
span.picked {
    background: #f36e21;
    box-shadow: 2px 2px 9px 0px #f3872196;
}
    
</style>