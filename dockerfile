# Utilisez l'image de base Node.js
FROM node:19

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le dossier client contenant le front-end dans le répertoire de travail du serveur
COPY ./client ./client

# Expose le port 5000 pour accéder au serveur Express
EXPOSE 5000

# Commande de démarrage pour lancer le serveur Express
CMD ["npm", "start"]
