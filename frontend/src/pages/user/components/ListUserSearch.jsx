import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../../../actions'
import Moment from 'react-moment'
import {        
  Card,
  CardBody,
  Col, Row,ListGroup, ListGroupItem,
  FormGroup,Input
} from "reactstrap";
import '../css/main.css';

class ListUserSearch extends React.Component { 
 constructor(props) {
    super(props);
    this.state = {                    
        name:'',
        open: false,
        searchTerm: null,
    };      
  }



clearInput() {
    this.setState({
      name:'' ,
      open: false     
    });
  } 

handleChange = (event) => {       
   const { value } = event.target;
   const name = value.toLowerCase().trim();

   if(!value){
    this.clearInput();
    return;
   }

   this.setState({
     name: value,
     open: true
   })

   if(name){
    this.search(name)    
   }
  
};

search(searchTerm) {    
  this.props.userDataList(searchTerm)
}

handleFocus = () =>{ 
  this.clearInput() 
}

handleAsignar = (item) =>{     
   this.props.setUser(item);
   this.setState({
    name: item.name,
    open: false
   })
   
   //this.clearInput();
}

render() {    
  const { data } = this.props.users
  const { name } = this.state  
    return (
      <>
        <FormGroup>
          <label>Para</label>
            <Input
                type="text"
                name="name"
                value={name}                  
                onChange={this.handleChange}  
                onFocus={this.handleFocus} 
              />
        </FormGroup> 
        {this.state.open === true ?      
        < >
        { data &&                                      
        <ListGroup className="users">  
        { data.map(item=>(
          <ListGroupItem  
          key={item.id}
          onClick={() => this.handleAsignar(item)}
          >
            {item.name}
          </ListGroupItem>          
         ))
        }
        </ListGroup>         
       }
       </>
       : null}        
      </>

    );  
 }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...userActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({  
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(ListUserSearch);