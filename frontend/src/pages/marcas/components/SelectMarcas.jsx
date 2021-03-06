import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { marcaActions } from '../../../actions'
import {        
  Label,  
  FormGroup,
  Input,  
  ListGroup,
  ListGroupItem
} from "reactstrap";

class SelectMarcas extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      name:'',
      searchTerm: null,                        
      open:false,
    };    
} 

componentDidMount() {  
  let dato = this.props.marcas.item
  this.setState({
    name: dato.code +' '+dato.name, 
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
    this.props.marcaLista(searchTerm);
  }

handleAsignar = (item) =>{     
   this.props.marcaAsignar(item);
   this.setState({
    name: item.code +' '+item.name,    
    open: false
   })
   
   //this.clearInput();
}

handleFocus = () =>{ 
  this.clearInput() 
}

componentWillUnmount() {
  this.props.marcaReset()
}

render() {   
const { name } = this.state
const { items } = this.props.marcas  
    return (
      <>
     <FormGroup>
      <Label for="marcaId">Marcas</Label>
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
      ...marcaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  marcas: state.marcas,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SelectMarcas);