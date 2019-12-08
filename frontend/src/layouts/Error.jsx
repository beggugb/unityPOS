import React from "react";

import { Row, Col} from "reactstrap";
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
      <div className="content">     
        <div className="main-contenido">
          <Row>
            <Col md="12">            
                PAGINA ERROR
            </Col>            
          </Row>          
        </div>
      </div>
    );
  }
}

export default Post;
