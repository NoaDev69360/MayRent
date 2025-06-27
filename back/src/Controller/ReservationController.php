<?php

namespace App\Controller;

use App\Entity\Location;
use App\Entity\Voiture;
use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\LocationRepository;

class ReservationController extends AbstractController
{
    #[Route('/api/reserver', name: 'api_reserver', methods: ['POST'])]
    public function reserver(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['voiture_id'], $data['client_id'], $data['date_debut'], $data['date_fin'], $data['prix_totale'])) {
            return $this->json(['success' => false, 'message' => 'Données manquantes'], 400);
        }
        $voiture = $em->getRepository(Voiture::class)->find($data['voiture_id']);
        $client = $em->getRepository(Client::class)->find($data['client_id']);
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
}
