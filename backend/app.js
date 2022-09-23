const express = require('express');
const mongoose = require('mongoose');

// const userRoutes = require('./routes/routesUser');
const modelSauce = require('./models/modelSauce');

mongoose.connect('mongodb+srv://Vivi:UserV7MGODB94@clusterv.nxwipcn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.post('/api/sauces', (req, res, next) => {
//   delete req.body.userId;
//   const modelSauce = new modelSauce({
//     ...req.body
//   });
//   thing.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//     .catch(error => res.status(400).json({ error }));
// });

// app.get('/api/sauces', (req, res, next) => {
//   const sauce = [
//     {
//       userId: 'L identifiant MongoDB unique de l utilisateur qui a créé la sauce',
//       name: 'Nom de la sauce',
//       manufacturer: 'fabricant de la sauce',
//       description: 'description de la sauce',
//       mainPepper: 'le principal ingrédient épicé de la sauce',
//       imageUrl: 'l URL de l image de la sauce téléchargée par l utilisateur',
//       heat: 'nombre entre 1 et 10 décrivant la sauce',
//       likes: 'nombre d utilisateurs qui aiment (= likent) la sauce',
//       dislikes: 'nombre d utilisateurs qui n aiment pas (= dislike) la sauce',
//       usersLiked: 'tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce',
//       usersDisliked: 'tableau des identifiants des utilisateurs qui n ont pas aimé (= disliked) la sauce',
//     },
//   ];
//   res.status(200).json(sauce);
// });

app.use('/api/sauces', (req, res, next) => {
  modelSauce.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});



app.use((req, res, next) => {
    res.status(201);
    next();
  });
  
  app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });
  
// importation du router
app.use('/api/sauces', routesSauces);
app.use('api/auth', routesUser);

module.exports = app;
