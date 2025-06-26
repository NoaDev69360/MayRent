<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategorieFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categories = ['Berline', 'SUV', 'Citadine', 'Sportive', 'Utilitaire', 'Camion de chantier'];

        foreach ($categories as $nom) {
            $categorie = new Categorie();
            $categorie->setNom($nom);
            $manager->persist($categorie);
            $this->addReference('categorie_' . $nom, $categorie);
        }

        $manager->flush();
    }
} 