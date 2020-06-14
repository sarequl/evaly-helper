<script>
//components
import AppBar from './components/TopAppBar.svelte';
import AppDrawer from './components/AppDrawer.svelte';
import LoginCard from './components/LoginCard.svelte';
import InvoiceList from './components/InvoiceList.svelte';
import storage from './modules/storage'


//state and functions
import { onMount } from 'svelte';
import getToken, {token} from './app';
let loggedIn = false;
onMount(() => {
    getToken(cookie => {
        if(cookie != null){
            loggedIn = true;
            token.set(cookie);
            storage.set({token: cookie})
        }
    })
})
let isOpen = false;
</script>

{#if loggedIn}
<AppBar clickHandler={() => isOpen = !isOpen}/>
<AppDrawer state={isOpen}>
    <InvoiceList />
</AppDrawer>
{:else}
<LoginCard />
{/if}
