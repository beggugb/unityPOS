import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { articuloActions } from '../../../actions'
import {      
  Row,
  Col,    
  Input  
} from "reactstrap";

class SearchArticulos extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      articulo:{
        name:''  
      }     
    };    
     this.handleSearch = this.handleSearch.bind(this);
} 


handleSearch = prop => value =>{ 
  const dato  = this.state.articulo
  dato.name = value.target.value
  this.setState({
    articulo:{
      name: value.target.value
      }
  })
  this.search(dato)
}

search(dato){    
  this.props.articuloSearch(dato)  
}

render() {   
const { articulo } = this.state
    return (          
      <Row form className="form-search">            
        <Col md="8">
            <Input
                    id="name"
                    name="name"
                    type="text"                             
                    value={articulo.name}                                                   
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
      ...articuloActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  articulos: state.articulos,  
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchArticulos);