import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Caja, CajaItem, User } = model;

const regItem = (newItem) => (    
  CajaItem
  .create(newItem)
  .then((item) => item)
  );


const actCaja = (upCaja,id) => (    
  Caja
  .update(upCaja, { where: { id: Number(id) }})
    .then((cajaUp) => (cajaUp))
   ); 

const actItem = (id) => (    
  CajaItem
  .update({ est: false }, { where: { id: Number(id) }})
    .then((itemUp) => (itemUp))
   ); 

const getCaja = (id) => (    
  Caja
  .findOne({ 
    raw: true,
    where: { id: Number(id)}
    })
    .then((cajaI) => 
      cajaI
      )
   ); 
    
const cajasAll = (id) => (    
  Caja
    .findOne({ hierarchy: true, where: { id: id } })         
      .then(tas =>
        CajaItem             
          .findAll({ hierarchy: true, where: { cajaId: id },order:  [['id', 'DESC'],]})
          .then((cajas)=> ({'item':tas,'items':cajas })))
);      


class CajaController {  
  
  static insertItemCaja(req, res) {
  const cajaItem = req.body
  cajaItem.cajaId = req.params.id  
  Promise.all([regItem(cajaItem)])  
    .then((item) => {      
      Promise.all([getCaja(req.params.id)])
        .then(([cajaI]) => {            
          let caj = cajaI
            if(cajaItem.tipo === 'ingreso')
            {               
               caj.montoIngreso =  parseFloat(cajaI.montoIngreso) + parseFloat(cajaItem.monto)
               caj.montoFinal   =  (parseFloat(caj.montoIngreso) + parseFloat(cajaI.montoInicial)) - parseFloat(cajaI.montoEgreso)               
               caj.num = caj.num + 1;
            }else{
              caj.montoEgreso  =  parseFloat(cajaI.montoEgreso) + parseFloat(cajaItem.monto)
              caj.montoFinal   =  (parseFloat(cajaI.montoIngreso) + parseFloat(cajaI.montoInicial)) - parseFloat(caj.montoEgreso)
              caj.num = caj.num + 1;
            }                              
        Promise.all([actCaja(caj,req.params.id)])
          .then((cajaUp) => {            
            Promise.all([ cajasAll(req.params.id)])
              .then((cajas) => {                            
              res.status(200).json({'cajas' :cajas})     
          })
      })
    })
  })  
  .catch(err => console.log(err));    
  }

  static deleteItemCaja(req, res) {
  const {id, monto, tipo} = req.body  
  Promise.all([actItem(id)])  
    .then((item) => {      
      Promise.all([getCaja(req.params.id)])
        .then(([cajaI]) => {            
          let caj = cajaI
            if(tipo === 'ingreso')
            {               
               caj.montoIngreso =  parseFloat(cajaI.montoIngreso) - parseFloat(monto)
               caj.montoFinal   =  (parseFloat(caj.montoIngreso) + parseFloat(cajaI.montoInicial)) - parseFloat(cajaI.montoEgreso)                              
            }else{
              caj.montoEgreso  =  parseFloat(cajaI.montoEgreso) + parseFloat(monto)
              caj.montoFinal   =  (parseFloat(cajaI.montoIngreso) + parseFloat(cajaI.montoInicial)) - parseFloat(caj.montoEgreso)                             
            }                              
        Promise.all([actCaja(caj,req.params.id)])
          .then((cajaUp) => {            
            Promise.all([ cajasAll(req.params.id)])
              .then((cajas) => {                            
              res.status(200).json({ 'cajas': cajas })     
          })
      })
    })
  })  
  .catch(err => console.log(err));    
  }

  static getAllCajas(req, res) {
    let num = req.params.num
    let der = (num * req.params.page) - num;
    let pagina = Number(req.params.page);    
    return Caja
    .findAndCountAll({
      offset: der,
      limit: num,
      order:  [['id', 'DESC'],],
      include: [{ model: User, attributes: ['id','name']}]        
    })
    .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/num)),'pagina':pagina,'total':categories.count,'data': categories.rows }))
    .catch(error => res.status(400).send(error));
  }

  static getListaCaja(req, res) {    
    let user = req.params.name;   
    let iName = '%'+user+'%'     
    console.log(user)
    if(user === undefined || user === null || user === '')    
    { iName = '%' }
    return Caja
    .findAll({
        hierarchy: true,        
        limit: 12,
        order: ['name'],
        where: { name: {[Op.iLike]: iName }},
        attributes:['id','name','code'],
      })
    .then(categories => res.status(200).send({'data': categories }))
    .catch(error => res.status(400).send(error));
  }	

  static addCaja(req, res) {    
    if (!req.body.montoInicial) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newCaja = req.body    
      newCaja.montoInicial = parseFloat(newCaja.montoInicial)        
      console.log(newCaja)
      return Caja
        .create(newCaja)
        .then(task => 
           Caja
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['id', 'DESC'],],
              include: [{ model: User, attributes: ['id','name']}]        
            })
          .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/12)),'pagina':1,'total':categories.count,'data': categories.rows }))
            .catch(error => res.status(400).send(error))       
          )
        .catch(error => res.status(400).send(error));
    }
  }

  
  
  static updatedCaja(req, res) {
    const upCaja = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Caja
        .update(upCaja, { where: { id: Number(id) }})
        .then(user =>             
               Caja
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['id', 'DESC'],]      
            })
          .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/12)),'pagina':1,'total':categories.count,'data': categories.rows }))
            .catch(error => res.status(400).send(error))  
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getACaja(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Caja
        .findOne({ 
          where: { id: id },
          include: [{ model: User, attributes: ['id','name']}]  
        })         
        .then(tas =>
            CajaItem             
            .findAll({ where: { cajaId: id },order:  [['id', 'DESC'],]})
          .then(items => res.status(200).send({'item':tas,'items':items }))  
          )
        .catch(error => res.status(400).send(error))    
      }  
  }

   static  getSingleCaja(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Caja
        .findOne({ 
          where: { id: id },
          include: [{ model: User, attributes: ['id','name']}]  
        })         
        .then(tas => res.status(200).send({'item':tas }))
        .catch(error => res.status(400).send(error))    
      }  
  }

    static  getUserCaja(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
      var d = new Date();
   var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
        return Caja
        .findOne({ 
          where : [{ createdAt: {[Op.eq]: formatted }},
                 { open: {[Op.eq]: true }}, 
                { userId: {[Op.eq]: req.params.id }}]  
        })         
        .then(tas => res.status(200).send({'item':tas }))
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteCaja(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Caja
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Caja
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                   Caja
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['id', 'DESC'],]      
            })
          .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/12)),'pagina':1,'total':categories.count,'data': categories.rows }))
            .catch(error => res.status(400).send(error))  
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

  static getSearchCaja(req, res) {    
    const { createdAt } = req.body        
    let ifecha = '2019-01-01';     
    let ffecha = new Date();   

     if(createdAt !== '')
     { ifecha = createdAt; ffecha = createdAt;  } 
    return Caja
    .findAndCountAll({
        hierarchy: true,        
        offset: 0,
        limit: 12,        
        order:  [['id', 'DESC'],],                        
        where : { createdAt: {[Op.between]: [ifecha, ffecha]}},
        include: [{ model: User, attributes: ['id','name']}]
      })
    .then(categories => res.status(200).send({'paginas':(Math.ceil(categories.count/12)),'pagina':1,'total':categories.count,'data': categories.rows }))
    .catch(error => res.status(400).send(error));
  }

}

export default CajaController;
