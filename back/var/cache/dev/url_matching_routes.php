<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/admin/categorie' => [[['_route' => 'admin_categorie_index', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::index'], null, ['GET' => 0], null, false, false, null]],
        '/admin/categorie/new' => [[['_route' => 'admin_categorie_new', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::new'], null, ['GET' => 0, 'POST' => 1], null, false, false, null]],
        '/admin/categorie/batch-delete' => [[['_route' => 'admin_categorie_batch_delete', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::batchDelete'], null, ['POST' => 0], null, false, false, null]],
        '/admin/categorie/autocomplete' => [[['_route' => 'admin_categorie_autocomplete', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::autocomplete'], null, ['GET' => 0], null, false, false, null]],
        '/admin/categorie/render-filters' => [[['_route' => 'admin_categorie_render_filters', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::renderFilters'], null, ['GET' => 0], null, false, false, null]],
        '/admin/client' => [[['_route' => 'admin_client_index', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::index'], null, ['GET' => 0], null, false, false, null]],
        '/admin/client/new' => [[['_route' => 'admin_client_new', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::new'], null, ['GET' => 0, 'POST' => 1], null, false, false, null]],
        '/admin/client/batch-delete' => [[['_route' => 'admin_client_batch_delete', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::batchDelete'], null, ['POST' => 0], null, false, false, null]],
        '/admin/client/autocomplete' => [[['_route' => 'admin_client_autocomplete', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::autocomplete'], null, ['GET' => 0], null, false, false, null]],
        '/admin/client/render-filters' => [[['_route' => 'admin_client_render_filters', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::renderFilters'], null, ['GET' => 0], null, false, false, null]],
        '/admin/location' => [[['_route' => 'admin_location_index', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::index'], null, ['GET' => 0], null, false, false, null]],
        '/admin/location/new' => [[['_route' => 'admin_location_new', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::new'], null, ['GET' => 0, 'POST' => 1], null, false, false, null]],
        '/admin/location/batch-delete' => [[['_route' => 'admin_location_batch_delete', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::batchDelete'], null, ['POST' => 0], null, false, false, null]],
        '/admin/location/autocomplete' => [[['_route' => 'admin_location_autocomplete', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::autocomplete'], null, ['GET' => 0], null, false, false, null]],
        '/admin/location/render-filters' => [[['_route' => 'admin_location_render_filters', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::renderFilters'], null, ['GET' => 0], null, false, false, null]],
        '/admin/voiture' => [[['_route' => 'admin_voiture_index', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::index'], null, ['GET' => 0], null, false, false, null]],
        '/admin/voiture/new' => [[['_route' => 'admin_voiture_new', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::new'], null, ['GET' => 0, 'POST' => 1], null, false, false, null]],
        '/admin/voiture/batch-delete' => [[['_route' => 'admin_voiture_batch_delete', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::batchDelete'], null, ['POST' => 0], null, false, false, null]],
        '/admin/voiture/autocomplete' => [[['_route' => 'admin_voiture_autocomplete', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::autocomplete'], null, ['GET' => 0], null, false, false, null]],
        '/admin/voiture/render-filters' => [[['_route' => 'admin_voiture_render_filters', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::renderFilters'], null, ['GET' => 0], null, false, false, null]],
        '/_profiler' => [[['_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'], null, null, null, true, false, null]],
        '/_profiler/search' => [[['_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'], null, null, null, false, false, null]],
        '/_profiler/search_bar' => [[['_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'], null, null, null, false, false, null]],
        '/_profiler/phpinfo' => [[['_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'], null, null, null, false, false, null]],
        '/_profiler/xdebug' => [[['_route' => '_profiler_xdebug', '_controller' => 'web_profiler.controller.profiler::xdebugAction'], null, null, null, false, false, null]],
        '/_profiler/open' => [[['_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'], null, null, null, false, false, null]],
        '/admin' => [[['_route' => 'admin', '_controller' => 'App\\Controller\\Admin\\DashboardController::index'], null, null, null, false, false, null]],
        '/categorie' => [[['_route' => 'app_categorie', '_controller' => 'App\\Controller\\CategorieController::index'], null, null, null, false, false, null]],
        '/api/categories' => [[['_route' => 'api_categories', '_controller' => 'App\\Controller\\CategorieController::apiCategories'], null, ['GET' => 0], null, false, false, null]],
        '/api/voitures' => [[['_route' => 'api_voitures', '_controller' => 'App\\Controller\\CategorieController::apiVoitures'], null, ['GET' => 0], null, false, false, null]],
        '/api/me' => [[['_route' => 'api_me', '_controller' => 'App\\Controller\\ClientController::me'], null, ['GET' => 0], null, false, false, null]],
        '/api/register' => [[['_route' => 'api_register', '_controller' => 'App\\Controller\\InscriptionController::register'], null, ['OPTIONS' => 0, 'POST' => 1], null, false, false, null]],
        '/reservation' => [[['_route' => 'app_reservation', '_controller' => 'App\\Controller\\ReservationController::index'], null, null, null, false, false, null]],
        '/api/login_check' => [[['_route' => 'lexik_jwt_login'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/admin/(?'
                    .'|c(?'
                        .'|ategorie/([^/]++)(?'
                            .'|/(?'
                                .'|edit(*:49)'
                                .'|delete(*:62)'
                            .')'
                            .'|(*:70)'
                        .')'
                        .'|lient/([^/]++)(?'
                            .'|/(?'
                                .'|edit(*:103)'
                                .'|delete(*:117)'
                            .')'
                            .'|(*:126)'
                        .')'
                    .')'
                    .'|location/([^/]++)(?'
                        .'|/(?'
                            .'|edit(*:164)'
                            .'|delete(*:178)'
                        .')'
                        .'|(*:187)'
                    .')'
                    .'|voiture/([^/]++)(?'
                        .'|/(?'
                            .'|edit(*:223)'
                            .'|delete(*:237)'
                        .')'
                        .'|(*:246)'
                    .')'
                .')'
                .'|/_(?'
                    .'|error/(\\d+)(?:\\.([^/]++))?(*:287)'
                    .'|wdt/([^/]++)(*:307)'
                    .'|profiler/(?'
                        .'|font/([^/\\.]++)\\.woff2(*:349)'
                        .'|([^/]++)(?'
                            .'|/(?'
                                .'|search/results(*:386)'
                                .'|router(*:400)'
                                .'|exception(?'
                                    .'|(*:420)'
                                    .'|\\.css(*:433)'
                                .')'
                            .')'
                            .'|(*:443)'
                        .')'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        49 => [[['_route' => 'admin_categorie_edit', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::edit'], ['entityId'], ['GET' => 0, 'POST' => 1, 'PATCH' => 2], null, false, false, null]],
        62 => [[['_route' => 'admin_categorie_delete', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::delete'], ['entityId'], ['POST' => 0], null, false, false, null]],
        70 => [[['_route' => 'admin_categorie_detail', '_controller' => 'App\\Controller\\Admin\\CategorieCrudController::detail'], ['entityId'], ['GET' => 0], null, false, true, null]],
        103 => [[['_route' => 'admin_client_edit', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::edit'], ['entityId'], ['GET' => 0, 'POST' => 1, 'PATCH' => 2], null, false, false, null]],
        117 => [[['_route' => 'admin_client_delete', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::delete'], ['entityId'], ['POST' => 0], null, false, false, null]],
        126 => [[['_route' => 'admin_client_detail', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::detail'], ['entityId'], ['GET' => 0], null, false, true, null]],
        164 => [[['_route' => 'admin_location_edit', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::edit'], ['entityId'], ['GET' => 0, 'POST' => 1, 'PATCH' => 2], null, false, false, null]],
        178 => [[['_route' => 'admin_location_delete', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::delete'], ['entityId'], ['POST' => 0], null, false, false, null]],
        187 => [[['_route' => 'admin_location_detail', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::detail'], ['entityId'], ['GET' => 0], null, false, true, null]],
        223 => [[['_route' => 'admin_voiture_edit', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::edit'], ['entityId'], ['GET' => 0, 'POST' => 1, 'PATCH' => 2], null, false, false, null]],
        237 => [[['_route' => 'admin_voiture_delete', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::delete'], ['entityId'], ['POST' => 0], null, false, false, null]],
        246 => [[['_route' => 'admin_voiture_detail', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::detail'], ['entityId'], ['GET' => 0], null, false, true, null]],
        287 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        307 => [[['_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'], ['token'], null, null, false, true, null]],
        349 => [[['_route' => '_profiler_font', '_controller' => 'web_profiler.controller.profiler::fontAction'], ['fontName'], null, null, false, false, null]],
        386 => [[['_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'], ['token'], null, null, false, false, null]],
        400 => [[['_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'], ['token'], null, null, false, false, null]],
        420 => [[['_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception_panel::body'], ['token'], null, null, false, false, null]],
        433 => [[['_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception_panel::stylesheet'], ['token'], null, null, false, false, null]],
        443 => [
            [['_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'], ['token'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
