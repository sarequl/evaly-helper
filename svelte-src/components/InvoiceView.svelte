<script>
import './buttons.scss';
import Fab, {Label, Icon} from '@smui/fab';
import Paper, {Title, Subtitle, Content} from '@smui/paper';
import Button from '@smui/button';
import {token, spinner, detailedView } from '../app';
import getInvoice from '../modules/invoice';
import {onMount} from 'svelte';
let invoiceData = false;
onMount(async () => invoiceData = await getInvoice($detailedView))

function goBack(){
    detailedView.set(1);
}
let spinOn = () => spinner.set(true)
let spinOff = () => spinner.set(false)
</script>

{#if !invoiceData}
	<aside>{spinOn()}</aside>
{:else}
	<aside>{spinOff()}</aside>
	<div class="paper-container">
		<Paper elevation={9} color={'primary'} >
			<Button  on:click={goBack} variant="raised" color="secondary" class="button-shaped-round"><Icon class="material-icons">arrow_back</Icon> <Label>Go Back</Label></Button>
			<Title class="invoiceTitle">{invoiceData.invoice_no}</Title>
			<Content>
				<Paper elevation={2} class="progressPaper">
					<div class="line">
					</div>
					<div class="progress">
						<Fab color="primary" class="fabMargin"><Icon class="material-icons">check_circle_outline</Icon></Fab>
						<Fab color="primary" class="fabMargin"><Icon class="material-icons">check_circle</Icon></Fab>
						<Fab color="primary"><Icon class="material-icons">check_circle</Icon></Fab>
					</div>
					<Paper elevation={9} color={'primary'} class="progressPaper">
						<Title>{invoiceData.history[0].order_status}</Title>
						<Content>
							<p>{invoiceData.history[0].note}</p>
						</Content>
					</Paper>
				</Paper>
			</Content>

		</Paper>
	</div>
{/if}


<style>

	* :global(.invoiceTitle){
		margin-top: 15px;
	}

	aside{
		display: none;
	}

	* :global(.progressPaper){
		margin-top:20px;
	}

	.line:before{
		content: '';
		position: absolute;
		top: 42%;
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