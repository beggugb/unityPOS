import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Type } = model;

class TypeController {  
  static getAllTypes(req, res) {
    let num = req.params.num
    let der = (num * req.params.page) - num;
    let pagina = Number(req.params.page);    
    return Type
    .findAndCountAll({
      offset: der,
      limit: num,
      order:  [['name', 'DESC'],]      
    })
    .then(types => res.status(200).send({'paginas':(Math.ceil(types.count/num)),'pagina':pagina,'total':types.count,'data': types.rows }))
    .catch(error => res.status(400).send(error));
  }  

  
   static getListaType(req, res) {    
    let user = req.params.name;   
    let iName = '%'+user+'%'     
    console.log(user)
    if(user === undefined || user === null || user === '')    
    { iName = '%' }
    return Type
    .findAll({
        hierarchy: true,        
        limit: 12,
        order: ['name'],
        where: { name: {[Op.iLike]: iName }},
        attributes:['id','name','code'],
      })
    .then(types => res.status(200).send({'data': types }))
    .catch(error => res.status(400).send(error));
  }

  static addType(req, res) {
    if (!req.body.name) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newType = req.body      
      return Type
        .create(newType)
        .then(task => 
           Type
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(types => res.status(200).send({'paginas':(Math.ceil(types.count/12)),'pagina':1,'total':types.count,'data': types.rows }))
            .catch(error => res.status(400).send(error))       
          )
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedType(req, res) {
    const upType = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Type
        .update(upType, { where: { id: Number(id) }})
        .then(user =>             
               Type
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(types => res.status(200).send({'paginas':(Math.ceil(types.count/12)),'pagina':1,'total':types.count,'data': types.rows }))
            .catch(error => res.status(400).send(error))  
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getAType(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Type
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userType => {
          if(!userType){
            res.status(404).send({'message':`Type with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userType})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteType(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Type
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Type
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                   Type
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(types => res.status(200).send({'paginas':(Math.ceil(types.count/12)),'pagina':1,'total':types.count,'data': types.rows }))
            .catch(error => res.status(400).send(error))  
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

}

export default TypeController;