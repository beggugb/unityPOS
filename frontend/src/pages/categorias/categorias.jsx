import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { categoriaActions } from '../../actions'
import { Link } from 'react-router-dom'
import { Button,Row,Col,Nav,NavItem,Modal } from "reactstrap";
import TableCategorias from './components/TableCategorias'
import FormCategorias from './components/FormCategorias'
import SearchCategorias from './components/SearchCategorias'

import './css/categorias.css';
class categorias extends React.Component {

 toggleModal = () => {   
  let est = this.props.categorias.modalRegister === true ? false : true
  this.props.modalRegistro(est)
} 

componentWillUnmount() {  
  this.props.categoriaReset()
}

  render() {    
    const { modalRegister } = this.props.categorias
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
                <Link to="/admin/categorias" className="nav-link active"> 
                <i className="fas fa-chevron-down"/>{' '} Categorias  </Link>                
              </NavItem>
              <NavItem>            
                <Link to="/admin/tipos" className="nav-link"> 
                <i className="fas fa-chevron-right"/>{' '} Tipos  </Link>                
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
                <i className="fas fa-plus"/>{' '} Nueva categoria
              </Button>
          </Col>
          <Col md="6">
           <SearchCategorias/>   
          </Col>
        </Row>
        <Row>       
          <Col md="12">
            <TableCategorias/>
          </Col>
        </Row>

        <Modal 
              modalClassName="modal-registro"
              isOpen={modalRegister}
              toggle={this.toggleModal} > 
              <div className="modal-content">
              <FormCategorias
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
      ...categoriaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  user: state.user,
  categorias: state.categorias
});

export default connect(mapStateToProps,mapDispatchToProps)(categorias);
