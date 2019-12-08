import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Message, User } = model;

class MessageController {  
  static getAllMessages(req, res) {
    let der = (15 * req.params.page) - 15 ;
    let pagina = Number(req.params.page);  
    return Message
    .findAndCountAll({
        hierarchy: true,   
        offset: der,
        limit: 15,                     
        order:  [['createdAt', 'DESC'],],             
        where: {[Op.and]: [{ userId: Number(req.params.user) },{ tipo: req.params.tipo }]}
        })      
    .then(messages => 
        Message
        .findAndCountAll({           
          attributes: ['id'],          
          hierarchy: true,   
          offset: 0,
          limit: 1,
          where: {[Op.and]: [{ userId: Number(req.params.user) },
                             { tipo: req.params.tipo },
                             { state: false }
                            ]}
        })
        .then(totales => 
        res.status(200).send({'paginas':(Math.ceil(messages.count/15)),'pagina':pagina,'total':messages.count,'data': messages.rows,'pendientes':totales.count})
        ))                    
    .catch(error => res.status(400).send(error));
  }

  static addMessage(req, res) {
    console.log(req.body)
    if (!req.body.subject) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const { to, from, subject, importance, message, userId, originId, tipo, state  } = req.body
      const opt = tipo === 'enviado' ? 'recibido' : 'enviado'
      const newMessage   = req.body
      const otherMessage = {
          to :to, 
          from: from, 
          subject: subject, 
          importance: importance, 
          message: message, 
          userId : originId, 
          originId : userId, 
          state: false,
          tipo : opt
      }
      return Message
        .create(newMessage)
        .then(task => 
            Message
             .create(otherMessage)
             .then(userMessage => res.status(200).send({'message':'Message Sending','mail1':newMessage,'mail2':otherMessage}))
        )      
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedMessage(req, res) {
    const upMessage = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Message
        .update(upMessage, { where: { id: Number(id) }})
        .then(user => 
            Message
              .findOne({  where: { id: id }})
              .then(userMessage => res.status(200).send({'message':'Message Update','user':userMessage}))
              .catch(error => res.status(400).send(error))
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getAMessage(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Message
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userMessage => {
          if(!userMessage){
            res.status(404).send({'message':`Message with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userMessage})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteMessage(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Message
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Message
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                  Message
                    .findAll({  where: { userId: task.userId }})
                    .then(messages => res.status(200).send({'message':'Lista messages','data':messages}))
                    .catch(error => res.status(400).send(error))
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

}

export default MessageController;