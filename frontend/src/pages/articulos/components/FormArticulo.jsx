import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { articuloActions } from '../../../actions'
import { stylesErp } from '../../../helpers'
import SelectCategorias from '../../categorias/components/SelectCategorias'
import SelectMarcas from '../../marcas/components/SelectMarcas'
import SelectTipos from '../../tipos/components/SelectTipos'
import Select from 'react-select'
import Switch from 'react-switch'
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

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const origens =[ {"value":"Compra","label":"Compra"},
                {"value":"Produccion","label":"Producción"},
                {"value":"Donacion","label":"Donación"}
                ];
const medidas =[ {"value":"Caja","label":"Caja"},                
                {"value":"Paquete","label":"Paquete"},                
                {"value":"Unidad","label":"Unidad"}
                ];                


class FormArticulos extends React.Component {  
constructor(props){
    super(props);
    this.state = {      

    };    
     this.handleSubmit = this.handleSubmit.bind(this);
} 


handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.props.articulos.item  
  dato.typeId = this.props.tipos.item.id
  dato.markId  = this.props.marcas.item.id
  dato.categoryId = this.props.categorias.item.id
  if(dato.id){
       this.props.articuloUpdate(dato);
  }else{
      this.props.articuloCreate(dato);                       
    }  
}


handleChange =  prop => event =>{
   this.props.changeArticulo(prop, event);
}

handleChanges = prop => event => { 
  if(prop === 'inCatalog' || prop === 'ofert')
  { this.props.changesArticulo(prop, event);  }
  else
  {this.props.changesArticulo(prop, event.value); }   
}
render() {   
const {item } = this.props.articulos  
    return (
     <div className="linea"> 
     <Form className="form-registro" onSubmit={ this.handleSubmit}>                                     
          <Row form>
            <Col md={10}>
              <FormGroup>
                <Label for="code">Código</Label>
                <Input
                    id="code"
                    name="code"
                    type="text"                  
                    value={item.code}                                                   
                    onChange={this.handleChange('code')}
                    maxLength="35"   
                    required
                  />   
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="inCatalog">Catalogo</Label>
                <div>  
                  <Switch
                      name="inCatalog"                               
                      onChange={this.handleChanges('inCatalog')} 
                      checked={item.inCatalog} 
                      handleDiameter={18}
                      offColor="#a6d8f7"
                      onColor="#049dfd"
                      offHandleColor="#4d4d4d"
                      onHandleColor="#fff"
                      height={20}
                      width={55}                            
                      id="inCatalog"
                  /> 
                </div>   
              </FormGroup>
            </Col>            
          </Row> 
          <Row form>           
            <Col md={12}>
              <FormGroup>
                <Label for="name">Nombre</Label>
                <Input
                    name="name"
                    type="text"                            
                    value={item.name}                                                                                                                                   
                    onChange={this.handleChange('name')}                                   
                    required
                    />
              </FormGroup>
            </Col>
          </Row>

          <Row form>           
            <Col md={4}>
              <SelectCategorias/>
            </Col>
            <Col md={4}>
              <SelectTipos/>
            </Col>
            <Col md={4}>
              <SelectMarcas/>
            </Col>            
          </Row>

          <Row form>           
            <Col md={3}>
              <FormGroup>
                <Label for="variant">Medida</Label>
                  <Select                                                               
                  name="variant"                        
                  options={medidas}                                
                  value={defaultVal(medidas,item.variant)}                             
                  styles={stylesErp}                                                                               
                  onChange={this.handleChanges('variant')}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="origin">Origen</Label>
                 <Select                                                               
                  name="origin"                        
                  options={origens}                                
                  value={defaultVal(origens,item.origin)}                             
                  styles={stylesErp}                                                                               
                  onChange={this.handleChanges('origin')}
                />     
              </FormGroup>
            </Col> 
            <Col md={2}>
              <FormGroup>
                <Label for="vol">Volumen</Label>
                <Input
                    name="vol"
                    type="text"                            
                    value={item.vol}                                                                                                                                   
                    onChange={this.handleChange('vol')}                                                       
                    />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="brt">Peso(Bruto)</Label>
                <Input
                    name="brt"
                    type="text"                            
                    value={item.brt}                                                                                                                                   
                    onChange={this.handleChange('brt')}                                                       
                    />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="net">Peso(Neto)</Label>
                <Input
                    name="net"
                    type="text"                            
                    value={item.net}                                                                                                                                   
                    onChange={this.handleChange('net')}                                                       
                    />
              </FormGroup>
            </Col>
         </Row>
     
        
         <Row form>
         <Col md={3}>
            <FormGroup>
              <Label for="purchase">Precio Compra</Label>
                <Input
                  name="purchase"   
                  type="number"                                                     
                  value={item.purchase}                           
                  onChange={this.handleChange('purchase')}
                  required
                />
            </FormGroup>  
          </Col>
           <Col md={3}>
            <FormGroup>
              <Label for="psale">Precio Venta</Label>
              <Input
                name="psale"   
                type="number"                         
                value={item.psale}                                    
                onChange={this.handleChange('psale')}
                required
              />
            </FormGroup>  
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="pdesc">Descuento(%)</Label>
              <Input
                  name="pdesc"   
                  type="number"                         
                  value={item.pdesc}                                    
                  onChange={this.handleChange('pdesc')}
                  required
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="lineas">Precio Total</Label>
              <Input
                  name="pdescuento"   
                  type="text"                                                                                 
                  value={new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format((item.psale - ((item.psale * item.pdesc)) / 100))} 
                  onChange={this.handleChange('total')}
                  readOnly                            
              />  
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="lineas">Rendimiento</Label>
              <Input
                name="rendimiento"   
                type="text"                                                                                 
                value={new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format((item.psale - ((item.psale * item.pdesc)) / 100) - item.ppucache)}                                   
                onChange={this.handleChange('redimiento')}
                readOnly
              />  
            </FormGroup>
          </Col>
           
                
        </Row>
        <Row form>
        <Col md={3}>
            <FormGroup>
              <Label for="minim">Minimo Stock</Label>
              <Input
                name="minim"   
                type="number"                         
                value={item.minim}                                    
                onChange={this.handleChange('minim')}                           
              />
            </FormGroup>
          </Col>          
            <Col md={3}>
            <FormGroup>
              <Label for="stock">Stock Actual</Label>
              <Input
                name="stock"   
                type="number"                         
                value={item.stock}                                                    
                onChange={this.handleChange('stock')}                
                
              />
            </FormGroup>
          </Col>
          
          <Col md={3}>
            <FormGroup>
              <Label for="reposic">Punto Reposición</Label>
              <Input
                name="reposic"   
                type="number"                         
                value={item.reposic}                                    
                onChange={this.handleChange('reposic')}   
                required             
              />
            </FormGroup>
          </Col>            
          <Col md={1}>
            <FormGroup>
              <Label for="inStock">Stock</Label>
              <div>                                                                            
                          <Switch
                            name="inStock"                               
                            onChange={this.handleChanges('inStock')} 
                            checked={(parseInt(item.stock) > parseInt(item.minim) ? true : false )} 
                            handleDiameter={18}
                            offColor="#fd5d93"
                            onColor="#049dfd"
                            offHandleColor="#4d4d4d"
                            onHandleColor="#26e413"
                            height={30}
                            disabled={true}
                            width={50}                            
                            id="inStock"

                            /> 
                          </div>  
            </FormGroup>  
          </Col> 
          <Col md={1}>
            <FormGroup>
             <Label for="ofert">Oferta</Label>
                  <div>                                                                            
                          <Switch
                            name="ofert"                               
                            onChange={this.handleChanges('ofert')} 
                            checked={item.ofert} 
                            handleDiameter={18}
                            offColor="#fd5d93"
                            onColor="#049dfd"
                            offHandleColor="#4d4d4d"
                            onHandleColor="#26e413"
                            height={30}
                            width={50}                            
                            id="ofert"
                            /> 
                          </div> 
            </FormGroup>
          </Col>                         
        </Row>
        <FormGroup>
          <Label for="description">Descripción</Label>
            <Input                    
              name="description"
              type="textarea"                  
              value={item.description}                                                   
              onChange={this.handleChange('description')}
            />   
        </FormGroup>
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
      ...articuloActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  articulos: state.articulos,
  tipos: state.tipos,
  marcas: state.marcas,
  categorias: state.categorias,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(FormArticulos);