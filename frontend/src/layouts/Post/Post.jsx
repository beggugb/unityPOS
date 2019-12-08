import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from '../../pages/login/login.jsx'
import { Notify } from 'react-redux-notify';
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue"      
    };
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {
    
  }
  componentDidUpdate(e) {
    
  }
  render() {
    return (
      <>
        <div className="wrapper">       
        <Notify />   
          <Switch>
            <Route path="/login/" component={Login} />            
          </Switch>
        </div>               
      </>
    );
  }
}

export default Post;
