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
      <div className="reporte">
      <div className="invoice-box"> 
        <p className="text-right">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
        <p className="text-right">Usuario : { this.props.dati.user.name }</p>
        <h6 className="text-center"><b>Informe - { item.tipo } </b></h6>        
        <h6 className="text-center"><b>Desde:(<Moment format="DD/MM/YYYY">{item.desde}</Moment>) / Hasta:(<Moment format="DD/MM/YYYY">{item.hasta}</Moment>)</b></h6>
        

        <div className="sol">
        <Table className="table-reporteb text-center">
        <thead>
          <tr>
            <th width="20%">Fecha</th>
            <th width="15%">Tipo</th>
            <th width="25%">Total</th>
            <th width="20%">Cantidad</th>            
            <th width="15%">Estado</th>
            <th width="25%">Cliente</th>
          </tr>          
        </thead>  
        { items &&               
         <tbody>
        { items.map(item=>(
          <tr key={item.id}>                                  
              <td className="text-center"><Moment format="DD/MM/YYYY">{ item.createdAt}</Moment></td>
              <td className="text-center">{ item.type }</td>
              <td className="text-center">                
                {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.total)}
              </td>
              <td className="text-center">                
                { item.cant }
              </td>                       
              <td className="campol">                
                { item.estate }
              </td>                                     
              <td className="campom">{ item.Client.name}</td>

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
    </div>
    )
  }
};


class ReporteVentas extends React.Component {

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

export default connect(mapStateToProps,mapDispatchToProps)(ReporteVentas);
