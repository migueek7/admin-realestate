<?=$this->layout('layouts/layout');?>

<h1>Contacto</h1>

<form id="form" method="post" action="<?=base_url()?>/mail">
    <label for="name">Name</label>
    <input type="text" id="name" name="name"><br>
    <label for="email">Email</label>
    <input type="email" id="email" name="email"><br>
    <label for="message">Message</label>
    <textarea name="message" id="message" cols="30" rows="10"></textarea>
    <button type="button" class="btnEnviar">Enviar</button>
</form>


<script>
    
</script>
