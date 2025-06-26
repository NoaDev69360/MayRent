<?php

namespace App\Command;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-admin',
    description: 'Creates a new admin user.',
)]
class CreateAdminCommand extends Command
{
    private $entityManager;
    private $passwordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::REQUIRED, 'The email of the admin.')
            ->addArgument('password', InputArgument::REQUIRED, 'The password of the admin.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $email = $input->getArgument('email');
        $password = $input->getArgument('password');

        $clientRepository = $this->entityManager->getRepository(Client::class);
        $existingUser = $clientRepository->findOneBy(['email' => $email]);

        if ($existingUser) {
            $io->error('A user with this email already exists.');
            return Command::FAILURE;
        }

        $admin = new Client();
        $admin->setEmail($email);
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPassword($this->passwordHasher->hashPassword($admin, $password));
        
        // Nous devons fournir des valeurs pour les champs obligatoires qui ne s'appliquent pas à un admin.
        $admin->setPrenom('Admin');
        $admin->setNom('User');
        $admin->setTelephone('0000000000');

        $this->entityManager->persist($admin);
        $this->entityManager->flush();

        $io->success('Admin user created successfully! You can now log in with the email: ' . $email);

        return Command::SUCCESS;
    }
} 