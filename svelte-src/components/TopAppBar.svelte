<script>
	import { onMount } from 'svelte';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton, { Icon } from '@smui/icon-button';
	import LinearProgress from '@smui/linear-progress';
	import ActionButton from './ActionButton.svelte';
	import ReloadButton from './ReloadButton.svelte';
	import { getBalance, spinner, claimBalance, detailedView, isDrawerOpen } from '../app';

	let balance = 0;
	let claim = false;
	let pending = 0;

	function checkBalance() {
		getBalance()
			.then(data => {
				balance = data.balance;
				if (data.cashback_balance !== 0) {
					pending = data.cashback_balance;
					claim = true;
				} else {
					pending = 0; //show balance after cashback
					claim = false;
				}
			})
			.catch(console.log);
	}
	onMount(checkBalance);
</script>

<div class="top-app-bar-container">
	<TopAppBar variant="static">
		<Row>
			<Section>
				{#if $detailedView === 0}
					<IconButton toggle bind:pressed={$isDrawerOpen}>
						<Icon class="material-icons">menu</Icon>
						<Icon class="material-icons" on>menu_open</Icon>
					</IconButton>
				{:else}
					<!-- <IconButton><Icon class="material-icons">menu</Icon></IconButton> -->
				{/if}
				<Title class="appBarTitle">Evaly Helper</Title>
			</Section>
			<Section align="end" toolbar>
				{#if balance !== 0}
					{#if claim}
						<ActionButton clickHandler={() => claimBalance(checkBalance)} icon={'done'} text={`Claim ৳${pending}`} first={false} />
					{:else}<span> Balance: ৳{balance}</span>{/if}
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
	* :global(.appBarTitle) {
		padding-left: 5px;
	}
	.top-app-bar-container {
		min-width: 100%;
		top: 0;
		position: fixed;
		z-index: 100;
	}
	span {
		font-size: 1.25rem;
		letter-spacing: 0.0125em;
		text-decoration: inherit;
		text-transform: inherit;
		margin-right: 15px;
	}
</style>
