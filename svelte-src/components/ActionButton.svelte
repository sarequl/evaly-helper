<script>
    import Button , {Icon, Label} from '@smui/button';
    export let clickHandler;
    export let icon;
    export let text;
    export let first = true;
</script>
<div>

<Button  
on:click={clickHandler} 
variant="raised" 
color="secondary" 
class="button-shaped-round">
    {#if first}
        <Icon class="material-icons">{icon}</Icon><Label>{text}</Label>
    {:else}
        <Label>{text}</Label><Icon class="material-icons">{icon}</Icon>
    {/if} 
</Button>
</div>
<style>
    * :global(.button-shaped-round){
        border-radius: 20px;
    }
</style>