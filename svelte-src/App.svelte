<script>
//components
import AppBar from './components/TopAppBar.svelte';
import AppDrawer from './components/AppDrawer.svelte';
import LoginCard from './components/LoginCard.svelte';
import InvoiceCard from './components/InvoiceCard.svelte';

//state and functions
import { onMount } from 'svelte';
import getToken, {token} from './app';
let loggedIn = false;
onMount(() => {
    getToken(cookie => {
        if(cookie != null){
            loggedIn = true;
            token.set(cookie)
        }
    })
})
let isOpen = false;
</script>

{#if loggedIn}
<AppBar clickHandler={() => isOpen = !isOpen}/>
<AppDrawer state={isOpen}>
    <InvoiceCard />
</AppDrawer>
{:else}
<LoginCard />
{/if}
