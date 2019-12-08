import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Client } = model;

class ClientController {  
  static getAllClients(req, res) {
    let num = req.params.num
    let der = (num * req.params.page) - num;
    let pagina = Number(req.params.page);    
    return Client
    .findAndCountAll({
      offset: der,
      limit: num,
      order:  [['name', 'DESC'],]      
    })
    .then(clients => res.status(200).send({'paginas':(Math.ceil(clients.count/num)),'pagina':pagina,'total':clients.count,'data': clients.rows }))
    .catch(error => res.status(400).send(error));
  }  

   static getListaClient(req, res) {   
   console.log('h') 
    let user = req.params.nit;   
    let iName = '%'+user+'%'     
    console.log(user)
    if(user === undefined || user === null || user === '')    
    { iName = '%' }
    return Client
    .findAll({
        hierarchy: true,        
        limit: 12,
        order: ['name'],
        where: { nit: {[Op.iLike]: iName }},
        attributes:['id','name','nit'],
      })
    .then(clients => res.status(200).send({'data': clients }))
    .catch(error => res.status(400).send(error));
  } 

  static addClient(req, res) {
    if (!req.body.name) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newClient = req.body      
      return Client
        .create(newClient)
        .then(task => 
           Client
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(clients => res.status(200).send({'paginas':(Math.ceil(clients.count/12)),'pagina':1,'total':clients.count,'data': clients.rows }))
            .catch(error => res.status(400).send(error))       
          )
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedClient(req, res) {
    const upClient = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Client
        .update(upClient, { where: { id: Number(id) }})
        .then(user =>             
               Client
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(clients => res.status(200).send({'paginas':(Math.ceil(clients.count/12)),'pagina':1,'total':clients.count,'data': clients.rows }))
            .catch(error => res.status(400).send(error))  
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getAClient(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Client
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userClient => {
          if(!userClient){
            res.status(404).send({'message':`Client with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userClient})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteClient(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Client
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Client
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                   Client
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(clients => res.status(200).send({'paginas':(Math.ceil(clients.count/12)),'pagina':1,'total':clients.count,'data': clients.rows }))
            .catch(error => res.status(400).send(error))  
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

}

export default ClientController;