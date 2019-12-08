import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions } from '../../../actions'
import {      
  Row,
  Col,    
  Input  
} from "reactstrap";

class SearchCajas extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      caja:{
        createdAt:''  
      }     
    };    
     this.handleSearch = this.handleSearch.bind(this);
} 


handleSearch = prop => value =>{ 
  const dato  = this.state.caja
  dato.createdAt = value.target.value
  this.setState({
    caja:{
      createdAt: value.target.value
      }
  })
  this.search(dato)
}

search(dato){    
  this.props.cajaSearch(dato)  
}

render() {   
const { caja } = this.state
    return (          
      <Row form className="form-search">            
        <Col md="8">
            <Input                    
                    createdAt="createdAt"
                    type="date"                             
                    value={caja.createdAt}                                                   
                    onChange={this.handleSearch('createdAt')}
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
      ...cajaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  cajas: state.cajas,  
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchCajas);