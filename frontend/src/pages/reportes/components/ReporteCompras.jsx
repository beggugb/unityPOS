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
    const { items, item } = this.props.dato       
    const fechaHoy =  new Date() 
    return (      
      <div className="invoice-box table-responsive"> 
        <p className="text-right">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
        <p className="text-right">Usuario : { this.props.dati.user.name }</p>
        <h5 className="text-center"><b>Informe - { item.tipo } </b></h5>
        <h6 className="text-center"><b>Desde:({item.desde}) / Hasta:({item.hasta})</b></h6>
        

        <div className="sol">
        <Table className="table-reporteb">
        <thead>
          <tr>
            <th width="10%">Fecha</th>
            <th width="15%">Total</th>
            <th width="5%">Cantidad</th>
            <th width="35%">Motivo</th>            
            <th width="10%">Estado</th>
            <th width="15%">Cliente</th>
          </tr>          
        </thead>  
        { items &&               
         <tbody>
        { items.map(item=>(
          <tr key={item.id}>                                  
              <td className="text-center">{ item.createdAt}</td>
              <td className="text-center">                
                {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.total)}
              </td>
              <td className="text-center">                
                { item.cantidad }
              </td>                       
              <td className="campol">                
                { item.motivo }
              </td>                       
              <td className="text-center">
              {
                item.est
              }              
              </td>
              <td className="campom">{ item.Proveedor.nombre}</td>

          </tr>                     

         ))
        }   
        <tr>        
          <td colSpan="4"></td>        
          <td className="text-center">
            
          </td>
        </tr>       
        </tbody>
        }     
      </Table> 
      </div>
    </div>
    )
  }
};


class ReporteCajas extends React.Component {

  render() {    
    return (
      <div>
        <ReactToPrint
          trigger={() => <Button className="fas fa-print btn-sm btn-primary" >Imprimir</Button>}
          content={() => this.componentRef}          
        />
        <ComponentToPrint 
        ref={el => (this.componentRef = el)} 
        dato = { this.props.reporte }
        dati = {this.props.auth}
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
  reporte: state.reporte,
  auth: state.auth

});

export default connect(mapStateToProps,mapDispatchToProps)(ReporteCajas);
