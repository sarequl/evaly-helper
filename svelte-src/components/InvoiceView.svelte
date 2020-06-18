<script>
import ActionButton from './ActionButton.svelte';
import Fab, {Label, Icon} from '@smui/fab';
import Paper, {Title, Content} from '@smui/paper';
import OrderStatusPaper from './OrderStatusPaper.svelte';
import OrderItem from './OrderItem.svelte';
import {token, spinner, detailedView } from '../app';
import getInvoice from '../modules/invoice';
import {onMount} from 'svelte';

let invoiceData = false;
let note = '';
let status = '';
onMount(async () => {
	invoiceData = await getInvoice($detailedView)
	note = invoiceData.history[0].note;
	status = invoiceData.history[0].order_status;
	window.scrollTo(0, 0);
	}
);

function changeHistory(id){
	note = invoiceData.history[id].note;
	status = invoiceData.history[id].order_status;
}

function goBack(){
    detailedView.set(1);
}

let spinOn = () => spinner.set(true);
let spinOff = () => spinner.set(false);

</script>

{#if !invoiceData}
	<aside>{spinOn()}</aside>
{:else}
	<aside>{spinOff()}</aside>
	<div class="paper-container">
		<Paper elevation={9} color={'primary'} >
			<ActionButton clickHandler={goBack} icon={'arrow_back'} text={'Go Back'} />
			<Title class="invoiceTitle">{invoiceData.invoice_no}</Title>
			<Content>
				<Paper elevation={2} class="progressPaper">
					<div class="line">
					</div>
					<div class="progress">
						<Fab color="primary" class="fabMargin" on:click={() => changeHistory(0)} ><Icon class="material-icons">check_circle_outline</Icon></Fab>
						<Fab color="primary" class="fabMargin" on:click={() => changeHistory(1)} ><Icon class="material-icons">check_circle</Icon></Fab>
						<Fab color="primary" on:click={() => changeHistory(2)}><Icon class="material-icons" >check_circle</Icon></Fab>
					</div>
					<OrderStatusPaper note={note} status={status} />
				</Paper>
			</Content>
			<Title class="secondaryTitle">Items</Title>
			<Content>
				{#each invoiceData.order_items as product}
					<OrderItem item={product} />
				{/each}
			</Content>
			<Title class="secondaryTitle">Shop</Title>
			<Content>Coming soon</Content>
		</Paper>
		
	</div>
{/if}


<style>

	* :global(.invoiceTitle){
		margin-top: 15px;
	}

	* :global(.secondaryTitle){
		margin-top: 15px;
		margin-bottom: 15px;
	}

	aside{
		display: none;
	}

	* :global(.progressPaper){
		margin-top:20px;
	}

	.line{
		position: relative;
	}
	.line:before{
		content: '';
		position: absolute;
		top: 30px;
		left: 33%;
		border-top: 1px solid #1152df;
		background: #1152df;
		width: 150px;
		transform: translateY(-50%);
	}
	.progress{
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		align-content: space-between;
		justify-content: center;
	}
	* :global(.fabMargin){
		margin-right:30px;
	}
</style>