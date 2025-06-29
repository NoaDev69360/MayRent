<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Voiture;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

class ClientController extends AbstractController
{
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function me(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Not authenticated'], 401);
        }
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'prenom' => $user->getPrenom(),
            'nom' => $user->getNom(),
        ]);
    }

    #[Route('/api/mes-voitures', name: 'api_mes_voitures', methods: ['GET'])]
    public function mesVoitures(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $voitures = $em->getRepository(Voiture::class)->findBy(['id_client' => $user]);
        $data = array_map(fn($v) => [
            'id' => $v->getId(),
            'modele' => $v->getModele(),
            'image' => $v->getImage(),
            'image_url' => $v->getImageUrl(),
            'prix_jour' => $v->getPrixJour(),
            'categorie' => $v->getCategorie() ? [
                'id' => $v->getCategorie()->getId(),
                'nom' => $v->getCategorie()->getNom()
            ] : null,
        ], $voitures);

        return $this->json($data);
    }
} 