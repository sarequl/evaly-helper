<script>
    import Button , {Icon, Label} from '@smui/button';
    export let clickHandler;
    export let icon;
    export let text;
    export let first = true;
</script>

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
