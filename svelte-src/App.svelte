<script>
//components
import AppBar from './components/TopAppBar.svelte';
import AppDrawer from './components/AppDrawer.svelte';
import LoginCard from './components/LoginCard.svelte';
import InvoiceList from './components/InvoiceList.svelte';

//state and functions
import storage from './modules/storage';
import { onMount } from 'svelte';
import getToken from './app';

//logic
let loggedIn = false;
onMount(() => getToken().then(isLoggedIn => loggedIn = isLoggedIn));
let isOpen = false;
</script>

<!-- load components -->
{#if loggedIn}
    <AppBar clickHandler={() => isOpen = !isOpen}/>
    <AppDrawer state={isOpen}>
        <InvoiceList />
    </AppDrawer>
{:else}
    <LoginCard />
{/if}
