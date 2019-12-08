import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ventaActions } from '../../actions'
import ListaArticulos  from '../articulos/components/ListaArticulos'
import ListaCategorias  from '../categorias/components/ListaCategorias'
import ListaVenta from './components/ListaVenta'
import Calculadora from './components/Calculadora'
import FormVenta from './components/FormVenta'

import {      
  Row,
  Col,
  Modal
} from "reactstrap";


class ventas extends React.Component {


componentWillUnmount() {  
  this.props.ventaReset()
}

toggleModalPagar = () => {   
  let est = this.props.ventas.modalPagar === true ? false : true
  this.props.modalPagar(est)
}

 render() {  
 const { modalPagar } = this.props.ventas
    return (
      <div className="content">     
        <div className="main-contenido">
           <Row>
            <Col md="4">             
              <Row>
                <Col md="12">
                  <ListaVenta/>
                </Col>  
              </Row>
              <Row>
                <Col md="12">
                  <Calculadora/>
                </Col>  
              </Row>
            </Col>
            <Col md="8">
              <Row>
                <Col md="12">
                <ListaCategorias/>                
                </Col>
              </Row>
              <Row>
                <Col md="12">
                <ListaArticulos/>
                </Col>
              </Row>
            </Col>
           </Row>  
            <Modal 
              modalClassName="modal-recibo"
              isOpen={modalPagar}
              toggle={this.toggleModalPagar} > 
              <div className="modal-content">
               <FormVenta
              toggle={this.toggleModalPagar}
              />
              </div>
        </Modal>      
        </div>
      </div>  
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
     ...ventaActions,
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  ventas: state.ventas
});

export default connect(mapStateToProps,mapDispatchToProps)(ventas);