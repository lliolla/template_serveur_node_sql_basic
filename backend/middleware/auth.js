const jwt = require('jsonwebtoken');

//en production remplacer RANDOM_TOKEN_SECRET par une chaine de caractere longue avec bcq de carectere differents
module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]; //on recupere le token dans le header autorization,on split tout ce qui est apres le bearer
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// on decode le token avec verify
        const userId = decodedToken.userId;//on recupère l'id du token
        //on comparer id de l'utilisateur avec l'id extrait du token
        console.log('backend token',token,req.body.userId );
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch {
        res.status(401).json(
          {error: "requette non authentifiée"}
          
        );
      }   
}