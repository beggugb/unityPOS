import React from "react";
import { connect } from 'react-redux'
import {        
  Card,
  CardBody
} from "reactstrap";

class CardUser extends React.Component {    
render() {    
  const { user } = this.props.users
    return (
      <Card className="card-author">
        <CardBody>          
            <div className="detalle text-center">                    
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img
                  alt="..."
                  className="avatar"
                  src={require("../../../assets/img/anime3.png")}
                  />
                <h5 >!Hola, { user.name }!</h5>
              </a>                            
            </div>
        </CardBody>  
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(CardUser);