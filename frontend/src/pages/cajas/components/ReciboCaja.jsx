import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions } from '../../../actions'
import ReactToPrint from 'react-to-print';
import Moment from 'react-moment';
import {     
  Table,  
  Button } from "reactstrap";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
     this.state = {      
      
    };    
  }

 

render() {         
    const { cajas, users  } = this.props.dato    
    const fechaHoy =  new Date()     
    return (       
      <div className="invoice-boxcaja"> 
        <p className="text-right">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
        <p className="text-right">Usuario : { users.user.name }</p>
        <h5 className="text-center"><b>Arqueo de Caja</b></h5>
        <h5 className="text-center"><Moment format="DD/MM/YYYY">{ cajas.item.createdAt }</Moment></h5>
        <div className="sol">
        <Table className="table-reporteb">
          <tbody>
          <tr>
            <td width="50%"><b>Nro</b></td>
            <td width="50%">: { cajas.item.id}</td>           
          </tr>
          <tr>  
            <td><b>Usuario</b></td>
            <td>: { cajas.item.User.name }</td> 
          </tr>
          <tr>
            <td><b>Monto Inicial</b></td>
            <td>: {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(cajas.item.montoInicial)}</td>           
          </tr>
          <tr>  
            <td><b>Total Ingresos</b></td>
            <td>: {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format( cajas.item.montoIngreso) }</td> 
          </tr>
          <tr>
            <td><b>Total Egresos</b></td>
            <td>: {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(cajas.item.montoEgreso)}</td>           
          </tr>  
          <tr>
            <td><b>Total Final</b></td>
            <td>: {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(cajas.item.montoFinal)}
            </td> 
          </tr>
           </tbody>
        </Table>
        </div>

        <div className="sol mt-2">
          <Table className="table-reportef">
          <thead>
          <tr>
            <th className="text-center">Comentarios</th>            
          </tr>  
          </thead>  
          <tbody>
            <tr>              
              <td></td>                        
            </tr>
          </tbody>
          </Table>
        </div>

        <div className="sol mt-2">
          <Table className="table-reportef">
          <thead>
          <tr>
            <th className="text-center">Cajero</th>
            <th className="text-center">Auditor</th>                      
          </tr>  
          </thead>  
          <tbody>
            <tr>
              <td></td>
              <td></td>                        
            </tr>
          </tbody>
          </Table>
        </div>
    </div>        
    )
  }
};


class ReciboCaja extends React.Component {  

toggleModalRecibo = () => {   
  let est = this.props.cajas.modalRecibo === true ? false : true  
  this.props.cajaRecibos(est)
}
  render() {    
    return (
      <div >
      <Button className="btn-sm btn-danger"
      onClick={ () => this.toggleModalRecibo()}>
      <i className="fas fa-times"/>
      </Button>
        <ReactToPrint
          trigger={() => <Button className="fas fa-print btn-sm btn-primary pull-right" >Imprimir</Button>}
          content={() => this.componentRef}                 
        />        
        <ComponentToPrint 
        ref={el => (this.componentRef = el)} 
        dato = { this.props }                   
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...cajaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  cajas: state.cajas,
  users: state.users

});

export default connect(mapStateToProps,mapDispatchToProps)(ReciboCaja);
