<script>
	import IconButton from '@smui/icon-button';
	import { spinner } from '../app';

	function test() {
		spinner.set(true);
		chrome.alarms.create('reload', { when: Date.now() + 100 });
		setTimeout(() => {
			spinner.set(false);
		}, 3000);
	}
</script>

<IconButton on:click={test} class="material-icons" aria-label="Settings">refresh</IconButton>
