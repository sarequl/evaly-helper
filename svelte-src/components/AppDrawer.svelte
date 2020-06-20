<script>
  import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
  import Button, {Label} from '@smui/button';
  import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
  import H6 from '@smui/common/H6.svelte';

  let clicked = 'nothing yet';
  let myDrawer2;
  export let state = false;
  let active2 = 'Inbox';
  function setActive2(value) {
    active2 = value;
    state = false;
  }

</script>

<section>
    <div class="drawer-container">
      <Drawer variant="modal" bind:this={myDrawer2} bind:open={state}>
        <Header>
          <Title>Super Mail</Title>
          <Subtitle>It's the best fake mail app drawer.</Subtitle>
        </Header>
        <Content>
          <List>
            <Item href="javascript:void(0)" on:click={() => setActive2('Inbox')} activated={active2 === 'Inbox'}>
              <Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
              <Text>Inbox</Text>
            </Item>
            <Item href="javascript:void(0)" on:click={() => setActive2('Star')} activated={active2 === 'Star'}>
              <Graphic class="material-icons" aria-hidden="true">star</Graphic>
              <Text>Star</Text>
            </Item>
            <Item href="javascript:void(0)" on:click={() => setActive2('Sent Mail')} activated={active2 === 'Sent Mail'}>
              <Graphic class="material-icons" aria-hidden="true">send</Graphic>
              <Text>Sent Mail</Text>
            </Item>
            <Item href="javascript:void(0)" on:click={() => setActive2('Drafts')} activated={active2 === 'Drafts'}>
              <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
              <Text>Drafts</Text>
            </Item>

            <Separator nav />
            <Subheader component={H6}>Labels</Subheader>
            <Item href="javascript:void(0)" on:click={() => setActive2('Family')} activated={active2 === 'Family'}>
              <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
              <Text>Family</Text>
            </Item>
            <Item href="javascript:void(0)" on:click={() => setActive2('Friends')} activated={active2 === 'Friends'}>
              <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
              <Text>Friends</Text>
            </Item>
            <Item href="javascript:void(0)" on:click={() => setActive2('Work')} activated={active2 === 'Work'}>
              <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
              <Text>Work</Text>
            </Item>
          </List>
        </Content>
      </Drawer>

      <Scrim />
      <AppContent class="app-content">
        <main class="main-content">
          <slot></slot>
        </main>
      </AppContent>
    </div>
</section>



<style>
  .drawer-container {
    position: relative;
    height: 100%;
    max-width: 100%;
    border: 1px solid rgba(0,0,0,.1);
    overflow: hidden;
    z-index: 0;
    margin-top:55px;
  }
  .drawer-container::-webkit-scrollbar{
    display: block;
    width: 10px;
  }

  * :global(.mdc-drawer--modal, .mdc-drawer-scrim) {
    /* This is not needed for a page-wide modal. */
    position: absolute;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    padding: 10px;
    height: auto;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
  }
</style>