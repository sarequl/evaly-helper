<script>
import IconButton from '@smui/icon-button';
import {main} from '../app';

</script>
<IconButton on:click={async () => await main(true)} class="material-icons" aria-label="Settings">refresh</IconButton>
