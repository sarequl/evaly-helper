<script>
import Paper, { Title, Content } from '@smui/paper';
import { parseDate, calcDays } from '../app';

export let note;
export let status;
export let date;

function fixCase(str){
    return str.split('').map((e,i) => (i === 0) ? e.toUpperCase() : e.toLowerCase()).join('') 
}

</script>

<Paper elevation={9} color={'primary'} class="progressPaper">
    <Title>{fixCase(status)}</Title>
    <Content>
        <p>{parseDate(date)}</p>
        <p>{note}</p>
        <small>{calcDays(date)}</small>
    </Content>
</Paper>