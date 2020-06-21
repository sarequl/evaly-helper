<script>
//components
import AppBar from './components/TopAppBar.svelte';
import AppDrawer from './components/AppDrawer.svelte';
import LoginCard from './components/LoginCard.svelte';
import InvoiceList from './components/InvoiceList.svelte';
import Snackbar, {Actions, Label} from '@smui/snackbar';
import IconButton from '@smui/icon-button';

//state and functions
import storage from './modules/storage';
import { onMount } from 'svelte';
import getToken, { isDrawerOpen } from './app';

//logic
let loggedIn = false;
onMount(() => getToken().then(isLoggedIn => loggedIn = isLoggedIn));
function drawer(){
    $isDrawerOpen = !$isDrawerOpen;
    window.scrollTo({
        left:0,
        top:0,
        behavior: 'smooth'
    })
}

</script>

<!-- load components -->
{#if loggedIn}
    <AppBar clickHandler={drawer}/>
    <AppDrawer>
        <InvoiceList />
    </AppDrawer>
{:else}
    <LoginCard />
{/if}
