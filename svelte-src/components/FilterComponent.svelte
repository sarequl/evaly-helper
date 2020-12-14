<script>
	import { filterKeys } from '../app';
	import Chip, { Set, Checkmark, Text } from '@smui/chips';
</script>

<div class="filterChips">
	<Set chips={['processing', 'picked', 'shipped', 'delivered', 'pending', 'confirmed']} let:chip filter bind:selected={$filterKeys}>
		<Chip tabindex="0">
			<Checkmark />
			<Text>{chip}</Text>
		</Chip>
	</Set>
</div>

<style>
	.filterChips {
		margin-bottom: 10px;
	}
</style>
