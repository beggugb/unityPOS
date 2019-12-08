import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../../actions'

import {
  Button,
  Card,  
  CardBody,
  CardFooter,  
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";


class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
        user:{
        username: '',
        password: '',          
        },            
        submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount() {
  
}
componentWillUnmount() {
    
}  

handleSubmit (event) {
  event.preventDefault()
  const { user } = this.state;
  if(user.username && user.password){
    this.props.login(user)
  }

}

handleChange = prop => event => {   
  const { user } = this.state
  this.setState({
    user:{
      ...user,
      [prop]: event.target.value,
    }
  })
};

  
  render() {
    const { username, password, submitted } = this.state;
    return (
      <>
        <div className="content">
          <Row className="mt-5">
             <Col md={{ size: 5, offset: 1 }}>
              <Card className="card-user-form">
                <CardBody className="text-center">
                  <img alt="..." src={require("../../assets/img/logoin.png")} /> 
                  <h5>ERP  Versión 2.1</h5>            
            <h6>
            Desarrollado por            
            </h6>
            <h6>            
            <a
              href="https://beggu.net"
              rel="noopener noreferrer"
              target="_blank"
            >
            { ' '}  Beggu.net
            </a>
            </h6> 
                </CardBody>             
              </Card>
            </Col>            
            <Col md={{ size: 5 }}>
              <Card className="card-user-form">
              <h3>Inicie sesión con su ID</h3>
                <CardBody>
                  <Form className="login" onSubmit={this.handleSubmit} > 
              <Row form>
                <Col>                 
                  <FormGroup className={submitted && !username ? ' has-error' : ''}>                      
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        value={ username }
                        placeholder="Username"
                        onChange= {this.handleChange('username')} 
                      />
                      {submitted && !username &&
                          <div className="help-block">Ingresa tu usuario</div>
                      }  
                  </FormGroup>  
                </Col>  
              </Row>

              <Row form>                    
                <Col>                    
                  <FormGroup>                      
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ this.handleChange('password')}                        
                      />
                      {submitted && !password &&
                          <div className="help-block">Ingresa tu contraseña</div>
                      } 
                  </FormGroup>   
                </Col>
              </Row>    
              
              <Row form>
                <Col className="text-center">
                  <Button                                             
                      className="btn-primary mt-2">
                         <i className="fas fa-lock"/> {' '}  Login
                      </Button>                    
                </Col>
              </Row>
            </Form>
                </CardBody>
                <CardFooter>
                  
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div> 
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
  user: state.user
});

export default connect(mapStateToProps,mapDispatchToProps)(login);

