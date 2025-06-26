<?php

namespace App\DataFixtures;

use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ClientFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $clientsData = [
            [
                'prenom' => 'Jean',
                'nom' => 'Dupont',
                'email' => 'jean.dupont@example.com',
                'password' => 'password123',
                'telephone' => '0601020304',
                'roles' => ['ROLE_USER'],
            ],
            [
                'prenom' => 'Marie',
                'nom' => 'Durand',
                'email' => 'marie.durand@example.com',
                'password' => 'password456',
                'telephone' => '0605060708',
                'roles' => ['ROLE_USER'],
            ],
        ];

        foreach ($clientsData as $data) {
            $client = new Client();
            $client->setPrenom($data['prenom']);
            $client->setNom($data['nom']);
            $client->setEmail($data['email']);
            $client->setPassword($this->passwordHasher->hashPassword($client, $data['password']));
            $client->setTelephone($data['telephone']);
            $client->setRoles($data['roles']);
            $manager->persist($client);
        }

        $manager->flush();
    }
} 