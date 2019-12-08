import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { marcaActions } from '../../../actions'
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

class FormMarcas extends React.Component {  
constructor(props){
    super(props);
    this.state = {      

    };    
     this.handleSubmit = this.handleSubmit.bind(this);
} 


handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.props.marcas.item  
  if(dato.id){
       this.props.marcaUpdate(dato);
  }else{
      this.props.marcaCreate(dato);                       
    }  
}


handleChange =  prop => event =>{
   this.props.changeMarca(prop, event);
}

handleChanges = prop => event => { 
  if(prop === 'estado' || prop === 'loan')
  { this.props.changesMarca(prop, event);  }
  else
  {this.props.changesMarca(prop, event.value); }   
}
render() {   
const {item } = this.props.marcas  
    return (
     <div className="linea"> 
     <Form className="form-registro" onSubmit={ this.handleSubmit}>                                     
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="code">Código</Label>
                <Input
                    id="code"
                    name="code"
                    type="text"                  
                    value={item.code}                                                   
                    onChange={this.handleChange('code')}
                    required
                  />   
              </FormGroup>
            </Col>            
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="name">Nombre</Label>
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
      ...marcaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  marcas: state.marcas,  
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(FormMarcas);