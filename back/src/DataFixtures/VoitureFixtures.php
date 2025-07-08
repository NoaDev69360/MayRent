<?php

namespace App\DataFixtures;

use App\Entity\Voiture;
use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;

class VoitureFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $categories_refs = ['categorie_Berline', 'categorie_SUV', 'categorie_Citadine', 'categorie_Sportive', 'categorie_Utilitaire', 'categorie_Camion de chantier'];
        
        $voitureModels = [
            'Berline' => ['Mercedes Classe C', 'BMW Série 3', 'Audi A4'],
            'SUV' => ['Peugeot 3008', 'Renault Captur', 'Dacia Duster'],
            'Citadine' => ['Renault Clio', 'Peugeot 208', 'Citroën C3'],
            'Sportive' => ['Porsche 911', 'Alpine A110', 'Ford Mustang'],
            'Utilitaire' => ['Renault Kangoo', 'Citroën Berlingo', 'Peugeot Partner'],
            'Camion de chantier' => ['Volvo FMX', 'MAN TGS', 'Mercedes Arocs']
        ];

        // 2ème vague de fausses voitures avec toutes les nouvelles colonnes remplies
        for ($i = 0; $i < 10; $i++) {
            $voiture = new Voiture();
            $categorieRef = $categories_refs[array_rand($categories_refs)];
            /** @var Categorie $categorie */
            $categorie = $this->getReference($categorieRef);
            $categorieNom = str_replace('categorie_', '', $categorieRef);
            $modele = $faker->randomElement($voitureModels[$categorieNom]);
            $voiture->setModele($modele);
            $voiture->setImmatriculation($faker->bothify('??-###-??'));
            $voiture->setCouleur($faker->safeColorName());
            $voiture->setPuissance($faker->numberBetween(75, 300));
            $voiture->setPrixJour($faker->randomFloat(2, 40, 200));
            $voiture->setCategorie($categorie);
            $voiture->setCarburant($faker->randomElement(['Essence', 'Diesel', 'Électrique', 'Hybride']));
            $voiture->setBoite($faker->randomElement(['Manuelle', 'Automatique']));
            $voiture->setPortes($faker->numberBetween(3, 5));
            $voiture->setPlaces($faker->numberBetween(2, 7));
            $voiture->setVolumeCoffre($faker->numberBetween(200, 700) . 'L');
            $voiture->setDescription($faker->sentence(15));
            // Image fictive (pas de téléchargement)
            $voiture->setImage('default.jpg');
            // Ajout d'URLs d'images externes de test pour certaines voitures
            if ($i % 3 === 0) { // Une voiture sur 3 aura une image externe
                $voiture->setImageUrl('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop');
            }
            $voiture->setLieuDepart($faker->city);
            $manager->persist($voiture);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategorieFixtures::class,
        ];
    }
} 