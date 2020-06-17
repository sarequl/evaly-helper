<script>
    import Button , {Icon, Label} from '@smui/button';
    export let clickHandler;
    export let icon;
    export let text;

</script>

<Button  
on:click={clickHandler} 
variant="raised" 
color="secondary" 
class="button-shaped-round">
<Icon class="material-icons">{icon}</Icon> <Label>{text}</Label>
</Button>
