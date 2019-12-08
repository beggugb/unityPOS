import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clienteActions } from '../../actions'
import { Link } from 'react-router-dom'
import { Button,Row,Col,Nav,NavItem,Modal } from "reactstrap";
import TableClientes from './components/TableClientes'
import FormClientes from './components/FormClientes'
import SearchClientes from './components/SearchClientes'
class clientes extends React.Component {
 toggleModal = () => {   
  let est = this.props.clientes.modalRegister === true ? false : true
  this.props.modalRegistro(est)
} 

componentWillUnmount() {  
  this.props.clienteReset()
}

  render() {    
    const { modalRegister } = this.props.clientes
    return (
      <div className="content">     
        <div className="main-contenido">
        <Row className="crl">
          <Col md={12}>
            <Nav tabs className="bg-navin">                                 
              <NavItem>            
                <Link to="/admin/clientes" className="nav-link active"> 
                <i className="fas fa-chevron-down"/>{' '} Clientes  </Link>                
              </NavItem>              
            </Nav>        
          </Col>      
        </Row>

        <Row className="crl mb-2 mt-2">       
          <Col md="6">
              <Button 
                className="btn-sm btn-success"
                onClick={() =>this.toggleModal()}  >
                <i className="fas fa-plus"/>{' '} Nuevo cliente
              </Button>
          </Col>
          <Col md="6">
              <SearchClientes/>
          </Col>
        </Row>
        <Row>       
          <Col md="12">
            <TableClientes/>
          </Col>
        </Row>

        <Modal 
              modalClassName="modal-registro"
              isOpen={modalRegister}
              toggle={this.toggleModal} > 
              <div className="modal-content">
              <FormClientes
              toggle={this.toggleModal}
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
      ...clienteActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  user: state.user,
  clientes: state.clientes
});

export default connect(mapStateToProps,mapDispatchToProps)(clientes);
