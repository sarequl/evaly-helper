<script>
  import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  export let clickHandler;
</script>
<section>
  <div class="flexy">
    <div class="top-app-bar-container flexor">
      <TopAppBar variant="static">
        <Row>
          <Section>
            <IconButton toggle on:click={() => clickHandler()} class="material-icons">menu</IconButton>
            <Title>Evaly Helper</Title>
          </Section>
          <Section align="end" toolbar>
            <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>
          </Section>
        </Row>
      </TopAppBar>
    </div>
  </div>
</section>



<style>
  .top-app-bar-container {
    max-width: 100%;
    min-width: 100%;
    border: 1px solid rgba(0,0,0,.1);
    margin: 0 18px 18px 0;
  }

  .top-app-bar-container {
    overflow: auto;
    display: inline-block;
  }

  .flexy {
    display: flex;
    flex-wrap: wrap;
  }

  .flexor {
    display: inline-flex;
    flex-direction: column;
  }

  .flexor-content {
    flex-basis: 0;
    height: 0;
    flex-grow: 1;
    overflow: auto;
  }
</style>