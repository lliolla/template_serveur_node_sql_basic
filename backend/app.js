//import
const express = require('express');// on ajoute express au projet

// on importe le router des users
// const userRoutes = require('./routes/routeUser'); // import du router
// const authRoutes = require('./routes/routeAuth'); // import du router
// const postRoutes = require('./routes/routePost'); // import du router
//const cmtRoutes = require('./routes/routeCmt'); // import du router

//gerer les erreurs de cors avec le front end
const cors = require('cors');

// const path = require('path');       // importation du paquet node "path" qui donne accès au chemin du système de fichier

const app = express();


// Eviter les erros CORS afin que tout le monde puisse faire des requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à l'API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// on donne l'autorisation de utiliser certaines entete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');// et aussi sur certaines methodes
    next();// j'appelle next() pour passer au middleware d'apres
});

// remplace l'appel a bodyParser qui est déprecié
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json());

 app.use(cors({ origin: ['http://localhost:3000'], }))
 

// app.use('/images', express.static(path.join(__dirname, 'images')));   // middleware spécifique qui permet de servir le dossier image lors d'une requête spécifique avec l'image

//enregistrement du router vers les routes d'authentification
// pointer vers les fonctions assignées à la route d'autentification app.use('/api/v1/auth', authRoutes);
// pointer vers les fonctions assignées à la route de gestion des users app.use('/api/v1/user', userRoutes);
// pointer vers les fonctions assignées à la route de gestion des posts app.use('/api/v1/post', postRoutes);
// pointer vers les fonctions assignées à la route de gestion des commentaires app.use('/api/v1/cmt', cmtRoutes);

module.exports = app;// Export de l'application




