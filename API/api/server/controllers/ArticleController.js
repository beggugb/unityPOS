import model from '../src/models'
import path from 'path'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Article, Category, Mark, Type } = model;
var multer = require('multer');


var uuidv4 = require('uuid/v4');
var sharp = require('sharp');

var storage = multer.diskStorage({   
    destination: function (req, file, cb) {                  
      cb(null,'api/public/images/trash')      
    },
    filename: function (req, file, cb) {  

      cb(null, Date.now() + '-' +file.originalname ) 
    }
  })

var upload = multer({ storage: storage }).single('file')

class ArticleController {  

   static uploadArticle(req, res) {      
    upload(req, res, function (err) {           
        if (err instanceof multer.MulterError) {                                     
            return res.status(500).json(err)
        } else if (err) {             
            return res.status(500).json(err)
        }        
        sharp(req.file.path).resize({ height: 500 }).toFile('./api/public/images/articulos/lg/'+ req.file.filename);
        sharp(req.file.path).resize({ height: 250 }).toFile('./api/public/images/articulos/md/'+ req.file.filename);
        sharp(req.file.path).resize({ height: 120 }).toFile('./api/public/images/articulos/sm/'+ req.file.filename);        
        return res.status(200).send(req.file)
      })    
  }


  static getAllArticles(req, res) {
    let num = req.params.num
    let der = (num * req.params.page) - num;
    let pagina = Number(req.params.page);    
    return Article
    .findAndCountAll({
      offset: der,
      limit: num,
      order:  [['name', 'DESC'],],
      attributes:['id','code','name','variant','filename','psale','stock','ofert'],
      include: [{ model: Category, attributes: ['name']}]      
    })
    .then(articles => res.status(200).send({'paginas':(Math.ceil(articles.count/num)),'pagina':pagina,'total':articles.count,'data': articles.rows }))
    .catch(error => res.status(400).send(error));
  }  

  static getSearchArticle(req, res) {    
    const { name } = req.body   
    let iName = '%'+name+'%'         
    if(name === undefined || name === null || name === '')    
    { iName = '%' } 
    return Article
    .findAndCountAll({
        hierarchy: true,        
        offset: 0,
        limit: 12,        
        order:  [['name', 'DESC'],],        
        attributes:['id','code','name','variant','filename','psale','stock','ofert'],
        where: { name: {[Op.iLike]: iName }}
      })
    .then(articles => res.status(200).send({'paginas':(Math.ceil(articles.count/12)),'pagina':1,'total':articles.count,'data': articles.rows }))
    .catch(error => res.status(400).send(error));
  } 

  static getSearchCategory(req, res) {    
    let iCat = req.params.id
    let fCat = req.params.id  
    if(req.params.id === 0 || req.params.id === null || req.params.id === '0')    
    { iCat = 0 ; fCat = 50 } 

    return Article
    .findAndCountAll({
        hierarchy: true,        
        limit: 12,        
        order:  [['name', 'DESC'],],        
        attributes:['id','code','name','variant','filename','psale','stock','ofert'],
        where : { categoryId: {[Op.between]: [iCat, fCat]}}
                
      })
    .then(articles => res.status(200).send({'paginas':(Math.ceil(articles.count/12)),'pagina':1,'total':articles.count,'data': articles.rows }))
    .catch(error => res.status(400).send(error));
  } 

  static addArticle(req, res) {
    if (!req.body.name) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newArticle = req.body
      console.log(req.body)      
      return Article
          .create(newArticle)
        .then(task => 
           Article
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],],              
              attributes:['id','code','name','variant','filename','psale','stock','ofert'],
            })
          .then(articles => res.status(200).send({'paginas':(Math.ceil(articles.count/12)),'pagina':1,'total':articles.count,'data': articles.rows }))
            .catch(error => res.status(400).send(error))       
          )
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedArticle(req, res) {
    const upArticle = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Article
        .update(upArticle, { where: { id: Number(id) }})
        .then(user =>             
               Article
            .findAndCountAll({
              offset: 0,
              limit: 12,              
              order:  [['name', 'DESC'],],              
              attributes:['id','code','name','variant','filename','psale','stock','ofert'],
            })
          .then(articles => res.status(200).send({'paginas':(Math.ceil(articles.count/12)),'pagina':1,'total':articles.count,'data': articles.rows }))
            .catch(error => res.status(400).send(error))  
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getAArticle(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Article
        .findOne({  where: { id: id }, 
          order:  [['name', 'DESC'],],          
          include: [
            { model: Category, attributes: ['id','name','code']},
            { model: Mark, attributes: ['id','name','code']},
            { model: Type, attributes: ['id','name','code']}
            ]
        })
        .then(userArticle => {
          if(!userArticle){
            res.status(404).send({'message':`Article with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'article':userArticle})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteArticle(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Article
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Article
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                   Article
            .findAndCountAll({
              offset: 0,
              limit: 12,              
              order:  [['name', 'DESC'],],              
              attributes:['id','code','name','variant','filename','psale','stock','ofert'],   
            })
          .then(articles => res.status(200).send({'paginas':(Math.ceil(articles.count/12)),'pagina':1,'total':articles.count,'data': articles.rows }))
            .catch(error => res.status(400).send(error))  
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  


}

export default ArticleController;