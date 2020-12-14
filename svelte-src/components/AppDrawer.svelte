<script>
import { onMount } from 'svelte';
import { sortKey, isDrawerOpen, scrollPos } from '../app';
import storage from '../modules/storage';

import Drawer, { AppContent, Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
import H6 from '@smui/common/H6.svelte';

import FilterComponent from './FilterComponent.svelte';
import Info from './Info.svelte';

let total = 0;
onMount(async () => {
	try {
		const { orders } = await storage.get('orders').catch(console.log);
		total = orders.length;
	} catch (error) {
		console.log(error);
	}
});

function setSortKey(value) {
	sortKey.set(value)
	$isDrawerOpen = false;
	$scrollPos = 0;
}
</script>

<section>
    <div class="drawer-container">
		<Drawer variant="modal" bind:open={$isDrawerOpen}>
		<Header>
			<Title>{total} Active orders</Title>
			<Subtitle>
			<Info />
			</Subtitle>
			
		</Header>
		<Content>
			<List>
				<Separator nav />
				<Subheader component={H6}>Filter</Subheader>
				<FilterComponent />
				<Separator nav />
				<Subheader component={H6}>Sort By</Subheader>
				<Item href="#" on:click={() => setSortKey('updatedNew')} activated={$sortKey === 'updatedNew'}>
					<Graphic class="material-icons" aria-hidden="true">update</Graphic>
					<Text>Recently Updated</Text>
				</Item>
				<Item href="#" on:click={() => setSortKey('dateNew')} activated={$sortKey === 'dateNew'}>
					<Graphic class="material-icons" aria-hidden="true">sort</Graphic>
					<Text>Date (New to Old)</Text>
				</Item>
				<Item href="#" on:click={() => setSortKey('dateOld')} activated={$sortKey === 'dateOld'}>
					<Graphic class="material-icons" aria-hidden="true">sort</Graphic>
					<Text>Date (Old to New)</Text>
				</Item>
				<Item href="#" on:click={() => setSortKey('priceHigh')} activated={$sortKey === 'priceHigh'}>
					<Graphic class="material-icons" aria-hidden="true">sort</Graphic>
					<Text>Price  (High to Low)</Text>
				</Item>
				<Item href="#" on:click={() => setSortKey('priceLow')} activated={$sortKey === 'priceLow'}>
					<Graphic class="material-icons" aria-hidden="true">sort</Graphic>
					<Text>Price  (Low to High)</Text>
				</Item>
			</List>
		</Content>
		</Drawer>
      <Scrim />
      <AppContent class="app-content">
        <main class="main-content">
          <slot></slot>
        </main>
      </AppContent>
    </div>
</section>
<style>
  .drawer-container {
    position: relative;
    height: 100%;
    max-width: 100%;
    border: 1px solid rgba(0,0,0,.1);
    overflow: hidden;
    z-index: 0;
    margin-top:55px;
  }
  .drawer-container::-webkit-scrollbar{
    display: block;
    width: 10px;
  }

  * :global(.mdc-drawer--modal, .mdc-drawer-scrim) {
    /* This is not needed for a page-wide modal. */
    position: absolute;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    padding: 10px;
    height: auto;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
  }
</style>