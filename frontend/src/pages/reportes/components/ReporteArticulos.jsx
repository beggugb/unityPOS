import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reporteActions } from '../../../actions'
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
    const { items, cantidad, item } = this.props.dato   
    console.log(item)
    const fechaHoy =  new Date() 
    return ( 
    <div className="reporte">     
      <div className="invoice-box"> 
        <p className="text-right">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
        <p className="text-right">Usuario : { this.props.dati.user.name }</p>
        <h6 className="text-center"><b>Informe - { item.tipo } </b></h6>
        <h6 className="text-center"><b>({item.stock === true ? 'En Stock ': 'Sin Stock'  })</b></h6>
        <h6 className="text-center"><b>N°Items: ({cantidad})</b></h6>

        <div className="sol">
        <Table className="table-reporteb">
        <thead>
          <tr>
            <th width="15%">Código</th>
            <th width="35%">Nombre</th>
            <th width="10%">$Compra</th>
            <th width="15%">$Venta</th>            
            <th className="text-center" width="15%">$Mínimo</th>
            <th className="text-center" width="15%">Stock</th>
          </tr>          
        </thead>  
        { items &&               
         <tbody>
        { items.map(item=>(
          <tr key={item.id}>                    
              <td>{ item.code }</td>
              <td>{ item.name }</td>              
              <td >{new Intl.NumberFormat().format(item.purchase)}</td>                               
              <td >{new Intl.NumberFormat().format(item.psale)}</td>
              <td className="text-center">{ item.minim}</td>
              <td className="text-center">{ item.stock}</td>
          </tr>                       

         ))
        }          
        </tbody>
        }     
      </Table> 
      </div>
    </div>
    </div>
    )
  }
};


class ReporteArticulos extends React.Component {


  render() {    
    return (
      <div className="creporte">
        <ReactToPrint
          trigger={() => <Button className="fas fa-print btn-sm btn-primary" >Imprimir</Button>}
          content={() => this.componentRef}          
        />
        <ComponentToPrint 
        ref={el => (this.componentRef = el)} 
        dato = { this.props.reportes }
        dati = {this.props.users}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...reporteActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  reportes: state.reportes,
  users: state.users

});

export default connect(mapStateToProps,mapDispatchToProps)(ReporteArticulos);
