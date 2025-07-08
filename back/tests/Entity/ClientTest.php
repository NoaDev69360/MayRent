<?php

namespace App\Tests\Entity;

use App\Entity\Client;
use PHPUnit\Framework\TestCase;

class ClientTest extends TestCase
{
    public function testSetAndGetEmail()
    {
        $client = new Client();
        $client->setEmail('test@example.com');
        $this->assertEquals('test@example.com', $client->getEmail());
    }

    public function testSetAndGetPrenom()
    {
        $client = new Client();
        $client->setPrenom('Jean');
        $this->assertEquals('Jean', $client->getPrenom());
    }

    public function testSetAndGetNom()
    {
        $client = new Client();
        $client->setNom('Dupont');
        $this->assertEquals('Dupont', $client->getNom());
    }

    public function testSetAndGetTelephone()
    {
        $client = new Client();
        $client->setTelephone('0601020304');
        $this->assertEquals('0601020304', $client->getTelephone());
    }

    public function testSetAndGetRoles()
    {
        $client = new Client();
        $client->setRoles(['ROLE_ADMIN']);
        $this->assertContains('ROLE_ADMIN', $client->getRoles());
        $this->assertContains('ROLE_USER', $client->getRoles()); // ROLE_USER est toujours ajouté
    }
} 