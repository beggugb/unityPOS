import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../../actions'

import CardUser from '../../pages/user/components/CardUser'
import CalendarTask from '../../pages/task/components/CalendarTask'
import {      
  Row,
  Col
} from "reactstrap";


class dashboard extends React.Component {

  render() {    
    return (
      <div className="content">     
        <div className="main-contenido">
          <Row>
            <Col md="9" className="cnt">            
              <CalendarTask/>              
            </Col>
            <Col md="3" className="cnt">            
              <CardUser/>              
            </Col>            
          </Row>          
        </div>
      </div>  
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

export default connect(mapStateToProps,mapDispatchToProps)(dashboard);

