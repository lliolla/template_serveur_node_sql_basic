// import models in table USER

const Model = require('../models');


// exports.getAllUsers =(req,res,next)=>{
//    Model.User.findAll({
//    attributes :['id', 'email','username','media','isAdmin'],// on precise les attributs que l'on veux recup)
//    })
//    .then(getAllUsers=>
//     res.status(200).json(getAllUsers)
//     )
//    .catch(error => res.status(404).json({error: "aucun utilisateur trouvé" }))
// }

// exports.displayUser= (req,res, next) =>{
//   // voir pour gerer le userid du token null quand on a pas le bon id
//   console.log("displayUser",req.body);
//      Model.User.findOne({
//        attributes :['id', 'email','username','media','isAdmin'],// on precise les attributs que l'on veux recup
//        where : {id : req.params.id}
//     })
//     .then(displayUser=> res.status(200).json( displayUser ))// on affiche l'utilisateur
//     .catch ((error)=> res.status(404).json( { error: "aucun utilisateur trouvé pour cet id"} ))
//   }

// exports.delateUser= (req,res, next) =>{
//   console.log("deleteUser",req.params.id)
//   Model.User.findOne({
//      attributes :['id','media'],// get media to deleate image in backend
//    })
//    .then(()=> {
//     Model.User.destroy({
//        where : {id : req.params.id}
//        })
//        .then(() => res.status(200).json({ message: 'utilisateur supprimé !'}))
//        .catch(error=> res.status(404).json( { error: " 1 un pb a eu lieu lors de l a suppression du post"}))
//    })
//    .catch(error=> res.status(404).json( { error: " 1 un pb a eu lieu lors de l a suppression du post"}))
//   }
  
// exports.updateUser= (req,res, next) =>{
// console.log("image par defaut update",req.file,req.body.media);
//   let username = req.body.username;
//   let firstname = req.body.firstname;
//   let lastname = req.body.lastname;
//   let email= req.body.email;
//   let idUser=req.params.id
//   let media =(req.file? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:req.body.media);
//   let userObject = { username,firstname,lastname,email,media,idUser}
//   console.log("userObject",req.body);
//      Model.User.update(
//        userObject,
//        {where : {id :req.params.id}
//       })
//       .then(updateUser => res.status(200).json(updateUser))
//       .catch(error => res.status(404).json({ error: "le profil n'a pas pu etre mis a jour"}))
//   };


