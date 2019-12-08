import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../../actions'
import { Link } from 'react-router-dom'
import { Button,Row,Col,Nav,NavItem,Modal } from "reactstrap";
import TableUsers from './components/TableUsers'
import FormUsers from './components/FormUsers'
class users extends React.Component {
 toggleModal = () => {   
  let est = this.props.users.modalRegister === true ? false : true
  this.props.modalRegistro(est)
} 

componentWillUnmount() {  
  this.props.userReset()
}

  render() {    
    const { modalRegister } = this.props.users
    return (
      <div className="content">     
        <div className="main-contenido">
        <Row className="crl">
          <Col md={12}>
            <Nav tabs className="bg-navin">                                 
              <NavItem>            
                <Link to="/admin/configuracion" className="nav-link active"> 
                <i className="fas fa-chevron-down"/>{' '} Users  </Link>                
              </NavItem>              
            </Nav>        
          </Col>      
        </Row>

        <Row className="crl mb-2 mt-2">       
          <Col md="6">
              <Button 
                className="btn-sm btn-success"
                onClick={() =>this.toggleModal()}  >
                <i className="fas fa-plus"/>{' '} Nuevo usuario
              </Button>
          </Col>
          <Col md="6">
              
          </Col>
        </Row>
        <Row>       
          <Col md="12">
            <TableUsers/>
          </Col>
        </Row>

        <Modal 
              modalClassName="modal-registro"
              isOpen={modalRegister}
              toggle={this.toggleModal} > 
              <div className="modal-content">
              <FormUsers
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
      ...userActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  user: state.user,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(users);
