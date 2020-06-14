<script>
    import Paper, {Title, Content} from '@smui/paper';
    export let status;
    export let invoiceID;
    export let date;
    export let amount;
    let color = 'secondary';
    let elevation= 8;
    function hover() {
        color = 'primary';
        elevation = 15;
    }
    function leave() {
        color = 'secondary';
        elevation = 8;
    }
</script>
<div class="paper-demo">
    <Paper transition {elevation} {color} on:mouseenter={hover} on:mouseleave={leave}>
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
    .paper-demo {
        margin-bottom: 20px;
    }
    span.processing {
        text-transform: uppercase;
        background: #2196F3;
        padding: 6px;
        font-size: 60%;
        margin-left: 100px;
        border-radius: 5px;
        font-weight: 600;
        text-align: center;
        box-shadow: 2px 2px 9px 0px #2196f396;
    }
    span.shipped {
        text-transform: uppercase;
        background: #21f32c;
        padding: 6px;
        font-size: 60%;
        margin-left: 100px;
        border-radius: 5px;
        font-weight: 600;
        text-align: center;
        box-shadow: 2px 2px 9px 0px #52f32196;
    }
    span.delivered {
        text-transform: uppercase;
        background: #f321e2;
        padding: 6px;
        font-size: 60%;
        margin-left: 100px;
        border-radius: 5px;
        font-weight: 600;
        text-align: center;
        box-shadow: 2px 2px 9px 0px #f3216796;
    }
    span.cancel {
        text-transform: uppercase;
        background: #f32121;
        padding: 6px;
        font-size: 60%;
        margin-left: 100px;
        border-radius: 5px;
        font-weight: 600;
        text-align: center;
        box-shadow: 2px 2px 9px 0px #f3212196;
    }
</style>