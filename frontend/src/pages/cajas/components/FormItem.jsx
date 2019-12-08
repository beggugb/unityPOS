import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions } from '../../../actions'
import Moment from 'react-moment'
import Select from 'react-select'
import { stylesErp } from '../../../helpers'
import {      
  Row,
  Col,
  Label,
  Form,
  FormGroup,  
  Input,
  Button,
  ButtonGroup,
  Table
} from "reactstrap";

const defaultVal = (options, valor) =>{
  return options.filter(item=>
      item.value === valor
    )

}

const tipos =[ {"value":"ingreso","label":"Ingreso"},{"value":"egreso","label":"Egreso"}];

class FormItem extends React.Component {  
constructor(props){
    super(props);
    this.state = {   
      mov :{
        id:'',
        cajaId:0,
        monto:0,
        label:'',
        est:true
      }   
    };    
     this.handleSubmit = this.handleSubmit.bind(this);
} 


handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.state.mov
  dato.cajaId = this.props.cajas.item.id
  this.props.cajaItemCreate(dato);      
  this.setState({
      mov :{
        id:'',
        cajaId:0,
        monto:0,
        label:'',
        est:true
      }
    })    
                        
}


handleChange =  prop => event =>{
  const { mov } = this.state  
  this.setState({
    mov:{
      ...mov,
      [prop]: event.target.value
    }

  })
}

handleChanges = prop => event => {   
  const { mov} = this.state
  this.setState({
    mov:{
      ...mov,
      tipo: event.value
    }

  })
}

toggleRemover= (item)=>{     
  this.props.cajaItemRemove(item);      
}

componentWillUnmount() {  
  this.props.cajaData(1,12)
}

render() {   
const { mov } = this.state
const { item, items } = this.props.cajas

    return (
    <>
    <div className="ior text-center">
    <i className="fas fa-times"
    onClick={() =>this.props.toggle()}
    />
    </div>
    <div className="linea"> 
    <Row>
      <Col md="3"><b>N° :</b>{ item.id }</Col>
      <Col md="6"><b>Fecha Apertura :</b> <Moment format="DD/MM/YYYY">{ item.createdAt }</Moment></Col>
      <Col md="3"><b>N°/Mov. :</b> { item.num }</Col>
    </Row>
    <Row className="mt-1">      
      <Col md="3"><b>∑ Inicial :</b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</Col>
      <Col md="3"><b>∑ Ingresos :</b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</Col>
      <Col md="3"><b>∑ Egresos :</b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</Col>
      <Col md="3"><b>∑ Final :</b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</Col>      
    </Row> 
    </div>
    <div className="linea"> 
    <Row>    
      <Col md="4">
      <Form className="form-registro" onSubmit={ this.handleSubmit}>                  
              <FormGroup>
                <Label for="tipo">Tipo movimiento</Label>
                <Select                                                               
                  name="tipo"                        
                  options={tipos}                                
                  value={defaultVal(tipos,mov.tipo)}                             
                  styles={stylesErp}                                                                               
                  onChange={this.handleChanges('tipo')}
                />  
              </FormGroup>        
              <FormGroup>
                <Label for="monto">Monto</Label>
                <Input
                    id="monto"
                    name="monto"
                    type="text"                  
                    value={mov.monto}                                                   
                    onChange={this.handleChange('monto')}
                    required
                  />   
              </FormGroup>            
              <FormGroup>
                <Label for="label">Detalle</Label>
                <Input
                    id="label"
                    name="label"
                    type="textarea"                  
                    value={mov.label}                                                   
                    onChange={this.handleChange('label')}                                        
                  />   
              </FormGroup>                        
          
              <ButtonGroup className="text-center ml-1">
                <Button
                className="btn-sm btn-success"
                >Guardar
                {' '}
                <i className="fas fa-save" />
                </Button>                             
              </ButtonGroup>
            
      </Form>

      </Col>
      <Col md="8">
      <div className="tcontent">
      <Table className="table-basica text-center">         
          <thead>
            <tr>          
              <th className="text-center" width="4%">#</th>               
              <th width="10%">F/Registro</th>                
              <th width="15%">Tipo</th>
              <th width="15%">Monto</th>
              <th width="15%">Descripción</th>
              <th width="10%" className="text-center" >Acciones</th>                                            
            </tr>          
          </thead> 
        {items &&        
        <tbody>
        { items.map(item=>(
          <tr key={item.id} className={item.est === true ? 'habilitado':'deshabilitado'} > 
            <td className="text-center">{ item.id }</td>                                                       
            <td ><Moment format="DD/MM/YYYY">{ item.createdAt }</Moment></td>              
            <td >{item.tipo}</td>
            <td >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>            
            <td >{item.label}</td>
            <td>
              {item.est === true ?
              <Button                                
                className="btn-danger btn-sm"                          
                onClick={() => this.toggleRemover(item) } >
                <i className="fas fa-trash" />
              </Button>: null}
            </td>  
          </tr>    
          ))}
        </tbody>
        }  
        </Table>
        </div>
      </Col>
    </Row>
    </div>
    </>
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

export default connect(mapStateToProps,mapDispatchToProps)(FormItem);