import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Article, Sale, SaleItems, Caja, CajaItems, Category, Client, User } = model;

const listaCajas = (desde, hasta) => (
  Caja
    .findAndCountAll({
      offset: 0,           
      order:  [['createdAt', 'DESC'],],   
      attributes: ['id','createdAt', 'montoInicial','montoIngreso','montoEgreso','montoFinal'],    
      where :  {
            [Op.and]: [                            
              { open: false },              
              { createdAt: {[Op.between]: [desde, hasta]}}
              ]
            },         
      include: [       
      { model: User, attributes: ['id','username']}]})
    .then(cajas => ({'cantidad':cajas.count,'data': cajas.rows }))
     

 ) 

const totalCajas = (desde, hasta) => (
  Caja
    .findAll({         
      attributes: [[Sequelize.fn('sum', Sequelize.col('montoFinal')), 'total']],            
      where :  {
            [Op.and]: [                            
              { open: false },              
              { createdAt: {[Op.between]: [desde, hasta]}}
              ]
            }
      })
    .then(totales => (totales))
 ) 



class ReportController { 

  static cajas (req, res){
    const {desde, hasta} = req.body    
    Promise.all([ listaCajas(desde, hasta)])
      .then(([cajas]) => {                     
        Promise.all([ totalCajas(desde, hasta)])          
          .then(([totales]) => {                             
              res.status(200).json({ cajas, totales })     
            })                      
        })    
      .catch(err => console.log(err));  
   } 

  static articulos (req, res){
    const { stock, categoriaId } = req.body     
          
    let istock = 0;
    let fstock = 0;
    
    if(stock === true)
    { istock = 1; fstock = 5000; }

    return Article
    .findAndCountAll({
      offset: 0,           
      order:  [['name', 'ASC'],],   
      attributes: ['id','code','name','purchase','psale','stock','minim'],      
      where :  {
            [Op.and]: [              
              { stock: {[Op.between]: [istock, fstock]}}
            ]
          },
      include: [       
      { model: Category, attributes: ['id','name']}]})
    .then(articulos => res.status(200).send({'cantidad':articulos.count,'data': articulos.rows }))
    .catch(error => res.status(400).send(error));}


    static ventas (req, res){
    const { desde, hasta} = req.body           
    console.log(desde)
    console.log(hasta)
    return Sale
    .findAndCountAll({
      offset: 0,           
      order:  [['createdAt', 'DESC'],],   
      attributes: ['id','createdAt', 'type','total','cant','orden','estate'],      
       where :  { createdAt: {[Op.between]: [desde, hasta]}},
      include: [       
      { model: Client, attributes: ['id','name']}]})
    .then(ventas => res.status(200).send({'cantidad':ventas.count,'data': ventas.rows }))
    .catch(error => res.status(400).send(error));}
  

}

export default ReportController;