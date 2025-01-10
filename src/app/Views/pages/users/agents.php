<?= $this->layout('layouts/layout'); ?>
<?php
// pre($roles);
?>
<div class="container-xl container-fluid">

    <!-- Section: Basic examples -->
    <section class="row">
        <!-- Gird column -->
        <div class="col-md-12">

            <h5 class="my-4 dark-grey-text font-weight-bold">Lista De Usuarios</h5>
            <?php getComponent('DataTables', $datatables) ?>

        </div>
    </section>

</div>

<?php getComponent("modals/addUserDemo", $roles); ?>