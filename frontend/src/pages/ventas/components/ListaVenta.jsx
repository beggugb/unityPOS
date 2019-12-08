import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ventaActions } from '../../../actions'


import {      
  Row,
  Col,    
  Table
} from "reactstrap";

class ListaVenta extends React.Component {
handleFocus = (ite) => { 
  this.props.setIndex(ite,ite.articleId);
}
render() {   
  const { items, cantidadTotal, sumaTotal, inter } = this.props.ventas  
  return (
    <>
    <Row>
      <Col md="12" className="ventai">                  
        <Table className="table-ventas">                    
        { items &&        
        <tbody>
        { items.map(item=>(
          <tr key={item.articleId} 
          className={item.articleId === inter ? "bg-dark text-white": "text-dark"}>  
            <td onClick={() => this.handleFocus(item) } width="80%">  
              <div className="itema">
                <div className="itemb">{item.name}</div>
                  <div className="itemc"> 
                      {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.precioTotal)} 
                  </div>                       
                  <div className="itemd">              
                    <b>{item.cantidad}</b> {item.variant} a {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.precioUnitario)} / {item.variant}
                  </div>
              </div>
            </td>                        
          </tr>    
          ))}
        </tbody>
        }  
        </Table>                    
      </Col>
    </Row>
    <Row>
      <Col md="12" className="ventad">                  
        <Table className="table-total">
        <tbody>        
        <tr>                    
          <td width="20%" className="text-center">Cant: <b>{ cantidadTotal }</b></td>
          <td width="50%" className="text-right">∑ Total</td>
          <td width="30%" className="text-center">
          <b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(sumaTotal)}
          </b>
          </td>
        </tr>
        </tbody>
        </Table>    
      </Col>
    </Row>         
    </>    
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...ventaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  user: state.user,
  ventas: state.ventas
});

export default connect(mapStateToProps,mapDispatchToProps)(ListaVenta);