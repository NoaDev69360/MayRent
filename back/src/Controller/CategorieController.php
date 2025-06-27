<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Categorie;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Voiture;
use Symfony\Component\HttpFoundation\Request;

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
            'categorie' => $v->getCategorie() ? [
                'id' => $v->getCategorie()->getId(),
                'nom' => $v->getCategorie()->getNom()
            ] : null,
        ], $voitures);
        return $this->json($data);
    }

    #[Route('/api/voitures', name: 'api_voitures_create', methods: ['POST'])]
    public function createVoiture(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
            $data = json_decode($request->getContent(), true);
        } else {
            $data = $request->request->all();
        }

        $voiture = new Voiture();
        $voiture->setModele($data['modele'] ?? '');
        $voiture->setImmatriculation($data['immatriculation'] ?? '');
        $voiture->setCouleur($data['couleur'] ?? '');
        $voiture->setPuissance($data['puissance'] ?? 0);
        $voiture->setPrixJour($data['prix_jour'] ?? 0);
        $voiture->setCarburant($data['carburant'] ?? '');
        $voiture->setBoite($data['boite'] ?? '');
        $voiture->setPortes($data['portes'] ?? 0);
        $voiture->setPlaces($data['places'] ?? 0);
        $voiture->setVolumeCoffre($data['volume_coffre'] ?? '');
        $voiture->setDescription($data['description'] ?? '');
        $voiture->setLieuDepart($data['lieu_depart'] ?? '');
        $voiture->setImage($data['image'] ?? 'default.jpg');

        // Associer la catégorie
        if (!empty($data['categorie_id'])) {
            $categorie = $em->getRepository(Categorie::class)->find($data['categorie_id']);
            if ($categorie) {
                $voiture->setCategorie($categorie);
            }
        }

        // Lier la voiture au client connecté
        $voiture->setIdClient($user);

        $em->persist($voiture);
        $em->flush();

        return $this->json(['success' => true, 'id' => $voiture->getId()]);
    }

    #[Route('/api/voitures/{id}', name: 'api_voitures_delete', methods: ['DELETE'])]
    public function deleteVoiture($id, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }
        $voiture = $em->getRepository(Voiture::class)->find($id);
        if (!$voiture) {
            return $this->json(['error' => 'Véhicule introuvable'], 404);
        }
        if ($voiture->getIdClient()?->getId() !== $user->getId()) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }
        $em->remove($voiture);
        $em->flush();
        return $this->json(['success' => true]);
    }

    #[Route('/api/voitures/{id}', name: 'api_voitures_update', methods: ['PUT'])]
    public function updateVoiture($id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }
        $voiture = $em->getRepository(Voiture::class)->find($id);
        if (!$voiture) {
            return $this->json(['error' => 'Véhicule introuvable'], 404);
        }
        if ($voiture->getIdClient()?->getId() !== $user->getId()) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }
        $isJson = $request->getContentTypeFormat() === 'json';
        $data = $isJson ? json_decode($request->getContent(), true) : $request->request->all();
        foreach ([
            'modele', 'immatriculation', 'couleur', 'prix_jour', 'carburant', 'boite', 'portes', 'places', 'volume_coffre', 'puissance', 'description', 'lieu_depart'
        ] as $field) {
            if (isset($data[$field])) {
                $setter = 'set' . str_replace(' ', '', ucwords(str_replace('_', ' ', $field)));
                $voiture->$setter($data[$field]);
            }
        }
        $em->flush();
        return $this->json(['success' => true]);
    }
}
