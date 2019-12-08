import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Moment from 'react-moment'

import {      
  Row,
  Col,
  Button,
  Input,
  ListGroupItem,
  ListGroup
} from "reactstrap";

let socket

class task extends React.Component {
 constructor(props) {
    super(props);
   
  }
 render() {          
   const {items} = this.state
   const newItem ="colores"
    return (
      <div className="content">     
        <div className="main-contenido">
                  
        </div>
      </div>  
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps,mapDispatchToProps)(task);

