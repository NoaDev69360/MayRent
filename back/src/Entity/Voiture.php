<?php

namespace App\Entity;

use App\Repository\VoitureRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VoitureRepository::class)]
class Voiture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $immatriculation = null;

    #[ORM\Column(length: 255)]
    private ?string $couleur = null;

    #[ORM\Column(length: 255)]
    private ?string $puissance = null;

    #[ORM\Column(length: 255)]
    private ?string $prix_jour = null;

    #[ORM\ManyToOne(inversedBy: 'voitures')]
    private ?client $id_client = null;

    #[ORM\ManyToOne]
    private ?categorie $id_categorie = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImmatriculation(): ?string
    {
        return $this->immatriculation;
    }

    public function setImmatriculation(string $immatriculation): static
    {
        $this->immatriculation = $immatriculation;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getPuissance(): ?string
    {
        return $this->puissance;
    }

    public function setPuissance(string $puissance): static
    {
        $this->puissance = $puissance;

        return $this;
    }

    public function getPrixJour(): ?string
    {
        return $this->prix_jour;
    }

    public function setPrixJour(string $prix_jour): static
    {
        $this->prix_jour = $prix_jour;

        return $this;
    }

    public function getIdClient(): ?client
    {
        return $this->id_client;
    }

    public function setIdClient(?client $id_client): static
    {
        $this->id_client = $id_client;

        return $this;
    }

    public function getIdCategorie(): ?categorie
    {
        return $this->id_categorie;
    }

    public function setIdCategorie(?categorie $id_categorie): static
    {
        $this->id_categorie = $id_categorie;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }
}
