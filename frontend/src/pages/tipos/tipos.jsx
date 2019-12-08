import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tipoActions } from '../../actions'
import { Link } from 'react-router-dom'
import { Button,Row,Col,Nav,NavItem,Modal } from "reactstrap";
import TableTipos from './components/TableTipos'
import FormTipos from './components/FormTipos'
class tipos extends React.Component {
 toggleModal = () => {   
  let est = this.props.tipos.modalRegister === true ? false : true
  this.props.modalRegistro(est)
} 

componentWillUnmount() {  
  this.props.tipoReset()
}

  render() {    
    const { modalRegister } = this.props.tipos
    return (
      <div className="content">     
        <div className="main-contenido">
        <Row className="crl">
          <Col md={12}>
            <Nav tabs className="bg-navin">                   
              <NavItem>            
                <Link to="/admin/articulos" className="nav-link"> 
                <i className="fas fa-chevron-right"/>{' '} Articulos </Link>                
              </NavItem>
              <NavItem>            
                <Link to="/admin/categorias" className="nav-link"> 
                <i className="fas fa-chevron-right"/>{' '} Categorias  </Link>                
              </NavItem>
              <NavItem>            
                <Link to="/admin/tipos" className="nav-link active"> 
                <i className="fas fa-chevron-down"/>{' '} Tipos  </Link>                
              </NavItem>
              <NavItem>            
                <Link to="/admin/marcas" className="nav-link"> 
                <i className="fas fa-chevron-right"/>{' '} Marcas  </Link>                
              </NavItem>              
            </Nav>        
          </Col>      
        </Row>

        <Row className="crl mb-2 mt-2">       
          <Col md="6">
              <Button 
                className="btn-sm btn-success"
                onClick={() =>this.toggleModal()}  >
                <i className="fas fa-plus"/>{' '} Nuevo tipo
              </Button>
          </Col>
          <Col md="6">
              
          </Col>
        </Row>
        <Row>       
          <Col md="12">
            <TableTipos/>
          </Col>
        </Row>

        <Modal 
              modalClassName="modal-registro"
              isOpen={modalRegister}
              toggle={this.toggleModal} > 
              <div className="modal-content">
              <FormTipos
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
      ...tipoActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  user: state.user,
  tipos: state.tipos
});

export default connect(mapStateToProps,mapDispatchToProps)(tipos);
