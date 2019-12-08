import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions } from '../../actions'
import { Link } from 'react-router-dom'
import { Button,Row,Col,Nav,NavItem,Modal } from "reactstrap";
import TableCajas from './components/TableCajas'
import FormCajas from './components/FormCajas'
import FormItem from './components/FormItem'

import InformeCaja from './components/InformeCaja'
import ReciboCaja from './components/ReciboCaja'
import SearchCajas from './components/SearchCajas'

class cajas extends React.Component {
 toggleModal = () => {   
  let est = this.props.cajas.modalRegister === true ? false : true
  this.props.modalRegistro(est)
} 

toggleModalItem = () => {   
  let est = this.props.cajas.modalItem === true ? false : true  
  this.props.cajaItems(est)
} 

toggleModalRecibo = () => {   
  let est = this.props.cajas.modalRecibo === true ? false : true  
  this.props.cajaRecibos(est)
} 

toggleModalInforme = () => {   
  let est = this.props.cajas.modalInforme === true ? false : true  
  this.props.cajaInformes(est)
} 

componentWillUnmount() {  
  this.props.cajaReset()
}

  render() {    
    const { modalRegister, modalItem, modalInforme, modalRecibo } = this.props.cajas
    return (
      <div className="content">     
        <div className="main-contenido">
        <Row className="crl">
          <Col md={12}>
            <Nav tabs className="bg-navin">                                 
              <NavItem>            
                <Link to="/admin/cajas" className="nav-link active"> 
                <i className="fas fa-chevron-down"/>{' '} Cajas  </Link>                
              </NavItem>              
            </Nav>        
          </Col>      
        </Row>

        <Row className="crl mb-2 mt-2">       
          <Col md="6">
              <Button 
                className="btn-sm btn-success"
                onClick={() =>this.toggleModal()}  >
                <i className="fas fa-plus"/>{' '} Nueva caja
              </Button>
          </Col> 
           <Col md="6">
              <SearchCajas/>
          </Col>         
        </Row>
        <Row>       
          <Col md="12">
            <TableCajas/>
          </Col>
        </Row>

        <Modal 
              modalClassName="modal-registro"
              isOpen={modalRegister}
              toggle={this.toggleModal} > 
              <div className="modal-content">
              <FormCajas
              toggle={this.toggleModal}
              />   
              </div>
        </Modal>
        <Modal 
              modalClassName="modal-registro"
              isOpen={modalItem}
              toggle={this.toggleModalItem} > 
              <div className="modal-content">
               <FormItem
              toggle={this.toggleModalItem}
              /> 
              </div>
        </Modal>

        <Modal 
              modalClassName="modal-views"
              isOpen={modalInforme}
              toggle={this.toggleModalInformes} >    
              <InformeCaja
              toggle={this.toggleModalInformes}
              />                          
        </Modal>

        <Modal 
              modalClassName="modal-caja"
              isOpen={modalRecibo}
              toggle={this.toggleModalRecibos}    
              >
              <ReciboCaja
              
              />                              
        </Modal> 
        </div>
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
  user: state.user,
  cajas: state.cajas
});

export default connect(mapStateToProps,mapDispatchToProps)(cajas);
