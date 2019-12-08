import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions, ventaActions } from '../../../actions'


import {      
  Row,
  Col,      
  Button,
  ButtonGroup
} from "reactstrap";

class Calculadora extends React.Component {


componentDidMount() {  
  this.props.cajaUser(this.props.users.user.id)
}


resItemDirecta = () => {  
  const { dato } = this.props.ventas
  let sumaTotal = this.props.ventas.sumaTotal;
  let cantidadTotal = this.props.ventas.cantidadTotal;
  let venta = [...this.props.ventas.items] 
  
  if(dato.cantidad > 1){                
    dato.cantidad = dato.cantidad -1;    
    dato.stock = dato.stock +1;
    dato.precioTotal = dato.precioTotal -parseFloat(dato.precioUnitario);
    sumaTotal = sumaTotal - parseFloat(dato.precioUnitario);
    cantidadTotal = cantidadTotal -1;         
  }else if(dato.cantidad === 1)
    {
      let index = venta.indexOf(dato);
      venta.splice(index,1);      
      sumaTotal = sumaTotal - parseFloat(dato.precioUnitario);
      cantidadTotal = cantidadTotal -1;    
    }  
    
     this.props.addItems(venta,sumaTotal,cantidadTotal);
}

sumItemDirecta = () => {  
const { dato } = this.props.ventas
console.log(dato)
if(dato){
  let items = [...this.props.ventas.items]      
  let sumaTotal = this.props.ventas.sumaTotal;
  let cantidadTotal = this.props.ventas.cantidadTotal;
  items.map((ite, index) =>{                              
      if(ite.articuloId === dato.articuloId)
        { 
          if(ite.cantidad < dato.stock){
          items[index].cantidad = items[index].cantidad + 1;           
          items[index].precioTotal = items[index].cantidad *  parseFloat(dato.precioUnitario);
          items[index].stock = items[index].stock -1; 
          sumaTotal = sumaTotal + parseFloat(dato.precioUnitario);  
          cantidadTotal = cantidadTotal + 1;
          }
        }
        return null
      })         
    this.props.addItems(items,sumaTotal,cantidadTotal);
  }  
}

resetDirecta = () => {         
    let it = []
    this.props.addItems(it,0,0);
}

removeItemsDirecta = () => {  
  const { dato } = this.props.ventas 
  if(dato){
    var array = [...this.props.ventas.items];    
    let tt = this.props.ventas.sumaTotal
    let cc = this.props.ventas.cantidadTotal
  
    var index = array.indexOf(dato)
    if (index !== -1) {    
      array.splice(index, 1);
      tt = tt - parseFloat(dato.precioTotal); 
      cc = cc - parseFloat(dato.cantidad);      
      this.props.addItems(array, tt, cc);
    }  
  }
}

toggleModalPagar = () => {   
  let est = this.props.ventas.modalPagar === true ? false : true
  this.props.modalPagar(est)
}



render() {     
  const { item } = this.props.cajas
  return (

    <Row>
      <Col md="12" className="calculadora">                        
       <ButtonGroup className="calcontenedor">
        <Button className="btn-md btn-cal" onClick={() => this.sumItemDirecta()}>
          <i className="fas fa-plus" />
        </Button>
        <Button className="btn-md btn-cal" onClick={() => this.resItemDirecta()}>
          <i className="fas fa-minus" />
        </Button>

        <Button className="btn-md btn-cal" onClick={() => this.removeItemsDirecta()}>
          <i className="fas fa-backspace" />
        </Button>
        <Button 
          className={(item.open && item.id) ? "btn-md btn-cal btn-success": "btn-cal disabled"}
          onClick={ (item.open && item.id) ? () =>this.toggleModalPagar() : null}
          >
          <i className="fas fa-credit-card" />          
        </Button>                      
        <Button className="btn-md btn-cal btn-danger" onClick={() => this.resetDirecta() }>
          <i className="fas fa-trash" />
        </Button>
       </ButtonGroup>   
     
      </Col>
    </Row>       
      
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...ventaActions,
      ...cajaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  users: state.users,
  ventas: state.ventas,
  cajas: state.cajas
});

export default connect(mapStateToProps,mapDispatchToProps)(Calculadora);