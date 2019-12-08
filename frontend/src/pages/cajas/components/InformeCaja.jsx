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
    const { item ,items } = this.props.cajas  
    const { user } = this.props.auth
    const fechaHoy =  new Date() 
    console.log(item)
    return ( 
   <>

      <div className="invoice-box"> 
        <p className="text-right mt-4">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
        <p className="text-right">Usuario : { user.name }</p>
        <h5 className="text-center"><b>Resumen de Caja</b></h5>
        <h5 className="text-center"><Moment format="DD/MM/YYYY">{ item.createdAt }</Moment></h5>
        <div className="sol">
        <Table className="table-reporteh">
           <tbody>
          
          <tr>
            <td><b>Nro</b></td><td>{ item.id}</td>           
            <td><b>Usuario</b></td><td>{ item.User.name }</td> 
          </tr>
          <tr>
            <td><b>Monto Inicial</b></td><td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>           
            <td><b>Total Ingresos</b></td><td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format( item.montoIngreso) }</td> 
          </tr>
          <tr>
            <td><b>Total Egresos</b></td><td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>           
            <td><b>Total Final</b></td>
            <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}
            </td> 

          </tr>
         
          
           </tbody>
        </Table>
        </div>
        <div className="sol">
        <Table className="table-reporteb">
        <thead>
          <tr>
            <th width="10%">#</th>
            <th width="15%">Hora</th>
            <th width="20%">Tipo</th>
            <th width="40%">Detalle</th>
            <th width="15%">$/Monto</th>                        
          </tr>          
        </thead>  
        { items &&               
         <tbody>
        { items.map(item=>(
          <tr key={item.id}>                    
              <td>{ item.id }</td>
              <td className="text-center"><Moment format="HH:mm:ss">{ item.createdAt }</Moment></td>
              <td>{ item.tipo }</td>
              <td >{ item.label }</td>                
              <td className="text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>
          </tr>                       

         ))
        }          
        </tbody>
        }     
      </Table> 
      </div>  
    </div>
    </>
    )
  }
};


class InformeCaja extends React.Component {
  
toggleModalInforme = () => {   
  let est = this.props.cajas.modalInforme === true ? false : true  
  this.props.cajaInformes(est)
}
  render() {    
    return (
      <div>
       <Button className="btn-sm btn-danger"
      onClick={ () => this.toggleModalInforme()}>
      <i className="fas fa-times"/>
      </Button>
        <ReactToPrint
          trigger={() => <Button className="fas fa-print btn-sm btn-primary pull-right" >Imprimir</Button>}
          content={() => this.componentRef}           

        />
        <ComponentToPrint 
        ref={el => (this.componentRef = el)} 
        cajas = { this.props.cajas }        
        auth =  { this.props.users}
        
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

export default connect(mapStateToProps,mapDispatchToProps)(InformeCaja);