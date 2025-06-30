<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CategorieControllerTest extends WebTestCase
{
    /**
     * Teste le point d'accès API pour récupérer la liste des catégories.
     */
    public function testApiGetCategories(): void
    {
        // 1. Crée un client HTTP pour simuler un navigateur
        $client = static::createClient();

        // 2. Exécute une requête GET sur la route de l'API
        $client->request('GET', '/api/categories');

        // 3. Vérifie que la réponse est un succès (code HTTP 200)
        $this->assertResponseIsSuccessful();

        // 4. Vérifie que le header Content-Type de la réponse est bien 'application/json'
        $this->assertResponseHeaderSame('Content-Type', 'application/json');
    }
} 