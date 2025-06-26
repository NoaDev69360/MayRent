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
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class InscriptionController extends AbstractController
{
    private $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    #[Route('/api/register', name: 'api_register', methods: ['OPTIONS', 'POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        // Utilisation du chemin absolu Symfony
        $logPath = $this->params->get('kernel.project_dir') . '/var/roles_debug.txt';
        file_put_contents($logPath, 'DEBUT INSCRIPTION');

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

            // Attribution du rôle selon le type d'inscription
            $type = $data['type'] ?? null;
            if ($type === 'professionnel' || isset($data['siret'])) {
                $client->setRoles(['ROLE_PRO']);
                $userType = 'professionnel';
                $userRole = 'ROLE_PRO';
                if (!empty($data['siret'])) {
                    $client->setSiret($data['siret']);
                }
            } elseif ($type === 'locataire') {
                $client->setRoles(['ROLE_LOCATAIRE']);
                $userType = 'locataire';
                $userRole = 'ROLE_LOCATAIRE';
            } else {
                $client->setRoles(['ROLE_PARTICULIER']);
                $userType = 'particulier';
                $userRole = 'ROLE_PARTICULIER';
            }
            // Forcer la persistance du champ roles
            $client->setRoles($client->getRawRoles());

            // Log la valeur brute des rôles juste avant le flush dans var/
            file_put_contents($logPath, json_encode([
                'roles' => $client->getRawRoles(),
                'type' => $type,
                'data' => $data
            ], JSON_PRETTY_PRINT));
            if (method_exists($this, 'getLogger')) {
                $this->getLogger()->info('Roles debug', [
                    'roles' => $client->getRawRoles(),
                    'type' => $type,
                    'data' => $data
                ]);
            }

            $errors = $validator->validate($client);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return $this->json([
                    'message' => 'Erreur lors de l\'inscription',
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
                    'type' => $userType,
                    'role' => $userRole
                ]
            ], JsonResponse::HTTP_OK);

            return $response;

        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
