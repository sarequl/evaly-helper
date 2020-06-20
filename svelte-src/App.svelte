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
import getToken from './app';

//logic
let loggedIn = false;
onMount(() => getToken().then(isLoggedIn => loggedIn = isLoggedIn));
let isOpen = false;
let mySnackbar;

</script>

<!-- load components -->
{#if loggedIn}
    <!-- <AppBar clickHandler={() => isOpen = !isOpen}/> -->
    <AppBar clickHandler={() => mySnackbar.open()}/>
    <Snackbar bind:this={mySnackbar}>
        <Label>coming soon</Label>
        <Actions>
            <IconButton class="material-icons" title="Dismiss">close</IconButton>
        </Actions>
    </Snackbar>
    <AppDrawer state={isOpen}>
        <InvoiceList />
    </AppDrawer>
{:else}
    <LoginCard />
{/if}
