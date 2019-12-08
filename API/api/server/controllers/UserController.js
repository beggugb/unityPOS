import model from '../src/models'
import Util from '../utils/Utils';
import jwt    from 'jsonwebtoken'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs')

const { User, Rol, Module } = model;

class UserController {
  
  static getAllUsers(req, res) {
    let der = (10 * req.params.page) - 10 ;
    let pagina = Number(req.params.page);    
    return User
    .findAndCountAll({
        hierarchy: true,
        offset: der,
        limit: 10,
        order: ['name'],
         include: [     
          { model: Rol, attributes: ['name']}]
      })
    .then(users => res.status(200).send({'paginas':(Math.ceil(users.count/10)),'pagina':pagina,'total':users.count,'data': users.rows }))
    .catch(error => res.status(400).send(error));
  }

  static getListaUsers(req, res) {    
    let user = req.params.user;   
    let iName = '%'+user+'%'     
    console.log(user)
    if(user === undefined || user === null || user === '')    
    { iName = '%' }
  console.log(iName)
    return User
    .findAll({
        hierarchy: true,        
        limit: 15,
        order: ['name'],
        where: { name: {[Op.iLike]: iName }},
        attributes:['id','name'],
      })
    .then(users => res.status(200).send({'data': users }))
    .catch(error => res.status(400).send(error));
  }

  static addUser(req, res) {
    if (!req.body.name) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newUser = req.body
      return User
        .create(newUser)
        .then(userItem =>          
         res.status(200).send({'message':'User Created','user':userItem}))            
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedUser(req, res) {
    const upUser = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return User
        .update(upUser, { where: { id: Number(id) }})
        .then(user => 
            User
              .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
              .then(userItem => res.status(200).send({'message':'User Update','user':userItem}))
              .catch(error => res.status(400).send(error))
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getAUser(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return User
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userItem => {
          if(!userItem){
            res.status(404).send({'message':`User with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userItem})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteUser(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return User
        .destroy({  where: { id: id }})
        .then(userItem =>           
          res.status(404).send({'message':`Delete user id ${id} success`}))  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static loginUser(req, res) {   
   const { username, password } = req.body  
    return User
    .findOne({ where :{ [Op.and]: [ { username: {[Op.eq]: username }},
             { enabled: {[Op.eq]: true }}]} })
    .then((user)=>{     
      if(!user){
       return res.status(401).send({
            message: 'Authentication fallida . Usuario no existe.',
          });
      }
      user.comparePassword(password, (err, isMatch) => {
        if(isMatch && !err) {
          let payload = { user_id: user.id, username: user.username }
          let token = jwt.sign(payload, 'unity2019', {expiresIn: '2629746000'});            
        Module
          .findAndCountAll({order:  [['id', 'ASC'],], where :  {
            [Op.and]: [{ rolId: user.rolId },{ enabled: true }]},
            offset: 0,limit: 20,})
          .then(items => res.status(200).send({auth: true,message: 'Acceso correcto','user':user,'data': items.rows,token:token }))

        }else{
           res.status(401).send({success: false, message: 'Autenticación fallida. contraseña incorrecta.'});           
        }

      })

    })
    .catch((error) => res.status(400).send(error)); 
  }

}

export default UserController;