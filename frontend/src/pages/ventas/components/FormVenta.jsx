import React,{Component} from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions,articuloActions,ventaActions } from '../../../actions'
import SelectCliente from '../../clientes/components/SelectCliente'
import ReactToPrint from 'react-to-print'
import Moment from 'react-moment'
import {      
  Row,
  Col,
  Label,  
  FormGroup,  
  Input,
  Button,
  ButtonGroup  ,Table
} from "reactstrap";

class ComponentToPrint extends Component {  
render() {      
  const { items, sumaTotal  } = this.props.datosv
  const { item } = this.props.datosc
  const fechaHoy = new Date()
    return ( 
    <div className="factura">       
      <Table className="table-facturas">
        <tbody>           
          <tr><td colSpan="2" className="text-center"><b>Demo</b></td></tr>
          <tr><td colSpan="2" className="text-center">Av. Demo</td></tr>
          <tr><td colSpan="2" className="text-center">Teléfono: 7052417</td></tr>
          <tr><td colSpan="2" className="text-center">Nit: 52414</td></tr>
          <tr><td colSpan="2" className="text-center">Autorización: xsaxsa-xasxasxsa </td></tr>
          <tr><td width="60%">Razon social:</td><td>{ item.name }</td></tr>
          <tr><td width="60%">Nit:</td><td>{ item.nit }</td></tr>
        </tbody>
      </Table>
      <Table className="table-facturas ">   
      <thead>
        <tr>          
          <th> Artículo </th>
          <th className="text-center"> Cant.</th>
          <th className="text-right">Sub-Total </th>
        </tr>  
      </thead>    

        { items &&        
        <tbody>
        { items.map(item=>(
          <tr key={item.articleId} >          
            <td className="iname">  
              <b>{item.name}</b>
            </td>
            <td className="text-center">  
              <b>{item.cantidad}</b>
            </td>
            <td className="text-right">                
              {new Intl.NumberFormat().format(item.precioTotal)} 
            </td>  
                                    
          </tr>    
          ))}       
        </tbody>
        }  
        </Table>         
        <Table className="mt-2 table-facturas">        
        <tbody>                
          <tr className="iocr">
          <td width="80%" className="text-right ioc">Total</td>
          <td width="20%" className="text-right ioc">{new Intl.NumberFormat().format(sumaTotal)}</td></tr>
        </tbody>              
        </Table>
        <p><Moment format="DD/MM/YY HH:ss">{fechaHoy}</Moment></p>
        </div>
    ) 
  }
}


class FormVenta extends React.Component {  
constructor(props){
    super(props);
    this.state = {          
    };    
     this.handleSubmit = this.handleSubmit.bind(this);
} 


handleSubmit(event){         
  let sale = this.props.ventas.item
  sale.clientId = this.props.clientes.item.id
  sale.userId = this.props.users.user.id
  sale.state = 'aprobado'
  sale.type = 'contado'
  sale.cant = this.props.ventas.cantidadTotal
  sale.total = this.props.ventas.sumaTotal

  let dat ={
    item: sale,
    items: this.props.ventas.items
  }

  this.props.ventaCreate(dat)

  let dato ={
      cajaId : this.props.cajas.item.id,
      label : 'ingreso por TPDV',
      tipo : 'ingreso',
      monto : this.props.ventas.sumaTotal,
      est : true
  } 
  
  this.props.cajaItemCreate(dato);                              
}

handleChange =  prop => event =>{  
  
  let camb = event.target.value - this.props.ventas.sumaTotal 
  this.setState({
    cambio : camb
  })
  
}

componentWillUnmount() {  
  this.props.articuloData(1,20)
}


render() {   
const { entregado ,cambio } = this.state
  return (
  <div className="linea">
  <Row>      
    <Col md="5" className="form-registro">                                
              <SelectCliente/>
              <FormGroup>
                <Label for="entregado">Entregado</Label>
                <Input
                    id="entregado"
                    name="entregado"
                    type="text"                  
                    value={entregado}                                                   
                    onChange={this.handleChange('entregado')}
                    required
                  />   
              </FormGroup>            
              <FormGroup>
                <Label for="label">Cambio</Label>
                <Input
                    id="cambio"
                    name="cambio"
                    type="text"                  
                    value={cambio}                                                   
                    onChange={this.handleChange('cambio')}                                        
                  />   
              </FormGroup>                        
          <FormGroup>
              <ButtonGroup>
               <ReactToPrint
                  trigger={() => <Button className="fas fa-dollar-sign btn-md btn-success">Pagar</Button>}
                  content={() => this.componentRef}    
                  onAfterPrint={() => this.handleSubmit()}             
                />             
              </ButtonGroup>
            </FormGroup>
    </Col>
    <Col md="7" className="factura">          
          <ComponentToPrint 
            ref={el => (this.componentRef = el)} 
            datosv = { this.props.ventas }
            datosc = { this.props.clientes }
            />
        </Col>
    </Row>
  </div>  
  );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...ventaActions,
      ...articuloActions,
      ...cajaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  cajas: state.cajas,  
  users: state.users,
  ventas: state.ventas,
  clientes: state.clientes
});

export default connect(mapStateToProps,mapDispatchToProps)(FormVenta);