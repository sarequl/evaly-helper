<script>
    import Paper, {Title, Content} from '@smui/paper';
    export let status;
    export let invoiceID;
    export let date;
    export let amount;
    
</script>
<div class="paper-demo">
    <Paper class="paper-test">
        <Title class="title">{invoiceID} <span class="{status}" >{status}</span></Title>
        <Content>
            <div class="invoice-card">
                <h4>TK {amount}</h4>
                <p>Order Date: {new Date(date).toLocaleString()}</p>
            </div>
        </Content>
    </Paper>
</div>
<style>
.invoice-card{
    margin:0;
    line-height: 0;
    margin-block-end: 0;
    margin-block-start: 0;
}
* :global(.paper-test){
    color: #fff;
    background-color: #215dfd;
    background-image: linear-gradient(62deg, #215dfd 0%, #21f1ff 100%);
    box-shadow: 0 4px 4px rgba(54,176,247,.220), 0 5px 5px rgba(32,141,243,0.200);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    padding:10px;
}
* :global(.paper-test:hover){
    background-image: linear-gradient(62deg, rgb(33, 93, 253) 0%, rgb(33, 241, 255) 100%);
    opacity: 0.8;
    box-shadow: 0 14px 28px rgba(28, 141, 233, 0.568), 0 10px 10px rgba(35, 183, 241, 0.22);
}
.paper-demo {
    margin-bottom: 20px;
}
span{
    padding: 6px;
    font-size: 60%;
    margin-left: 100px;
    border-radius: 5px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
}
span.processing {
    background: #2196F3;
    box-shadow: 2px 2px 9px 0px #2196f396;
}
span.shipped {
    background: #a826d9;
	box-shadow: 2px 2px 9px 0 #a826d991;
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