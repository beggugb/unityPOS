import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Sale, SaleItems, Article, Recipient, Client, Mesa } = model;

const regSale = (newSale) =>(  
  Sale
   .create(newSale)
   .then((saleNew) => saleNew)
);

const regItems = (items, sale) => (
  Promise.all(    
    items.map(( item, index ) => {
      const cantidad = item.cantidad;
      const precioUnitario = item.precioUnitario;
      const precioTotal = item.precioTotal;
      const saleId = sale;
      const articleId = item.articleId;
      SaleItems
        .create({ cantidad, precioUnitario, precioTotal, saleId, articleId })
      }
    )
  )
  .then((saleitems) => ({    
    saleitems: "OK"
  })  
)); 

const updateInventory = (items) => (
  Promise.all(
    items.map(( item, index ) => {
      const stock = item.stock;      
      const articleId = item.articleId;
      Article
        .update({ 
          stock: stock
        },
        { where :{ id : articleId }})
      }
    )
  )
  .then((inventory) => ({    
    inventory: "OK"
  })  
));

const getClient = (id) => {
  return Client   
    .findOne({ where: { id: id }})
    .then(itemClient => (
      itemClient
    ))      
 };

 const upMesa = (id,state) => {
  return Mesa
    .update({ state: 'pendiente', deudor: state }, { where :{ id : id }})
    .then(itemMesa => 
     Mesa             
      .findAll({ hierarchy: true, order:  [['id', 'DESC'],]})
      .then((mesas)=> (mesas))  
      )
          
 };




 const createRecipient = (client, total, sale ) => {    
  const { id, name, nit } = client;          
  const disabled = false;
  const razonSocial = name;  
  const label = 'Venta de productos al contado';
  const importe = total;
  const concept = 'VENTA TPDV';    
  const saleId = sale;
  const clientId = id;
  return Recipient
  .create({ disabled,razonSocial,importe,concept,nit,label,saleId,clientId })
  .then((itemRecipient) => (
    itemRecipient
  ))
};

 const  updateSale = ({id,clientId}) => {
  return Sale
    .update({ state: 'aprobado', clienteId: clienteId }, { where :{ id : id }})
    .then(itemSale => 
     Sale             
      .findOne({ where :{ id : id } })
      .then((newSale)=> (newSale))  
      )
          
 };


class SaleController { 

   static aprSale(req, res) {

    const {item, client} = req.body    
    const sitem = item;
    sitem.clientId = client.id ? client.id : 1;

    Promise.all([updateSale(sitem)])
    .then(([newSale]) => {                             
          Promise.all([ getClient(newSale.clientId)]) // get cliente
            .then(([itemClient]) => {       
              Promise.all([ createRecipient(itemClient,newSale.total,newSale.id)]) // crate factura
                .then(([itemRecipient]) => { 
                   Promise.all([upMesa(newSale.mesaId,false)]) // registrar items   
                    .then(([mesas]) => {   
                      res.status(200).json({ data: { mesas, newSale, itemClient, itemRecipient }})
            })
           })         
          })        
    })       
  }

  static addSale(req, res) {

    const {item, items} = req.body    
    const sitem = item;
    sitem.clientId = item.clientId ? item.clientId : 1;

    Promise.all([regSale(sitem)])
    .then(([saleNew]) => {                     
        Promise.all([regItems(items, saleNew.id)]) // registrar items   
          .then(([saleItems]) => {
            Promise.all([updateInventory(items)]) // registrar items   
              .then(([inventory]) => {
                Promise.all([ getClient(saleNew.clientId)]) // get cliente
                  .then(([itemClient]) => {       
                    Promise.all([ createRecipient(itemClient,saleNew.total,saleNew.id)]) // crate factura
                      .then(([itemRecipient]) => {   
                          res.status(200).json({ data: { saleNew }})
            })
          })
        })       
      })
    })       
  }

   static addSalem(req, res) {
    const {item, items} = req.body    
    const sitem = item;    
    Promise.all([regSale(sitem)])
    .then(([saleNew]) => {                     
        Promise.all([regItems(items, saleNew.id)]) // registrar items   
          .then(([saleItems]) => {     
              Promise.all([upMesa(saleNew.mesaId,true)]) // registrar items   
                .then(([mesas]) => {            
                  res.status(200).json({ data: { saleNew, saleItems, mesas }})
            })
          })            
    })    
  }

 

  static getAllSales(req, res) {
    let num = req.params.num
    let der = (num * req.params.page) - num;
    let pagina = Number(req.params.page);    
    return Sale
    .findAndCountAll({
      offset: der,
      limit: num,
      order:  [['createdAt', 'DESC'],]      
    })
    .then(sales => res.status(200).send({'paginas':(Math.ceil(sales.count/num)),'pagina':pagina,'total':sales.count,'data': sales.rows }))
    .catch(error => res.status(400).send(error));
  }  

   static getListaSale(req, res) {    
    let user = req.params.name;   
    let iName = '%'+user+'%'     
    console.log(user)
    if(user === undefined || user === null || user === '')    
    { iName = '%' }
    return Sale
    .findAll({
        hierarchy: true,        
        limit: 12,
        order: ['name'],
        where: { name: {[Op.iLike]: iName }},
        attributes:['id','name','code'],
      })
    .then(sales => res.status(200).send({'data': sales }))
    .catch(error => res.status(400).send(error));
  } 

  
  
  static updatedSale(req, res) {
    const upSale = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Sale
        .update(upSale, { where: { id: Number(id) }})
        .then(user =>             
               Sale
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(sales => res.status(200).send({'paginas':(Math.ceil(sales.count/12)),'pagina':1,'total':sales.count,'data': sales.rows }))
            .catch(error => res.status(400).send(error))  
          )  
        .catch(error => res.status(400).send(error))    
      }
    }    
  
  static  getSaleMesa(req, res) {   
  console.log(req.params.id)     
    return Sale
        .findOne({ where: { id: Number(req.params.id) }})
        .then(sale =>             
               SaleItems
              .findAll({
                order:  [['id', 'DESC'],],      
                where: { saleId: Number(req.params.id) }
              })
            .then(sales => 
               Mesa             
                .findAll({ hierarchy: true, order:  [['id', 'DESC'],]})
                .then(mesas => res.status(200).send({'item':sale,'items':sales,'mesas':mesas }))
                .catch(error => res.status(400).send(error))  
            ))  
        .catch(error => res.status(400).send(error))   

  }  

  static  getASale(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Sale
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userSale => {
          if(!userSale){
            res.status(404).send({'message':`Sale with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userSale})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteSale(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Sale
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Sale
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                   Sale
            .findAndCountAll({
              offset: 0,
              limit: 12,
              order:  [['name', 'DESC'],]      
            })
          .then(sales => res.status(200).send({'paginas':(Math.ceil(sales.count/12)),'pagina':1,'total':sales.count,'data': sales.rows }))
            .catch(error => res.status(400).send(error))  
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

}

export default SaleController;