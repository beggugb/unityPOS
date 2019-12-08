import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { articuloActions } from '../../actions'
import { Link } from 'react-router-dom'
import { Row,Col,Nav,NavItem, Button, Modal } from "reactstrap";
import TableArticulos from './components/TableArticulos'
import FormArticulo from './components/FormArticulo'
import ImagenArticulo from './components/ImagenArticulo'
import ViewArticulo from './components/ViewArticulo'
import SearchArticulos from './components/SearchArticulos'

class articulos extends React.Component {
toggleModal = () => {   
  let est = this.props.articulos.modalRegister === true ? false : true
  this.props.modalRegistro(est)
} 

toggleModalImagen = () => {   
  let est = this.props.articulos.modalImagen === true ? false : true 
  let item = {}
  this.props.articuloImagen(est,item) 
} 

toggleModalView = () => {   
  let est = this.props.articulos.modalView === true ? false : true    
  this.props.articuloViews(est)
}

componentWillUnmount() {  
  this.props.articuloReset()
}
  render() {    
    const { modalRegister, modalImagen, modalView } = this.props.articulos
    return (
      <div className="content">     
        <div className="main-contenido">
        <Row className="crl">
          <Col md={12}>
            <Nav tabs className="bg-navin">                   
              <NavItem>            
                <Link to="/admin/articulos" className="nav-link active"> 
                <i className="fas fa-chevron-down"/>{' '} Articulos </Link>                
              </NavItem>
              <NavItem>            
                <Link to="/admin/categorias" className="nav-link"> 
                <i className="fas fa-chevron-right"/>{' '} Categorias  </Link>                
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
                <i className="fas fa-plus"/>{' '} Nuevo articulo
              </Button>
          </Col>
          <Col md="6">
              <SearchArticulos/>
          </Col>
        </Row>
        <Row>       
          <Col md="12">
            <TableArticulos/>
          </Col>
        </Row>

        <Modal 
              modalClassName="modal-registro"
              isOpen={modalRegister}
              toggle={this.toggleModal} > 
              <div className="modal-content">
               <FormArticulo
               toggle={this.toggleModal} 
               />
              </div>
          </Modal>

        <Modal 
              modalClassName="modal-registro"
              isOpen={modalImagen}
              toggle={this.toggleModalImagen} > 
              <div className="modal-content">
               <ImagenArticulo/>
              </div>
        </Modal>  
        <Modal 
              modalClassName="modal-views"
              isOpen={modalView}
              toggle={this.toggleModalView} >               
               <ViewArticulo/>              
        </Modal>  
        </div>
      </div>  
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...articuloActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  articulos: state.articulos
});

export default connect(mapStateToProps,mapDispatchToProps)(articulos);

