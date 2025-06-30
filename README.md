MayRent - Guide de Déploiement
Prérequis système

    OS : Ubuntu 20.04+ recommandé

    Logiciels nécessaires :

        Docker

        Docker Compose

        Git

    Configuration réseau :

        Ports ouverts : 80 (HTTP), 443 (HTTPS)

        Accès SSH configuré (clé privée pour l'automatisation)

Installation manuelle
1. Connexion au serveur
bash

ssh -i <votre-cle.pem> ubuntu@<ip-de-votre-serveur>

2. Récupération du code
bash

git clone https://github.com/<utilisateur>/<repo>.git mayrent
cd mayrent

3. Configuration

Éditez le fichier .env dans le dossier backend avec vos paramètres :

    Configuration de la base de données

    Clé JWT

    Autres variables d'environnement

4. Lancement des conteneurs
bash

docker compose build
docker compose up -d

5. Vérification

Accédez à l'application :
http://<ip-de-votre-serveur>

Pour consulter les logs :
bash

docker compose logs

Déploiement automatisé (CI/CD)

Le projet utilise GitHub Actions pour déployer automatiquement à chaque push sur main.
Configuration requise

Ajoutez ces secrets dans GitHub :

    AWS_EC2_SSH_KEY : Clé privée SSH (format PEM)

    AWS_EC2_HOST : IP/DNS du serveur

Workflow exemple
yaml

jobs:
  deploy-aws:
    runs-on: ubuntu-latest
    steps:
      - name: Set up SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.AWS_EC2_SSH_KEY }}
      - name: Deploy via SSH
        run: |
          ssh -o StrictHostKeyChecking=no ubuntu@${{ secrets.AWS_EC2_HOST }} '
            cd /home/ubuntu/mayrent &&
            git pull origin main &&
            docker compose down &&
            docker compose build &&
            docker compose up -d
          '

Maintenance
Consulter les logs
bash

docker compose logs

Redémarrer un service
bash

docker compose restart <nom-du-service>

Mise à jour de l'application
bash

git pull origin main
docker compose build
docker compose up -d
