<script> 
import { onMount } from 'svelte';
import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
import IconButton from '@smui/icon-button';
import LinearProgress from '@smui/linear-progress';
import ActionButton from './ActionButton.svelte';
import ReloadButton from './ReloadButton.svelte';
import { getBalance, spinner, claimBalance } from '../app';

let balance = 0;
let claim = false;
let pending = 0; 

function checkBalance(){
	getBalance()
		.then(data => {
			balance = data.balance;
			if(data.cashback_balance !== 0){
				claim = true;
			}
		})
		.catch(console.log);
	console.log('trigerred');
}
onMount(checkBalance);
chrome.storage.local.onChanged.addListener(checkBalance);
export let clickHandler;
</script>

<div class="top-app-bar-container">
	<TopAppBar variant="static">
		<Row>
			<Section>
				<IconButton toggle on:click={() => clickHandler()} class="material-icons">menu</IconButton>
				<!-- <IconButton toggle on:click={()=> mySnackbarB.open()} class="material-icons">menu</IconButton> -->
				<Title class="appBarTitle">Evaly Helper</Title>
			</Section>
			<Section align="end" toolbar>
				{#if balance !== 0}
					{#if claim}
						<ActionButton clickHandler={() => claimBalance(checkBalance)} icon={'done'} text={`Claim ৳${pending}`} first={false} />
					{:else}
						<span> Balance: ৳{balance}</span>
					{/if}
				{/if}
				<ReloadButton />
			</Section>
		</Row>
	</TopAppBar>
  {#if $spinner}
	<LinearProgress indeterminate />
{/if}
</div>
<style>
* :global(.appBarTitle){
	padding-left: 5px;
}
.top-app-bar-container {
	min-width: 100%;
	top:0;
	position: fixed;
	z-index: 100;
}
span{
	font-size: 1.25rem;
	letter-spacing: .0125em;
	text-decoration: inherit;
	text-transform: inherit;
	margin-right: 15px;
}
</style>