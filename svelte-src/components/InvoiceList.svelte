<script>
import { onMount } from 'svelte';
import { detailedView } from '../app';
import SingleCard from './SingleCard.svelte';
import InvoiceView from './InvoiceView.svelte';

//state and functions
import {main, orders} from '../app'
onMount(main);
</script>

<div class="list">
    {#if $detailedView === 1}
        {#if $orders.length !== 0}
            <!-- add order length, balance etc[todo] -->
            {#each $orders as order}
                <SingleCard orderDetails={order} />
            {/each}
        {:else}
            <h3>no data yet, Fetching your orders, please wait...</h3>
        {/if}
    {:else}
        <svelte:component this={InvoiceView}></svelte:component>
    {/if}
</div>


