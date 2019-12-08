import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactToPrint from 'react-to-print';
import { apiErp } from '../../../helpers'
import Barcode from 'react-barcode'
import Moment from 'react-moment';
import {     
  Table,
  Row,
  Col,
  Button } from "reactstrap";

class ComponentToPrint extends Component {

render() {         
    const { item } = this.props.data
    const { user } = this.props.date    
    const fechaHoy =  new Date() 
    return (      
      <div className="invoice-box table-responsive"> 
        <Row>
          <Col md="4"><p className="text-left">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p></Col>
          <Col md="4"><p className="text-center">Hora : <Moment format="HH:mm:ss">{ fechaHoy }</Moment></p></Col>
          <Col md="4"><p className="text-right">Usuario : { user.name }</p></Col>
        </Row>
        <div className="sol">
          <Row className="crl">
            <Col md={12}>
             <h4 className="text-center"> {item.name}</h4>             
            </Col>            
          </Row>
        </div>

        <Row className="crl mt-2">      
        <Col md={5} >
        <div className="sol">
        <Row>
          <Col>
            <img alt="logo"
            className="text-center" 
            src={apiErp + '/static/images/articulos/md/'+item.filename }/>   
          </Col>
        </Row>
        <Row>
         <Col className="text-center">
            <Barcode 
            value={item.code}
            width={2} 
            height={50}
            fontSize={18}
            />
          </Col> 
        </Row>
        </div> 
        </Col>      
        <Col md={7}>
          <div className="box mt-2">
          <h6 className="title">Datos Generales</h6>
           <Table className="table-reporteh mt-2">
           <tbody>
          <tr>
            <td width="25%"><b>Código :</b></td><td width="75%">{ item.code}</td>                       
          </tr>          
          <tr>
            <td><b>Nombre :</b></td><td>{item.name}</td>
          </tr>
          <tr>
            <td><b>Origen :</b></td><td>{item.origin}</td>
          </tr>
          <tr>
           <td><b>Tipo :</b></td><td>{item.Type.name}</td>
          </tr>
          <tr>
           <td><b>Categoria :</b></td><td>{item.Category.name}</td>
          </tr>
          <tr>
           <td><b>Marca :</b></td><td>{item.Mark.name}</td>
          </tr>                    
          <tr>
            <td><b>Medida :</b></td><td>{item.variant}</td>
          </tr>        
           </tbody>
        </Table>
          </div>
          <div className="box">
          <h6 className="title">Precio BS.</h6>
           <Table className="table-reporteh mt-2">
           <tbody>                        
          <tr>            
            <td><b>Precio Compra:</b></td>
            <td>
            {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.ppucache)}
            </td> 
          </tr>          
          <tr>            
            <td><b>Precio Venta:</b></td>
            <td>
            {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.psale)}
            </td> 
          </tr>
           </tbody>
        </Table>
          </div>
          <div className="box">
          <h6 className="title">Inventario</h6>
          <Table className="table-reporteh mt-2">
           <tbody>              
          <tr>            
            <td><b>Mínimo Stock :</b></td><td>{item.minim}/{item.variant}</td> 
          </tr>
          <tr>            
            <td><b>Punto Reposición :</b></td><td>{item.reposic}/{item.variant}</td> 
          </tr>
          <tr>                        
            <td><b>Stock Actual :</b></td><td>{item.stock}/{item.variant}</td> 
          </tr>          
           </tbody>
        </Table>
          </div>          
        </Col>      
    </Row> 

      <Row className="crl mt-2">      
        <Col md={12} >
        <div className="box">
        <h6 className="title mt-2">Descripción</h6>
          <p>{item.description}</p>
        </div>
        </Col>
     </Row>

      
    </div>
    )
  }
};


class ViewArticulo extends React.Component {  
  render() {    
    return (
      <div>
        <ReactToPrint
          trigger={() => <Button className="fas fa-print btn-sm btn-primary" >Imprimir</Button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint 
        ref={el => (this.componentRef = el)} 
        data = { this.props.articulos }
        date = {this.props.users}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articulos: state.articulos,
  users: state.users

});

export default connect(mapStateToProps)(ViewArticulo);