<?php

namespace App\Entity;

use App\Repository\LocationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LocationRepository::class)]
class Location
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_debut = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_fin = null;

    #[ORM\Column]
    private ?float $prix_totale = null;

    #[ORM\ManyToOne]
    private ?Voiture $voiture = null;

    #[ORM\ManyToOne(inversedBy: 'locations')]
    #[ORM\JoinColumn(name: "client_id", referencedColumnName: "id", nullable: true)]
    private ?\App\Entity\Client $client = null;

    #[ORM\Column(type: Types::STRING, length: 255, nullable: true)]
    private ?string $lieu_depart = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->date_debut;
    }

    public function setDateDebut(\DateTimeInterface $date_debut): static
    {
        $this->date_debut = $date_debut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->date_fin;
    }

    public function setDateFin(\DateTimeInterface $date_fin): static
    {
        $this->date_fin = $date_fin;

        return $this;
    }

    public function getPrixTotale(): ?float
    {
        return $this->prix_totale;
    }

    public function setPrixTotale(float $prix_totale): static
    {
        $this->prix_totale = $prix_totale;

        return $this;
    }

    public function getVoiture(): ?Voiture
    {
        return $this->voiture;
    }

    public function setVoiture(?Voiture $voiture): static
    {
        $this->voiture = $voiture;

        return $this;
    }

    public function getClient(): ?\App\Entity\Client
    {
        return $this->client;
    }

    public function setClient(?\App\Entity\Client $client): static
    {
        $this->client = $client;
        return $this;
    }

    public function getLieuDepart(): ?string
    {
        return $this->lieu_depart;
    }

    public function setLieuDepart(?string $lieu_depart): static
    {
        $this->lieu_depart = $lieu_depart;
        return $this;
    }
}
