import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Mark } = model;

class MarkController {  
  static getAllMarks(req, res) {
    let num = req.params.num
    let der = (num * req.params.page) - num;
    let pagina = Number(req.params.page);    
    return Mark
    .findAndCountAll({
      offset: der,
      limit: num,
      order:  [['name', 'DESC'],]      
    })
    .then(marks => res.status(200).send({'paginas':(Math.ceil(marks.count/num)),'pagina':pagina,'total':marks.count,'data': marks.rows }))
    .catch(error => res.status(400).send(error));
  }  

   static getListaMark(req, res) {    
    let user = req.params.name;   
    let iName = '%'+user+'%'     
    console.log(user)
    if(user === undefined || user === null || user === '')    
    { iName = '%' }
    return Mark
    .findAll({
        hierarchy: true,        
        limit: 12,
        order: ['name'],
        where: { name: {[Op.iLike]: iName }},
        attributes:['id','name','code'],
      })
    .then(marks => res.status(200).send({'data': marks }))
    .catch(error => res.status(400).send(error));
  } 

  static addMark(req, res) {
    if (!req.body.name) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newMark = req.body      
      return Mark
        .create(newMark)
        .then(task => 
           Mark
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(marks => res.status(200).send({'paginas':(Math.ceil(marks.count/12)),'pagina':1,'total':marks.count,'data': marks.rows }))
            .catch(error => res.status(400).send(error))       
          )
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedMark(req, res) {
    const upMark = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Mark
        .update(upMark, { where: { id: Number(id) }})
        .then(user =>             
               Mark
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(marks => res.status(200).send({'paginas':(Math.ceil(marks.count/12)),'pagina':1,'total':marks.count,'data': marks.rows }))
            .catch(error => res.status(400).send(error))  
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getAMark(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Mark
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userMark => {
          if(!userMark){
            res.status(404).send({'message':`Mark with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userMark})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteMark(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Mark
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Mark
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                   Mark
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(marks => res.status(200).send({'paginas':(Math.ceil(marks.count/12)),'pagina':1,'total':marks.count,'data': marks.rows }))
            .catch(error => res.status(400).send(error))  
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

}

export default MarkController;