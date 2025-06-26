<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
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
        '/admin' => [[['_route' => 'admin', '_controller' => 'App\\Controller\\Admin\\DashboardController::index'], null, null, null, false, false, null]],
        '/categorie' => [[['_route' => 'app_categorie', '_controller' => 'App\\Controller\\CategorieController::index'], null, null, null, false, false, null]],
        '/api/me' => [[['_route' => 'api_me', '_controller' => 'App\\Controller\\ClientController::me'], null, ['GET' => 0], null, false, false, null]],
        '/api/register' => [[['_route' => 'api_register', '_controller' => 'App\\Controller\\InscriptionController::register'], null, ['OPTIONS' => 0, 'POST' => 1], null, false, false, null]],
        '/reservation' => [[['_route' => 'app_reservation', '_controller' => 'App\\Controller\\ReservationController::index'], null, null, null, false, false, null]],
        '/api/login_check' => [[['_route' => 'lexik_jwt_login'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/admin/(?'
                    .'|client/([^/]++)(?'
                        .'|/(?'
                            .'|edit(*:43)'
                            .'|delete(*:56)'
                        .')'
                        .'|(*:64)'
                    .')'
                    .'|location/([^/]++)(?'
                        .'|/(?'
                            .'|edit(*:100)'
                            .'|delete(*:114)'
                        .')'
                        .'|(*:123)'
                    .')'
                    .'|voiture/([^/]++)(?'
                        .'|/(?'
                            .'|edit(*:159)'
                            .'|delete(*:173)'
                        .')'
                        .'|(*:182)'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        43 => [[['_route' => 'admin_client_edit', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::edit'], ['entityId'], ['GET' => 0, 'POST' => 1, 'PATCH' => 2], null, false, false, null]],
        56 => [[['_route' => 'admin_client_delete', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::delete'], ['entityId'], ['POST' => 0], null, false, false, null]],
        64 => [[['_route' => 'admin_client_detail', '_controller' => 'App\\Controller\\Admin\\ClientCrudController::detail'], ['entityId'], ['GET' => 0], null, false, true, null]],
        100 => [[['_route' => 'admin_location_edit', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::edit'], ['entityId'], ['GET' => 0, 'POST' => 1, 'PATCH' => 2], null, false, false, null]],
        114 => [[['_route' => 'admin_location_delete', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::delete'], ['entityId'], ['POST' => 0], null, false, false, null]],
        123 => [[['_route' => 'admin_location_detail', '_controller' => 'App\\Controller\\Admin\\LocationCrudController::detail'], ['entityId'], ['GET' => 0], null, false, true, null]],
        159 => [[['_route' => 'admin_voiture_edit', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::edit'], ['entityId'], ['GET' => 0, 'POST' => 1, 'PATCH' => 2], null, false, false, null]],
        173 => [[['_route' => 'admin_voiture_delete', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::delete'], ['entityId'], ['POST' => 0], null, false, false, null]],
        182 => [
            [['_route' => 'admin_voiture_detail', '_controller' => 'App\\Controller\\Admin\\VoitureCrudController::detail'], ['entityId'], ['GET' => 0], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
