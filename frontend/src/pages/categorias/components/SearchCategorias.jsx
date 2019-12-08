import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { categoriaActions } from '../../../actions'
import {      
  Row,
  Col,    
  Input  
} from "reactstrap";

class SearchCategoria extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      categoria:{
        name:''  
      }     
    };    
     this.handleSearch = this.handleSearch.bind(this);
} 


handleSearch = prop => value =>{ 
  const dato  = this.state.categoria
  dato.name = value.target.value
  this.setState({
    categoria:{
      name: value.target.value
      }
  })
  this.search(dato)
}

search(dato){    
  this.props.categoriaSearch(dato)  
}

render() {   
const { categoria } = this.state
    return (          
      <Row form className="form-search">            
        <Col md="8">
            <Input
                    id="name"
                    name="name"
                    type="text"                             
                    value={categoria.name}                                                   
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
      ...categoriaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  categorias: state.categorias,  
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchCategoria);