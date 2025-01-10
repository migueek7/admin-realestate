<div id="slide-out" class="side-nav fixed">
    <ul class="custom-scrollbar">

        <!-- Logo -->
        <li class="logo-sn waves-effect pt-3">
            <div class="text-center">
                <a href="<?= base_url() ?>/properties" class="pl-0">
                    <!-- <img src="< images() ?>/mdb-transaprent-noshadows.png"> -->
                    <img src="<?= images() ?>/logo2.svg" width="180" />
                </a>
            </div>
            <hr>
        </li>

        <!-- Search Form -->
        <!-- <li>
            <form class="search-form" role="search">
                <div class="md-form mt-0 waves-light">
                    <input type="text" class="form-control py-2" placeholder="Search">
                </div>
            </form>
        </li> -->

        <!-- Side navigation links -->
        <li>
            <ul class="collapsible collapsible-accordion">

                <li>
                    <a href="<?= base_url() ?>/properties" class="collapsible-header waves-effect">
                        <i class="fas fa-home"></i>Propiedades
                    </a>
                </li>

                <li>
                    <a href="<?= base_url() ?>/agents" class="collapsible-header waves-effect">
                        <i class="w-fa fas fa-users"></i>Agentes
                    </a>
                </li>

            </ul>
        </li>
        <!-- Side navigation links -->

    </ul>

    <div class="sidenav-bg mask-strong"></div>
</div>