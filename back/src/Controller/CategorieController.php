<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Categorie;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Voiture;

class CategorieController extends AbstractController
{
    #[Route('/categorie', name: 'app_categorie')]
    public function index(): Response
    {
        return $this->render('categorie/index.html.twig', [
            'controller_name' => 'CategorieController',
        ]);
    }

    #[Route('/api/categories', name: 'api_categories', methods: ['GET'])]
    public function apiCategories(EntityManagerInterface $em): JsonResponse
    {
        $categories = $em->getRepository(Categorie::class)->findAll();
        $data = array_map(fn($cat) => [
            'id' => $cat->getId(),
            'nom' => $cat->getNom(),
        ], $categories);
        return $this->json($data);
    }

    #[Route('/api/voitures', name: 'api_voitures', methods: ['GET'])]
    public function apiVoitures(EntityManagerInterface $em): JsonResponse
    {
        $voitures = $em->getRepository(Voiture::class)->findAll();
        $data = array_map(fn($v) => [
            'id' => $v->getId(),
            'modele' => $v->getModele(),
            'image' => $v->getImage(),
            'prix_jour' => $v->getPrixJour(),
            'carburant' => $v->getCarburant(),
            'boite' => $v->getBoite(),
            'portes' => $v->getPortes(),
            'places' => $v->getPlaces(),
            'volume_coffre' => $v->getVolumeCoffre(),
            'puissance' => $v->getPuissance(),
            'description' => $v->getDescription(),
            'lieu_depart' => $v->getLieuDepart(),
        ], $voitures);
        return $this->json($data);
    }
}
