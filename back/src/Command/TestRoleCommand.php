<?php

namespace App\Command;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class TestRoleCommand extends Command
{
    protected static $defaultName = 'app:test-role';
    protected static $defaultDescription = 'Test persistance du champ roles sur un utilisateur.';

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }

    protected function configure(): void
    {
        $this->setName(self::$defaultName);
        $this->setDescription(self::$defaultDescription);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $client = $this->entityManager->getRepository(Client::class)->findOneBy(['email' => 'albert@jaune.fr']);
        if (!$client) {
            $output->writeln('Client non trouvé');
            return Command::FAILURE;
        }
        $client->setRoles(['ROLE_TEST']);
        $this->entityManager->flush();
        $output->writeln('Rôle modifié !');
        return Command::SUCCESS;
    }
} 