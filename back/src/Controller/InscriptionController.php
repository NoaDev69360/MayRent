<?php

namespace App\Controller;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class InscriptionController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['OPTIONS', 'POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        // Gérer la requête OPTIONS pour le CORS
        if ($request->getMethod() === 'OPTIONS') {
            $response = new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
            $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
            $response->headers->set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type');
            return $response;
        }

        try {
            $data = json_decode($request->getContent(), true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json([
                    'message' => 'Invalid JSON data'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            // Vérifier que tous les champs requis sont présents
            $requiredFields = ['prenom', 'nom', 'email', 'password', 'telephone'];
            $missingFields = array_filter($requiredFields, fn($field) => empty($data[$field]));
            
            if (!empty($missingFields)) {
                return $this->json([
                    'message' => 'Missing required fields: ' . implode(', ', $missingFields)
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $client = new Client();
            $client->setPrenom($data['prenom']);
            $client->setNom($data['nom']);
            $client->setEmail($data['email']);
            $client->setPassword($passwordHasher->hashPassword($client, $data['password']));
            $client->setTelephone($data['telephone']);

            $errors = $validator->validate($client);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return $this->json([
                    'message' => 'Validation failed',
                    'errors' => $errorMessages
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $entityManager->persist($client);
            $entityManager->flush();

            // Générer le token JWT
            $token = $jwtManager->create($client);

            $response = $this->json([
                'message' => 'Inscription réussie !',
                'status' => 'success',
                'token' => $token,
                'user' => [
                    'email' => $client->getEmail(),
                    'firstName' => $client->getPrenom(),
                    'lastName' => $client->getNom(),
                    'type' => 'particulier'
                ]
            ], JsonResponse::HTTP_CREATED);

            return $response;

        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
