import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Category } = model;

class CategoryController {  
  static getAllCategorys(req, res) {
    let num = req.params.num
    let der = (num * req.params.page) - num;
    let pagina = Number(req.params.page);    
    return Category
    .findAndCountAll({
      offset: der,
      limit: num,
      order:  [['name', 'ASC'],]      
    })
    .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/num)),'pagina':pagina,'total':categories.count,'data': categories.rows }))
    .catch(error => res.status(400).send(error));
  }

  static getListaCategory(req, res) {    
    let user = req.params.name;   
    let iName = '%'+user+'%'     
    console.log(user)
    if(user === undefined || user === null || user === '')    
    { iName = '%' }
    return Category
    .findAll({
        hierarchy: true,        
        limit: 12,
        order: ['name'],
        where: { name: {[Op.iLike]: iName }}
      })
    .then(categories => res.status(200).send({'data': categories }))
    .catch(error => res.status(400).send(error));
  }	

  static getSearchCategory(req, res) {    
    const { name } = req.body   
    let iName = '%'+name+'%'         
    if(name === undefined || name === null || name === '')    
    { iName = '%' } 
    return Category
    .findAll({
        hierarchy: true,        
        limit: 12,
        order: ['name'],
        where: { name: {[Op.iLike]: iName }}
      })
    .then(categories => res.status(200).send({'data': categories }))
    .catch(error => res.status(400).send(error));
  } 

  static  getItemCategory(req, res) {
     let code = req.params.code;         
     return Category
        .findOne({  
          where: { name: name },                    
        })
        .then(categoryItem => 
           res.status(200).send({'category':categoryItem}))             
        .catch(error => res.status(400).send(error))            
  }

  static addCategory(req, res) {
    if (!req.body.name) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newCategory = req.body      
      return Category
        .create(newCategory)
        .then(task => 
           Category
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'ASC'],]      
            })
          .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/12)),'pagina':1,'total':categories.count,'data': categories.rows }))
            .catch(error => res.status(400).send(error))       
          )
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedCategory(req, res) {
    const upCategory = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Category
        .update(upCategory, { where: { id: Number(id) }})
        .then(user =>             
               Category
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'ASC'],]      
            })
          .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/12)),'pagina':1,'total':categories.count,'data': categories.rows }))
            .catch(error => res.status(400).send(error))  
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getACategory(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Category
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userCategory => {
          if(!userCategory){
            res.status(404).send({'message':`Category with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userCategory})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteCategory(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Category
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Category
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                   Category
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'ASC'],]      
            })
          .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/12)),'pagina':1,'total':categories.count,'data': categories.rows }))
            .catch(error => res.status(400).send(error))  
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

}

export default CategoryController;
