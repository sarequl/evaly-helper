<script>
    import Paper, {Title, Content} from '@smui/paper';
    export let note;
    export let status;
    function fixCase(str){
        return str.split('').map((e,i) => (i === 0) ? e.toUpperCase() : e.toLowerCase()).join('') 
    }
</script>

<Paper elevation={9} color={'primary'} class="progressPaper">
    <Title>{fixCase(status)}</Title>
    <Content>
        <p>{note}</p>
    </Content>
</Paper>