<script>
import Card, {Content, Actions} from '@smui/card';
import Button, {Label} from '@smui/button';
</script>
<div style="padding:65px; text-align: center;">
    <Card style="width: 320px;" color={'primary'}>
    <Content>You're not logged in to evaly</Content>
    <Actions>
        <Button href="https://evaly.com.bd/login.php" target="_blank">
        <Label>login now</Label>
        </Button>
    </Actions>
    </Card>
</div>