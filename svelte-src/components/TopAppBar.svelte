<script>
  import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import LinearProgress from '@smui/linear-progress';
	import {spinner} from '../app';
  export let clickHandler;
</script>
<div class="top-app-bar-container">
    <TopAppBar variant="static">
      <Row>
        <Section>
          <IconButton toggle on:click={() => clickHandler()} class="material-icons">menu</IconButton>
          <Title>Evaly Helper</Title>
        </Section>
        <Section align="end" toolbar>
          <IconButton class="material-icons" aria-label="Settings">settings</IconButton>
        </Section>
      </Row>
    </TopAppBar>
		
		{#if $spinner}
			<LinearProgress indeterminate />
		{/if}
  </div>
<style>
  .top-app-bar-container {
		min-width: 100%;
		top:0;
		position: fixed;
		z-index: 100;
  }
</style>