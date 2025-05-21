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

    #[ORM\Column(length: 255)]
    private ?string $prix_totale = null;

    #[ORM\ManyToOne]
    private ?voiture $voiture = null;

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

    public function getPrixTotale(): ?string
    {
        return $this->prix_totale;
    }

    public function setPrixTotale(string $prix_totale): static
    {
        $this->prix_totale = $prix_totale;

        return $this;
    }

    public function getVoiture(): ?voiture
    {
        return $this->voiture;
    }

    public function setVoiture(?voiture $voiture): static
    {
        $this->voiture = $voiture;

        return $this;
    }
}
