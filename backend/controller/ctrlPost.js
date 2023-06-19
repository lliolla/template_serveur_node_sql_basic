// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { log } = require('console');
// const { log } = require('console');


exports.createPost = (req,res,next)=>{

// specify params 
const title = req.body.title;
const content = req.body.content;
const  media = (req.file? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null)

const token = req.headers.authorization.split(" ")[1];
const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
const UserId = decodedToken.userId;

////test empty field
if (title == null ||title <= 0 || content==null||content <= 0 ){
  return res.status(400).json({ error: " un champ obligatoire est vide " });
}
// verify length 's text
if(title.length >=50 || title.length <= 2 ){
  return res.status(400).json({ error: "Votre titre doit contenir entre 3 et 50 lettres " });
}
// // verify length 's content
if(content.length <=2 ||content.length >= 500 ){
  return res.status(400).json({ error: "Votre contenu doit contenir entre 3 et 500 lettres "});
}

 let newPost ={UserId,title,content,media}
 console.log("backend post pret a envoye en bd",newPost);
 Model.Post.create(newPost)
     .then(newPost=> res.status(201).json(newPost))
     .catch(error => res.status(400).json ({error: 'impossible de créer le post'}))
}


// on recupere tous les posts de tous les users //limiter le nombre de post en faisant une pagination
exports.getAllPosts = (req,res,next)=>{
    console.log('getAllPosts');
    Model.Post.findAll({
        attributes :['id', 'title','content', 'UserId', 'media','updatedAt'],
        include: [ Model.User] ,
        order: [["id", "DESC"]],
      },)
      .then(post=> res.status(200).json(post))
      .catch(error => res.status(404).json({error : "aucun post trouvé" }))
}
// on recupere tous les posts d'un user

exports.getOnePost = (req,res,next)=>{
    Model.Post.findOne({
        attributes :['id', 'title','content','UserId', 'media'],// on precise les attributs que l'on veux recup
        where : {id : req.params.id}
     })
     .then(displayPost=> res.status(200).json(displayPost ))// on affiche l'utilisateur
     .catch ((error)=> res.status(404).json( { error: "aucun post trouvé pour cet utilisateur"} ))
}

exports.updatePost = (req,res,next)=>{
  console.log("media",req.file,req.body.media);
   let title = req.body.title;
   let content = req.body.content;
  let media =(req.file? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:req.body.media);
   let updateObject = { title,content,media}
   console.log('updatePost back',updateObject.media);
       Model.Post.update(
        updateObject , 
        {where : {id : req.params.id} })
            .then(updatePost => res.status(200).json(updatePost))
            .catch(error => res.status(404).json({ error: "le post n'a pas pu etre mis ajour"}))
}

exports.delatePost = (req,res,next)=>{
  
  Model.Post.findOne({
    where : {id : req.params.id},
    attributes : ['id','media']
  })
  .then(delatePost=>{
    if(delatePost.media){
      const filename = delatePost.media.split('/images/')[1]
      fs.unlink(`images/${filename}`,()=>{
        Model.Post.destroy( {
          where : {id : req.params.id}
        })
          .then(() => res.status(200).json({ message: 'post supprimé !'}))
          .catch(error=> res.status(404).json( { error: "un pb a eu liue lors de l a suppression du post"}))
      })
    }else{
      Model.Post.destroy( {
           where : {id : req.params.id}
         })
           .then(() => res.status(200).json({ message: 'post supprimé !'}))
           .catch(error=> res.status(404).json( { error: "un pb a eu liue lors de l a suppression du post"}))
    }
      
  })
  .catch()
}
  
 exports.getOneUserPosts = (req,res,next)=>{
  let idUser = req.params.id
  console.log('getOneUserPost',idUser);
 
      Model.Post.findAll({
      where : {UserId : idUser},
      attributes :['id', 'title','content','UserId', 'media','updatedAt'],
      include: [ Model.User] ,
      order: [["id", "DESC"]],
      })
      .then(userPosts =>{
        console.log("userPosts",userPosts);
        if(userPosts.length <= 0){
          return res.status(404).json({error: "Vous n'avez publié aucun article"})
    
        }else{
          return res.status(200).json(userPosts)
        }
          
      } )
      .catch((error)=>res.status(404).json({error: "aucun posts trouvé pour cet utilisateur"}))
    

}


