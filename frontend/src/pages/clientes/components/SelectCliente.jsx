import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clienteActions } from '../../../actions'
import {        
  Label,  
  FormGroup,
  Input,  
  ListGroup,
  ListGroupItem
} from "reactstrap";

class SelectCliente extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      name:'',
      nit:'',
      searchTerm: null,                        
      open:false,
    };    
} 

componentDidMount() {  
  let dato = this.props.clientes.item
  this.setState({
    name: dato.nit +' '+dato.name, 
  })
}

clearInput() {
    this.setState({  
      name:'',
      open: false,
      searchTerm: null,     
    });
  }  

handleChange = (event) => {
    const { value } = event.target;
    const name = value.toLowerCase().trim();

    if (!value) {      
      this.clearInput();
      return;
    }

    this.setState({
      name:value,
      open: true
    });

    if (name) {
      this.search(name);
    }    
  }

search(searchTerm) {    
    this.props.clienteLista(searchTerm);
  }

handleAsignar = (item) =>{     
   this.props.clienteAsignar(item);
   this.setState({
    name: item.name+ ' ' + item.nit,
    open: false
   })
   
   //this.clearInput();
}

handleFocus = () =>{ 
  this.clearInput() 
}

componentWillUnmount() {
  this.props.clienteReset()
}

render() {   
const { name } = this.state
const { items } = this.props.clientes  
    return (
      <>
     <FormGroup>
      <Label for="name">Cliente</Label>
        <Input                    
          name="name"
          type="text" 
          required                 
          value={ name }  
          onChange={this.handleChange}   
          onFocus={this.handleFocus}   
          autoComplete="off"                                                            
        />   
     </FormGroup>  

    {this.state.open === true ?
      <div className="slista">                   
        {items && 
          <ListGroup> 
          { items.map(item=>(        
          
          <ListGroupItem
          key={item.id}
          tag="button"
          onClick={() => this.handleAsignar(item) }
          >
          <b>{item.name}</b>          
          </ListGroupItem>
          ))}         
        </ListGroup>
        }      
      </div>: null 
    }
    </>
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
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SelectCliente);