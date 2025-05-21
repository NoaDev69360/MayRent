<?php

namespace App\Entity;

use App\Repository\CategorieRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategorieRepository::class)]
class Categorie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $sport = null;

    #[ORM\Column(length: 255)]
    private ?string $supersportive = null;

    #[ORM\Column(length: 255)]
    private ?string $citadine = null;

    #[ORM\Column(length: 255)]
    private ?string $Truck = null;

    #[ORM\Column(length: 255)]
    private ?string $hybride = null;

    #[ORM\Column(length: 255)]
    private ?string $cabriolet = null;

    #[ORM\Column(length: 255)]
    private ?string $familiale = null;

    #[ORM\Column(length: 255)]
    private ?string $luxe = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSport(): ?string
    {
        return $this->sport;
    }

    public function setSport(string $sport): static
    {
        $this->sport = $sport;

        return $this;
    }

    public function getSupersportive(): ?string
    {
        return $this->supersportive;
    }

    public function setSupersportive(string $supersportive): static
    {
        $this->supersportive = $supersportive;

        return $this;
    }

    public function getCitadine(): ?string
    {
        return $this->citadine;
    }

    public function setCitadine(string $citadine): static
    {
        $this->citadine = $citadine;

        return $this;
    }

    public function getTruck(): ?string
    {
        return $this->Truck;
    }

    public function setTruck(string $Truck): static
    {
        $this->Truck = $Truck;

        return $this;
    }

    public function getHybride(): ?string
    {
        return $this->hybride;
    }

    public function setHybride(string $hybride): static
    {
        $this->hybride = $hybride;

        return $this;
    }

    public function getCabriolet(): ?string
    {
        return $this->cabriolet;
    }

    public function setCabriolet(string $cabriolet): static
    {
        $this->cabriolet = $cabriolet;

        return $this;
    }

    public function getFamiliale(): ?string
    {
        return $this->familiale;
    }

    public function setFamiliale(string $familiale): static
    {
        $this->familiale = $familiale;

        return $this;
    }

    public function getLuxe(): ?string
    {
        return $this->luxe;
    }

    public function setLuxe(string $luxe): static
    {
        $this->luxe = $luxe;

        return $this;
    }
}
