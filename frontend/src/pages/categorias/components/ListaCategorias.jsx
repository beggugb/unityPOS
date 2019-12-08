import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { articuloActions,categoriaActions } from '../../../actions'
import PaginationSimple from '../../../components/Navbars/PaginationSimple'

import {      
  Row,
  Col,      
  Button,
  Nav
} from "reactstrap";

class ListaCategorias extends React.Component {  
constructor(props){
    super(props);
    this.state = {            
      modalDelete: false,
      deleteId: 0  
    };    
} 


componentDidMount() {    
  this.makeHttpRequestWithPage(1,5);  
}

makeHttpRequestWithPage = (pageNumber) => {
    this.props.categoriaData(pageNumber,5)
} 

getArticles = (id) =>{

  this.props.articuloSearchCategory(id)
}

componentWillUnmount() {  
  this.props.categoriaReset()
}

render() {    
  const { data, pagina, paginas} = this.props.categorias     
    return (
      <>
      <Row>
      <Col md="10"  className="menu">
        {data &&  
        <Nav>   
        <li className="nav-menu">
          <Button className="btn-home" onClick={() => this.getArticles(0)}> 
          <i className="fas fa-list"/></Button></li>
          { data.map(item=>(                                                    
            <li key={item.id} className="nav-menu">
              <Button 
              className="btn-menu"
              onClick={() => this.getArticles(item.id)}
              
              > 
              { item.name } 
              </Button>
            </li>            
          ))}  
        </Nav>
        }
      </Col>
      <Col md="2" className="menu">
        <PaginationSimple
        current = { pagina === 1 ? pagina : pagina -1 }
        paginas = { pagina === paginas ? pagina : pagina+1  }        
        handlePagina = { this.handlePagina}                
        makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
      />
      </Col> 
      </Row>

                
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...categoriaActions,
      ...articuloActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  categorias: state.categorias,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(ListaCategorias);