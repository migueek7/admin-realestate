<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Material Design Bootstrap</title>
    <!-- Font Awesome  -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
    <!-- Bootstrap core CSS  -->
    <link rel="stylesheet" href="<?= $_ENV['BASE_URL'] ?>/views/assets/css/bootstrap.min.css">
    <!-- Material Design Bootstrap  -->
    <link rel="stylesheet" href="<?= $_ENV['BASE_URL'] ?>/views/assets/css/mdb.min.css">
    <!-- DataTables.net  -->
    <link rel="stylesheet" type="text/css" href="<?= $_ENV['BASE_URL'] ?>/views/assets/css/addons/datatables.min.css">
    <link rel="stylesheet" href="<?= $_ENV['BASE_URL'] ?>/views/assets/css/addons/datatables-select.min.css">

    <!-- Your custom styles (optional)  -->
    <style>

    </style>
</head>

<body class="fixed-sn white-skin">


    <?= $this->section('content'); ?>


    <!-- SCRIPTS  -->
    <!-- JQuery  -->
    <script src="<?= $_ENV['BASE_URL'] ?>/views/assets/js/jquery-3.4.1.min.js"></script>
    <!-- Bootstrap tooltips  -->
    <script type="text/javascript" src="<?= $_ENV['BASE_URL'] ?>/views/assets/js/popper.min.js"></script>
    <!-- Bootstrap core JavaScript  -->
    <script type="text/javascript" src="<?= $_ENV['BASE_URL'] ?>/views/assets/js/bootstrap.min.js"></script>
    <!-- MDB core JavaScript  -->
    <script type="text/javascript" src="<?= $_ENV['BASE_URL'] ?>/views/assets/js/mdb.min.js"></script>
    <!-- DataTables  -->
    <script type="text/javascript" src="<?= $_ENV['BASE_URL'] ?>/views/assets/js/addons/datatables.min.js"></script>
    <!-- DataTables Select  -->
    <script type="text/javascript" src="<?= $_ENV['BASE_URL'] ?>/views/assets/js/addons/datatables-select.min.js"></script>

    <script>
        $(document).ready(function() {

            $('#dtMaterialDesignExample').DataTable();

            $('#dt-material-checkbox').dataTable({

                // columnDefs: [{
                //     orderable: false,
                //     className: 'select-checkbox',
                //     targets: 0
                // }],
                // select: {
                //     style: 'os',
                //     selector: 'td:first-child'
                // }
            });

            $('#dtMaterialDesignExample_wrapper .mdb-select, #dt-material-checkbox_wrapper .mdb-select').materialSelect()
        });
    </script>

</body>

</html>