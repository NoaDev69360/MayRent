<?php

namespace App\Controller;

use App\Entity\Location;
use App\Entity\Voiture;
use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use App\Repository\LocationRepository;
use App\Service\LogService;

class ReservationController extends AbstractController
{
    #[Route('/api/reserver', name: 'api_reserver', methods: ['POST'])]
    public function reserver(Request $request, EntityManagerInterface $em, LogService $logService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['voiture_id'], $data['date_debut'], $data['date_fin'], $data['prix_totale'])) {
            return $this->json(['success' => false, 'message' => 'Données manquantes'], 400);
        }
        $voiture = $em->getRepository(Voiture::class)->find($data['voiture_id']);
        $client = $this->getUser();
        if (!$voiture || !$client) {
            return $this->json(['success' => false, 'message' => 'Véhicule ou client introuvable'], 404);
        }
        $dateDebut = new \DateTime($data['date_debut']);
        $dateFin = new \DateTime($data['date_fin']);
        $prixTotale = $data['prix_totale'];
        $lieuDepart = $data['lieu_depart'] ?? null;

        // Vérifier s'il existe déjà une réservation qui se chevauche
        $overlaps = $em->getRepository(Location::class)
            ->findOverlappingReservations($data['voiture_id'], $dateDebut, $dateFin);
        if (count($overlaps) > 0) {
            return $this->json(['success' => false, 'message' => 'Ce véhicule est déjà réservé sur cette période.'], 400);
        }

        $reservation = new Location();
        $reservation->setVoiture($voiture);
        $reservation->setClient($client);
        $reservation->setDateDebut($dateDebut);
        $reservation->setDateFin($dateFin);
        $reservation->setPrixTotale($prixTotale);
        $reservation->setLieuDepart($lieuDepart);

        $em->persist($reservation);
        $em->flush();

        // Log MongoDB
        $logService->logReservation([
            'client_id' => $client->getId(),
            'client_email' => $client->getEmail(),
            'voiture_id' => $voiture->getId(),
            'voiture_modele' => $voiture->getModele(),
            'date_debut' => $dateDebut->format('Y-m-d'),
            'date_fin' => $dateFin->format('Y-m-d'),
            'prix_totale' => $prixTotale
        ]);

        return $this->json(['success' => true, 'message' => 'Réservation enregistrée !']);
    }

    #[Route('/api/voiture/{id}/reservations', name: 'api_voiture_reservations', methods: ['GET'])]
    public function getReservationsForVoiture($id, LocationRepository $locationRepository): JsonResponse
    {
        $locations = $locationRepository->findBy(['voiture' => $id]);
        $periods = array_map(function($loc) {
            return [
                'date_debut' => $loc->getDateDebut()->format('Y-m-d'),
                'date_fin' => $loc->getDateFin()->format('Y-m-d'),
            ];
        }, $locations);
        return $this->json($periods);
    }

    #[Route('/api/mes-locations', name: 'api_mes_locations', methods: ['GET'])]
    #[Route('/MayRent/back/public/api/mes-locations', name: 'api_mes_locations_alt', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function mesLocations(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }
        $locations = $em->getRepository(Location::class)->findBy(['client' => $user]);
        $data = array_map(function($loc) {
            return [
                'id' => $loc->getId(),
                'date_debut' => $loc->getDateDebut()->format('Y-m-d'),
                'date_fin' => $loc->getDateFin()->format('Y-m-d'),
                'prix_totale' => $loc->getPrixTotale(),
                'voiture' => [
                    'id' => $loc->getVoiture()->getId(),
                    'modele' => $loc->getVoiture()->getModele(),
                    'image_url' => $loc->getVoiture()->getImageUrl(),
                ],
            ];
        }, $locations);
        return $this->json($data);
    }

    #[Route('/api/test-mes-locations', name: 'api_test_mes_locations', methods: ['GET'])]
    public function testMesLocations(): JsonResponse
    {
        return $this->json(['message' => 'Test endpoint accessible', 'status' => 'ok']);
    }

    #[Route('/api/locations/{id}', name: 'api_location_delete', methods: ['DELETE'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function deleteLocation($id, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $location = $em->getRepository(Location::class)->find($id);
        if (!$location) {
            return $this->json(['error' => 'Réservation introuvable'], 404);
        }
        if ($location->getClient()?->getId() !== $user->getId()) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }
        $em->remove($location);
        $em->flush();
        return $this->json(['success' => true, 'message' => 'Réservation supprimée']);
    }

    #[Route('/api/locations/{id}', name: 'api_location_update', methods: ['PUT'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function updateLocation($id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $location = $em->getRepository(Location::class)->find($id);
        if (!$location) {
            return $this->json(['error' => 'Réservation introuvable'], 404);
        }
        if ($location->getClient()?->getId() !== $user->getId()) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data['date_debut'])) {
            $location->setDateDebut(new \DateTime($data['date_debut']));
        }
        if (isset($data['date_fin'])) {
            $location->setDateFin(new \DateTime($data['date_fin']));
        }
        if (isset($data['prix_totale'])) {
            $location->setPrixTotale($data['prix_totale']);
        }
        if (isset($data['lieu_depart'])) {
            $location->setLieuDepart($data['lieu_depart']);
        }
        $em->flush();
        return $this->json(['success' => true, 'message' => 'Réservation modifiée']);
    }
}
