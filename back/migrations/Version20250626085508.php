<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250626085508 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE categorie ADD nom VARCHAR(255) NOT NULL, DROP sport, DROP supersportive, DROP citadine, DROP truck, DROP hybride, DROP cabriolet, DROP familiale, DROP luxe');
        $this->addSql('ALTER TABLE location CHANGE prix_totale prix_totale DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE voiture CHANGE puissance puissance INT NOT NULL, CHANGE prix_jour prix_jour DOUBLE PRECISION NOT NULL, CHANGE nom modele VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE categorie ADD supersportive VARCHAR(255) NOT NULL, ADD citadine VARCHAR(255) NOT NULL, ADD truck VARCHAR(255) NOT NULL, ADD hybride VARCHAR(255) NOT NULL, ADD cabriolet VARCHAR(255) NOT NULL, ADD familiale VARCHAR(255) NOT NULL, ADD luxe VARCHAR(255) NOT NULL, CHANGE nom sport VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE voiture CHANGE puissance puissance VARCHAR(255) NOT NULL, CHANGE prix_jour prix_jour VARCHAR(255) NOT NULL, CHANGE modele nom VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE location CHANGE prix_totale prix_totale VARCHAR(255) NOT NULL');
    }
}
