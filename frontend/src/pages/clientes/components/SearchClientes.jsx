import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clienteActions } from '../../../actions'
import {      
  Row,
  Col,    
  Input  
} from "reactstrap";

class SearchCliente extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      cliente:{
        name:''  
      }     
    };    
     this.handleSearch = this.handleSearch.bind(this);
} 


handleSearch = prop => value =>{ 
  const dato  = this.state.cliente
  dato.name = value.target.value
  this.setState({
    cliente:{
      name: value.target.value
      }
  })
  this.search(dato)
}

search(dato){    
  this.props.clienteSearch(dato)  
}

render() {   
const { cliente } = this.state
    return (          
      <Row form className="form-search">            
        <Col md="8">
            <Input
                    id="name"
                    name="name"
                    type="text"                             
                    value={cliente.name}                                                   
                    onChange={this.handleSearch('name')}
                    required
                  />   
        </Col>                    
        <Col md="1">
          <i className="fas fa-search btn-success btn-sm"  />
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...clienteActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  clientes: state.clientes,
  carreras: state.carreras,    
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchCliente);