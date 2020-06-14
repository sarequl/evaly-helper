<script>
import { onMount } from 'svelte';
import AppBar from './components/TopAppBar.svelte';
import AppDrawer from './components/AppDrawer.svelte';
import getToken, {token} from './app';
import Card, {Content, Actions} from '@smui/card';
import Button, {Label} from '@smui/button';
import InvoiceCard from './components/InvoiceCard.svelte'
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
<main>
    <AppBar clickHandler={() => isOpen = !isOpen}/>
    <AppDrawer state={isOpen}/>
    <InvoiceCard />
</main>
{:else}
<div class="card-container" style="padding:65px; text-align: center;">
    <Card style="width: 320px;" color={'primary'}>
    <Content>You're not logged in to evaly</Content>
    <Actions>
        <Button href="https://evaly.com.bd/login.php" target="_blank">
        <Label>login now</Label>
        </Button>
    </Actions>
    </Card>
</div>
{/if}
