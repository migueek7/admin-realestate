<?php
if (isset($configSeo)) {
    $seoTitle = isset($configSeo["title"]) ? $configSeo["title"] : '';
    $seoDescripcion = isset($configSeo["description"]) ? $configSeo["description"] : '';
    $seoKeywords = isset($configSeo["keywords"]) ? $configSeo["keywords"] : '';
    $seoAuthor = isset($configSeo["author"]) ? $configSeo["author"] : '';
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="<?= $seoDescripcion; ?>">
    <meta name="keywords" content="<?= $seoKeywords; ?>">
    <!-- <meta name="author" content="< $seoAuthor; ?>"> -->
    <title><?= $seoTitle ?></title>
    <!-- Font Awesome -->
    <link href="<?= css() ?>/plugins/all.min.css" rel="stylesheet">
    <!-- Bootstrap core CSS -->
    <link href="<?= css() ?>/plugins/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="<?= css() ?>/plugins/mdb.min.css" rel="stylesheet">
    <!-- Estilos Personales -->
    <link href="<?= css() ?>/global.css" rel="stylesheet">
    <link href="<?= css() ?>/login.css" rel="stylesheet">

    <!-- Your custom styles (optional) -->
    <style>
        .view,
        body,
        header,
        html {
            height: 100%
        }

        @media (min-width:560px) and (max-width:740px) {

            .view,
            body,
            header,
            html {
                height: 650px
            }
        }

        @media (min-width:800px) and (max-width:850px) {

            .view,
            body,
            header,
            html {
                height: 650px
            }
        }

        body.swal2-height-auto {
            height: inherit !important
        }

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
            -webkit-animation: 1s ease-in-out fadeout;
            animation: 1s ease-in-out fadeout;
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
            background-color: #ee7203;
            border-radius: 100%;
            -webkit-animation: 1s ease-in-out infinite sk-scaleout;
            animation: 1s ease-in-out infinite sk-scaleout;
            position: absolute
        }

        @-webkit-keyframes sk-scaleout {
            0% {
                -webkit-transform: scale(0)
            }

            100% {
                -webkit-transform: scale(1);
                opacity: 0
            }
        }

        @keyframes sk-scaleout {
            0% {
                -webkit-transform: scale(0);
                transform: scale(0)
            }

            100% {
                -webkit-transform: scale(1);
                transform: scale(1);
                opacity: 0
            }
        }

        .form-header {
            max-width: 160px;
            margin: 0 auto;
            min-height: 160px;
            border-radius: 50%;
            position: relative;
            margin-top: -113px;
            margin-bottom: 30px;
        }

        .img-logo {
            width: 140px;
            margin: 0 auto;
            background-color: white;
            border-radius: 50%;
            height: 140px;
            display: flex;
            justify-content: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
        }

        .img-logo img {
            width: 120px;
        }
    </style>
</head>

<body class="login-page" style="height: inherit !important">

    <!-- <div class="loading">
        <div class="spinner"></div>
    </div> -->

    <!-- Main Navigation -->
    <header>

        <!-- Intro Section -->
        <section class="view intro-2">
            <div class="mask rgba-stylish-strong h-100 d-flex justify-content-center align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5">

                            <!-- Form with header -->
                            <form class="card wow zoomIn" data-wow-delay="0.5s" style="visibility: hidden;">
                                <div class="card-body p-4">

                                    <!-- Header -->
                                    <div class="form-header blue-gradient">
                                        <!-- <h3 class="font-weight-500 my-2 py-1">
                                            <i class="fas fa-user pr-3"></i> Iniciar sesión
                                        </h3> -->

                                        <div class="img-logo">
                                            <img src="<?= images() ?>/logo.svg" />
                                        </div>
                                    </div>

                                    <div id="msgLogin" class=""></div>


                                    <div class="md-form">
                                        <i class="fas fa-envelope prefix white-text"></i>
                                        <input type="text" id="emailForm" class="form-control" autocomplete="off">
                                        <label for="emailForm">Correo Electrónico</label>
                                    </div>

                                    <div class="md-form">
                                        <i class="fas fa-lock prefix white-text"></i>
                                        <input type="password" id="passForm" class="form-control" autocomplete="new-password">
                                        <label for="passForm">Contraseña</label>
                                    </div>

                                    <div class="">
                                        <!-- <div id="msgLogin"></div> -->
                                        <button type="submit" id="btnLogin" class="btn blue-gradient btn-lg mx-auto d-block">
                                            Ingresar
                                        </button>
                                        <!-- <hr class="mt-4 bg-light">
                                        <div class="inline-ul text-center d-flex justify-content-center">
                                            <a class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-twitter white-text"></i></a>
                                            <a class="p-2 m-2 fa-lg li-ic"><i class="fab fa-linkedin-in white-text"> </i></a>
                                            <a class="p-2 m-2 fa-lg ins-ic"><i class="fab fa-instagram white-text"> </i></a>
                                        </div> -->
                                    </div>

                                </div>
                            </form>
                            <!-- Form with header -->

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Intro Section -->

    </header>
    <!-- Main Navigation -->



    <!-- SCRIPTS -->
    <!-- JQuery -->
    <script type="text/javascript" src="<?= js() ?>/plugins/jquery-3.4.1.min.js"></script>
    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="<?= js() ?>/plugins/popper.min.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="<?= js() ?>/plugins/bootstrap.min.js"></script>
    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="<?= js() ?>/plugins/mdb.min.js"></script>
    <!-- Sweet Alert2 -->
    <script type="text/javascript" src="<?= js() ?>/plugins/sweetalert2.all.min.js"></script>
    <!-- Script Personal -->
    <script src="<?= js() ?>/login.js" type="module"></script>


    <!-- Custom scripts -->
    <script>
        $(document).ready(() => {
            new WOW().init();
        });
    </script>

</body>

</html>