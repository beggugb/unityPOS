import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions } from '../../../actions'
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

function fechaHoy (){

var meses = [
  "Enero", "Febrero", "Marzo",
  "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre",
  "Noviembre", "Diciembre"
]

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth();
var yyy = date.getFullYear();
var fecha_formateada = dia + ' de ' + meses[mes] + ' de ' + yyy;
return fecha_formateada
}

class FormCajas extends React.Component {  
constructor(props){
    super(props);
    this.state = {      

    };    
     this.handleSubmit = this.handleSubmit.bind(this);
} 


handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.props.cajas.item  
  dato.userId = this.props.users.user.id
  console.log(dato)
  if(dato.id){
       this.props.cajaUpdate(dato);
  }else{
      this.props.cajaCreate(dato);                       
    }  
}


handleChange =  prop => event =>{
   this.props.changeCaja(prop, event);
}

handleChanges = prop => event => { 
  if(prop === 'estado' || prop === 'loan')
  { this.props.changesCaja(prop, event);  }
  else
  {this.props.changesCaja(prop, event.value); }   
}
render() {   
const {item } = this.props.cajas  
    return (
     <div className="linea">      
     <Form className="form-registro" onSubmit={ this.handleSubmit}>        
          <Row form>
            <Col md={4}>            
              <FormGroup>
                <Label for="dateOpen">Fecha Apertura</Label>
                <Input
                    id="dateOpen"
                    name="dateOpen"
                    type="text"                  
                    value={fechaHoy()}
                    onChange={this.handleChange('dateOpen')}
                    required
                  />   
              </FormGroup>
            </Col> 
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="name">∑ Inicial</Label>
                <Input
                    id="montoInicial"
                    name="montoInicial"
                    type="text"                  
                    value={item.montoInicial}                                                   
                    onChange={this.handleChange('montoInicial')}
                    required
                  />   
              </FormGroup>
            </Col> 
            <Col md={4}>
              <FormGroup>
                <Label for="montoIngreso">∑ Ingreso</Label>
                <Input
                    id="montoIngreso"
                    name="montoIngreso"
                    type="text"                  
                    value={item.montoIngreso}                                                   
                    onChange={this.handleChange('montoIngreso')}                    
                    readOnly
                  />   
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="montoEgreso">∑ Egreso</Label>
                <Input
                    id="montoEgreso"
                    name="montoEgreso"
                    type="text"                  
                    value={item.montoEgreso}                                                   
                    onChange={this.handleChange('montoEgreso')}                    
                    readOnly
                  />   
              </FormGroup>
            </Col>            
          </Row> 
            
          <Row>
            <Col> 
              <ButtonGroup>
                <Button                
                className={item.montoInicial > 0 ? "btn-sm btn-success": "btn-sm disabled"}
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
      ...cajaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  cajas: state.cajas,  
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(FormCajas);