import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reporteActions } from '../../actions'
import { Link } from 'react-router-dom'
import { Input, Button, ButtonGroup, Row,Col,Nav,NavItem,Form, FormGroup, Label } from "reactstrap";
import Select from 'react-select'
import Switch from 'react-switch'
import { stylesErp } from '../../helpers'

const defaultVal = (options, valor) =>{
  return options.filter(item=>
      item.value === valor
    )

}

const tipos =[ {"value":"Articulos","label":"Articulos"},
               {"value":"Cajas","label":"Cajas"},               
               {"value":"Ventas","label":"Ventas"}
             ];

class clientes extends React.Component {

constructor(props) {
    super(props);
    this.state = {            
      item:{
          tipo:'Articulos',
          desde:'',
          hasta:'',
          stock:true,
          saldo:false,
          minimos:false,
          categoriaId:0,
          categoria:''         
        },
    }; 
    this.handleSubmit = this.handleSubmit.bind(this);  
}

handleChange = prop => event => {                 
  const { item } = this.state
  this.setState({
    item:{
      ...item,
      [prop]: event.target.value,
    }
  })
}; 

handleChanges = prop => event => {                 
  const { item } = this.state
  if(prop === 'stock' || prop === 'saldo')
  {
      this.setState({
        item:{
          ...item,
          [prop]: event,
        }
      })
  }else{
    this.setState({
        item:{
          ...item,
          [prop]: event.value,
        }
      })
    this.props.reportReset()    
    } 
} 


handleSubmit(event){ 
  event.preventDefault();    

  if(this.state.item.tipo === 'Articulos')
  { this.props.searchArticulos(this.state.item)  }

  if(this.state.item.tipo === 'Cajas')
  { this.props.searchCajas(this.state.item)  }

  if(this.state.item.tipo === 'Ventas')
  { this.props.searchVentas(this.state.item)  }

  if(this.state.item.tipo === 'Compras')
  { this.props.searchCompras(this.state.item)  }

  if(this.state.item.tipo === 'Pagos')
  { this.props.searchPagos(this.state.item)  }
  
  
  
}

componentWillUnmount() {  
  this.props.reporteReset()
}

  render() {        
    const { report } = this.props.reportes  
    const { item } = this.state
    return (
      <div className="content">     
        <div className="main-contenido">
        <Row className="crl">
          <Col md={12}>
            <Nav tabs className="bg-navin">                                 
              <NavItem>            
                <Link to="/admin/clientes" className="nav-link active"> 
                <i className="fas fa-chevron-down"/>{' '} Reportes  </Link>                
              </NavItem>              
            </Nav>        
          </Col>      
        </Row>
        <Row className="crl mt-2">
          <Col md={3}>                             
          <Form onSubmit={ this.handleSubmit}>   
          <Row>
          <Col>
            <FormGroup>
              <Label for="codigo" className="mr-3">Informe</Label>
              <Select                                                               
                  name="tipo"                        
                  options={tipos}                                
                  value={defaultVal(tipos,item.tipo)}                             
                  styles={stylesErp}                                                                               
                  onChange={this.handleChanges('tipo')}
                />
            </FormGroup>    
          </Col>
          </Row>
          { item.tipo === 'Ventas' || item.tipo === 'Cajas' ?
          <>
          <Row form>
            <Col>                           
              <FormGroup>
              <Label for="codigo" className="mr-3">Desde</Label>              
              <Input
               name="desde"
               type="date"
               value={item.desde}
               onChange={this.handleChange('desde')} 
               required
              />
            </FormGroup>            
            </Col> 
          </Row>
          <Row form>
            <Col>                           
              <FormGroup>
              <Label for="codigo" className="mr-3">Hasta</Label>              
              <Input
               name="hasta"
               type="date"
               value={item.hasta}
               onChange={this.handleChange('hasta')} 
               required
              />
            </FormGroup>            
            </Col> 
          </Row>
          </>
          :null}
           
          { item.tipo === 'Articulos'?  
          <>        
          <Row form>
            <Col>                           
              <FormGroup className="ml-2">
              <Label for="stock">Stock</Label>
                  <div>                                                                            
                    <Switch
                            name="stock"                               
                            onChange={this.handleChanges('stock')} 
                            checked={item.stock} 
                            handleDiameter={18}
                            offColor="#a6d8f7"
                            onColor="#049dfd"
                            offHandleColor="#4d4d4d"
                            onHandleColor="#fff"
                            height={20}
                            width={55}                            
                            id="stock"
                            /> 
                          </div> 
            </FormGroup>           
            </Col> 
          </Row> 

          </>        
          :null}
          
          <Row form>
          <Col>
           <ButtonGroup className="btn-grp mt-2">
            <Button
              className={(item.tipo) ? "btn-sm btn-success" : "btn-sm disabled" }                      
              type="submit">
              <i className="fas fa-file"/> {' '} Generar
              </Button>           
          </ButtonGroup>
          </Col>
          </Row>

          </Form>          

          </Col>                  
          <Col md={9} className="reporting">                   
            <div className="divicion" >
                {report}     
            </div> 
          </Col>
          </Row>
        </div>
      </div>  
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...reporteActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  user: state.user,
  reportes: state.reportes
});

export default connect(mapStateToProps,mapDispatchToProps)(clientes);
