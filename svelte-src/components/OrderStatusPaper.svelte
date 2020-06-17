<script>
    import Paper, {Title, Content} from '@smui/paper';
    export let note;
    export let status;
</script>

<Paper elevation={9} color={'primary'} class="progressPaper">
    <Title>{status}</Title>
    <Content>
        <p>{note}</p>
    </Content>
</Paper>