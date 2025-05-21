<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240619143318 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE voiture ADD id_client_id INT DEFAULT NULL, ADD id_categorie_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE voiture ADD CONSTRAINT FK_E9E2810F99DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE voiture ADD CONSTRAINT FK_E9E2810F9F34925F FOREIGN KEY (id_categorie_id) REFERENCES categorie (id)');
        $this->addSql('CREATE INDEX IDX_E9E2810F99DED506 ON voiture (id_client_id)');
        $this->addSql('CREATE INDEX IDX_E9E2810F9F34925F ON voiture (id_categorie_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE voiture DROP FOREIGN KEY FK_E9E2810F99DED506');
        $this->addSql('ALTER TABLE voiture DROP FOREIGN KEY FK_E9E2810F9F34925F');
        $this->addSql('DROP INDEX IDX_E9E2810F99DED506 ON voiture');
        $this->addSql('DROP INDEX IDX_E9E2810F9F34925F ON voiture');
        $this->addSql('ALTER TABLE voiture DROP id_client_id, DROP id_categorie_id');
    }
}
