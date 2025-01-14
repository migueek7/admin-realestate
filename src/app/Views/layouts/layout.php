<?php
if (isset($configSeo)) {
    $seoTitle = isset($configSeo["title"]) ? $configSeo["title"] : '';
    $seoDescripcion = isset($configSeo["description"]) ? $configSeo["description"] : '';
    $seoKeywords = isset($configSeo["keywords"]) ? $configSeo["keywords"] : '';
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="<?= $seoDescripcion; ?>">
    <meta name="keywords" content="<?= $seoKeywords; ?>">
    <title><?= $seoTitle ?></title>

    <link rel="icon" href="<?= images() ?>/favicon.ico" type="image/x-icon">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?= css() ?>/plugins/all.min.css">

    <?php if (isset($styles)) : foreach ($styles as $ruta) : ?>
            <link rel="stylesheet" href="<?= css() ?>/<?= $ruta; ?>.css">
    <?php endforeach;
    endif; ?>

    <link rel="stylesheet" href="<?= css() ?>/global.css">

    <style>
        .loading {
            position: fixed;
            background-color: #eee;
            height: 100vh;
            width: 100%;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center
        }

        .loading-inactivo {
            -webkit-animation: fadeout 1s ease-in-out;
            animation: fadeout 1s ease-in-out;
            pointer-events: none;
            opacity: 0
        }

        @keyframes fadein {
            from {
                opacity: 0
            }

            to {
                opacity: 1
            }
        }

        @keyframes fadeout {
            from {
                opacity: 1
            }

            to {
                opacity: 0
            }
        }

        .spinner {
            width: 40px;
            height: 40px;
            margin: 100px auto;
            background-color: var(--primary-color);
            border-radius: 100%;
            -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
            animation: sk-scaleout 1.0s infinite ease-in-out;
            position: absolute
        }

        @-webkit-keyframes sk-scaleout {
            0% {
                -webkit-transform: scale(0)
            }

            100% {
                -webkit-transform: scale(1.0);
                opacity: 0
            }
        }

        @keyframes sk-scaleout {
            0% {
                -webkit-transform: scale(0);
                transform: scale(0)
            }

            100% {
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
                opacity: 0
            }
        }
    </style>

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/dropzone.min.js"></script> -->
</head>

<!-- fixed-sn navy-blue-skin dark-bg-admin -->
<!-- fixed-sn white-skin -->

<body class="fixed-sn white-skin">

    <div class="loading">
        <div class="spinner"></div>
    </div>

    <?php getComponent('header/Header'); ?>

    <main>

        <?= $this->section('content'); ?>

    </main>

    <?php getComponent('Footer'); ?>

    <?php
    $type = "";
    $defer = "";
    if (isset($scripts)) {
        foreach ($scripts as $ruta) {
            if ($ruta == "properties" || $ruta == "users") {
                $type = "type='module'";
            }
    ?>
            <script src="<?= js() ?>/<?= $ruta; ?>.js" <?= $type ?>></script>
    <?php
            if ($ruta == "plugins/dropzone.min") {
                echo "<script>Dropzone.autoDiscover = false;</script>";
            }
        }
    }
    ?>

    <script>
        window.addEventListener('load', function() {
            document.querySelector('.loading').classList.add('loading-inactivo');
            // document.getElementById('dark-mode').click();
        });
    </script>

</body>

</html>