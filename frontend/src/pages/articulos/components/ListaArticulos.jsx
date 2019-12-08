import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ventaActions, articuloActions } from '../../../actions'
import { apiErp } from '../../../helpers'
import PaginationSimple from '../../../components/Navbars/PaginationSimple'
import SearchArticulos from './SearchArticulos'

import {      
  Row,
  Col,    
  Card
} from "reactstrap";

class ListaArticulos extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      nroPagina:12,
      modalDelete: false,
      deleteId: 0  
    };    
} 


componentDidMount() {    
  this.makeHttpRequestWithPage(1,20);  
}

makeHttpRequestWithPage = (pageNumber) => {
    this.props.articuloData(pageNumber,20)
} 

componentWillUnmount() {  
  this.props.articuloReset()
}


handleChange = (articulo) => {  
  console.log(articulo)
  let venta = [...this.props.ventas.items]       
  let sumaTotal = this.props.ventas.sumaTotal; 
  let cantidadTotal  = this.props.ventas.cantidadTotal;
  var repeat = false 
  venta.map((item, index)=>{
    if(item.articleId === articulo.id )
    {
      if(item.cantidad < articulo.stock ){
          venta[index].cantidad = venta[index].cantidad + 1;           
          venta[index].precioTotal = venta[index].cantidad *  parseFloat(articulo.psale);
          venta[index].stock = venta[index].stock -1;                      
          sumaTotal = sumaTotal + parseFloat(articulo.psale);  
          cantidadTotal = cantidadTotal + 1;
          repeat = true;
          }
          repeat = true;
    }
    return null
  })

  if(!repeat)
      { 
        let itemVenta = {};
        itemVenta.cantidad = 1;
        itemVenta.precioUnitario = parseFloat(articulo.psale);
        itemVenta.precioTotal = parseFloat(articulo.psale);  
        itemVenta.articleId = articulo.id;
        itemVenta.name = articulo.name;
        itemVenta.variant = articulo.variant;
        itemVenta.stock = articulo.stock - 1;
        venta.push(itemVenta);  
        sumaTotal = sumaTotal + parseFloat(articulo.psale);  
        cantidadTotal = cantidadTotal + 1;
      }    
     
    this.props.addItems(venta, sumaTotal, cantidadTotal);

}  


render() {    
  const { data, pagina, paginas, total} = this.props.articulos     
    return (
      <div className="productos">
      

    <div className="sub"> 
    <Row className="crl" > 
    <Col>    
    { data.map((item,index)=>(      
      <Card  
        key={item.id}      
        className={(item.stock > 0) ? "productoItem" : "productoItem bg-producto" }  
        onClick={ (item.stock > 0) ?  () => this.handleChange(item) : null} >         
        <div className="subArticulo">
        <div className="oferta">{ item.ofert === true ? <i className="fas fa-star"/>: <i className="fas fa-star text-white"/>}</div>
        <div className="precio">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.psale)}</div>
        <div className="imagen"><img alt="producto" src={apiErp + '/static/images/articulos/sm/'+ item.filename }/></div>
        <div className="stock">{ item.stock }</div>
        <div className="nombre">{ item.name }</div>
        </div>
      </Card>     
      ))
    }
    </Col>
    </Row>      
 </div> 
    <Row>
      <Col md="5" className="menu">
        <PaginationSimple
        current = { pagina === 1 ? pagina : pagina -1 }
        paginas = { pagina === paginas ? pagina : pagina+1  }
        total   = { total }
        label   = { 'articulos' }
        handlePagina = { this.handlePagina}        
        makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
      />
      </Col> 
      <Col md="7" className="menu">
        <SearchArticulos/>
      </Col> 
    </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...articuloActions,
      ...ventaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  articulos: state.articulos,
  ventas: state.ventas,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(ListaArticulos);