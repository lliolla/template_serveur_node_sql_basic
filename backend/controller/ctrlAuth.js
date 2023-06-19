//import
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

// import models in table USER
const Model = require('../models');

// const regex mail
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d).{4,8}$/ ;

// function for register new user
exports.register = (req,res,next) => {
    //params
        const isAdmin =req.body.isAdmin;
        const email = req.body.email;
        const username = req.body.username;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const media =`${req.protocol}://${req.get('host')}/images/avatar.jpg`
        const password = req.body.password;
        if(email==null || username==null || password==null){
            return res.status(400).json({ error: " un champ obligatoire est vide " });
        }
    // security check with regex mail and lenght username
        if(username.length >=15 || username.length <= 3 ){
            return res.status(400).json({ error: "Votre identifiant doit contenir entre 3 et 15 lettres " }); 
        }
        if(!emailRegex.test(email)){
            return res.status(400).json({ error: "Votre email n'est pas valide" }); 
        }
        if(!passwordRegex.test(password)){
            return res.status(400).json({ error: "Votre mot de passe doit contenir entre 4 et 8 caractere et inclure un nombre" }); 
        }

    //bcrypt hsh password           
        let hash = bcrypt.hashSync(password, 10) //Sync permet de ne pas utiliser await
        let newUser = {
            email : email,
            username : username,
            firstname : firstname,
            lastname : lastname,
            password : hash,
            media:media,
            isAdmin:isAdmin
        };
      
    // verifiy if user exist in table user in db (compare attributes email and email in response)
    Model.User.findOne({
        attributes :['email'],
        where :{email :email }// userfound
    })
   
    .then((userfound)=> { 
        if(!userfound){
        //if email not found in DB ,create  new instance of user and save un DB . it build and save user with create
            Model.User.create(newUser)
            .then(newUser=> res.status(201).send(newUser))
            .catch(error =>res.status(400).json({ 'error': 'impossible de trouver cet utilisateur', newUser}));    

        } else{     
              return res.status(409).json({ 'error': 'Ce mail est déja utilisé par un autre utilisateur',userfound })
             

        }  })
    .catch(error => res.status(500).json({error:'aucun compte ne correspond'}))
};
    

// fonction pour connecter des utilisateurs existants
exports.loging = (req,res, next) => {

 //params
 const email = req.body.email;
 const password = req.body.password;

//test empty field
if(email==null || password==null){
    return res.status(400).json({ error: " un champ obligatoire est vide " });
}

//find if user existe with email in DB
 Model.User.findOne({
     atrributes :['email'],
     where : { email : email} 
 })
     .then(userExist =>{
        // if userExist verify if password is the same that hash password 
         if(userExist){
             bcrypt.compare(password,userExist.password)
                .then((valid)=> {// return true ou false
                    if(valid){//if password is the same send a token with response
                        res.status(200).json({
                            message : 'utilisateur identifié',
                            userId: userExist.id,
                            media :userExist.media,
                            username:userExist.username,
                            email:userExist.email,
                            isAdmin:userExist.isAdmin,
                            token: jwt.sign(
                                { userId: userExist.id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '1h' }
                            )
                    })    ;
                    }else{
                        return res.status(404).json({ error: 'Le mot de passe et l \'Email ne correspondent pas ' }); 
                    }})
                .catch(error => res.status(500).json({error:' probleme avec les mots de passe' }))
            
        }else{
             return res.status(401).json({ error: 'Aucun compte ne correspond à cet email' });
         }})
     .catch(error => res.status(500).json({error:' utilisateur non trouvé' }));
 };


