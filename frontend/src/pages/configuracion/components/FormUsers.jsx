import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../../../actions'
import {      
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup
} from "reactstrap";

class FormUsers extends React.Component {  
constructor(props){
    super(props);
    this.state = {      

    };    
     this.handleSubmit = this.handleSubmit.bind(this);
} 


handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.props.users.item  
  if(dato.id){
       this.props.userUpdate(dato);
  }else{
      this.props.userCreate(dato);                       
    }  
}


handleChange =  prop => event =>{
   this.props.changeCliente(prop, event);
}

handleChanges = prop => event => {   
  this.props.changesCliente(prop, event.value);    
}
render() {   
const {item } = this.props.users  
    return (
     <div className="linea"> 
     <Form className="form-registro" onSubmit={ this.handleSubmit}>                                     
          <Row form>
            <Col md={8}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"                  
                    value={item.name}                                                   
                    onChange={this.handleChange('name')}
                    required
                  />   
              </FormGroup>
            </Col>                      
            <Col md={4}>
              <FormGroup>
                <Label for="nit">Nit</Label>
                <Input
                    id="nit"
                    name="nit"
                    type="text"                  
                    value={item.nit}                                                   
                    onChange={this.handleChange('nit')}
                    required
                  />   
              </FormGroup>
            </Col>            
          </Row> 
          <Row form>
            <Col md={8}>
              <FormGroup>
                <Label for="address">Dirección</Label>
                <Input
                    id="address"
                    name="address"
                    type="text"                  
                    value={item.address}                                                   
                    onChange={this.handleChange('address')}
                    required
                  />   
              </FormGroup>
            </Col>                      
            <Col md={4}>
              <FormGroup>
                <Label for="phone">Teléfono</Label>
                <Input
                    id="phone"
                    name="phone"
                    type="text"                  
                    value={item.phone}                                                   
                    onChange={this.handleChange('phone')}
                    required
                  />   
              </FormGroup>
            </Col>            
          </Row>
            
          <Row>
            <Col> 
              <ButtonGroup>
                <Button
                className="btn-sm btn-success"
                >Guardar
                {' '}
                <i className="fas fa-save" />
                </Button>
                <Button
                className="btn-sm btn-danger"
                data-dismiss="modal"
                onClick={() =>this.props.toggle()}
                >Cancelar
                {' '}
                <i className="fas fa-times" />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
      </Form>
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
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(FormUsers);