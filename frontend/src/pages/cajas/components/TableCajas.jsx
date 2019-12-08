import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cajaActions } from '../../../actions'
import Pagination from '../../../components/Navbars/Pagination'
import Moment from 'react-moment'

import {      
  Row,
  Col,  
  Table,  
  Button,
  ButtonGroup,
  Modal
} from "reactstrap";

class TableCajas extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      nroPagina:12,
      modalAprobar: false,
      cajaId: 0  
    };    
} 


componentDidMount() {  
  let num =   this.state.nroPagina
  this.makeHttpRequestWithPage(1,num);  
}

makeHttpRequestWithPage = (pageNumber,num) => {
    this.props.cajaData(pageNumber,num)
} 

handlePagina = prop => event => {             
    this.setState({
      nroPagina: event.value
    })    
   this.makeHttpRequestWithPage(1,event.value); 

}

toggleModalAprobar = (item) => {
  this.setState({
    modalAprobar: !this.state.modalAprobar,
    cajaId: item
  });
};

handleAprobar = () => {    
const { cajaId } = this.state
let dato = {
    id: cajaId,
    open:false
}        

this.props.cajaUpdate(dato);  
   this.setState({
    modalAprobar: false,    
    cajaId:0
   })
}

toggleModal = (item) => {   
  let est = this.props.cajas.modalItem === true ? false : true
  this.props.cajaItem(est,item)
}

toggleModalRecibo = (item) => {   
  let est = this.props.cajas.modalRecibo === true ? false : true
  this.props.cajaRecibo(est,item)
}

toggleModalInforme = (item) => {   
  let est = this.props.cajas.modalInforme === true ? false : true
  this.props.cajaInforme(est,item)
}

render() {    
  const { data, pagina, paginas, total} = this.props.cajas   
  const { nroPagina, modalAprobar } = this.state  
    return (
      <>
      <Row>
      <Col md="12">
        <Pagination
        current = { pagina }
        paginas = { paginas }
        total   = { total }
        handlePagina = { this.handlePagina}
        pagina  = {nroPagina}
        makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
      />
      </Col> 
      </Row>

      
        <Table className="table-basica text-center">         
          <thead>
            <tr>          
              <th className="text-center" width="4%">#</th>               
              <th width="10%">F/Apertura</th>                
              <th width="15%">∑ Inicial</th>
              <th width="15%">∑ Ingreso</th>
              <th width="15%">∑ Egreso</th>
              <th width="15%">∑ Total</th>              
              <th width="10%">F/Cierre</th>
              <th width="10%">Estado</th>
              <th width="10%" className="text-center" >Acciones</th>                                            
            </tr>          
          </thead> 
          {data &&        
        <tbody>
        { data.map(item=>(
          <tr key={item.id} > 
            <td className="text-center">{ item.id }</td>                                                       
            <td ><Moment format="DD/MM/YYYY">{ item.createdAt }</Moment></td>              
            <td >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
            <td >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
            <td >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
            <td >{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>                        
            <td >{ item.open === true ? 'pendiente': <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment> }</td>
            <td >{ item.open === true ? 'abierta':'cerrada' }</td>
            <td className="text-center">
            { item.open === true ?
              <ButtonGroup>              
                <Button                                
                  className="btn-success btn-sm"
                  type="button"                                                  
                  onClick={() => this.toggleModal(item.id) } >
                  <i className="fas fa-edit" />
                </Button>
                <Button                                
                  className="btn-warning btn-sm"
                  type="button"                                                  
                  onClick={() => this.toggleModalAprobar(item.id) } >
                  <i className="fas fa-check" />
                </Button>                
              </ButtonGroup>  
              :
              <ButtonGroup>              
                <Button                                
                  className="btn-info btn-sm"
                  type="button"                                                  
                  onClick={() => this.toggleModalRecibo(item.id) } >
                  <i className="fas fa-file" />
                </Button>
                <Button                                
                  className="btn-danger btn-sm"
                  type="button"                                                  
                  onClick={() => this.toggleModalInforme(item.id) } >
                  <i className="fas fa-file-pdf" />
                </Button>                
              </ButtonGroup>
              }
              
            </td>          
          </tr>    
          ))}
        </tbody>
        }  
        </Table>

        <Modal
          modalClassName="modal-delete"
          isOpen={modalAprobar}
          toggle={this.toggleModalAprobar}>       
          <div className="modal-content">
            <h5 className="text-center">Cerrar ?</h5>                                        
            <ButtonGroup className="botones mb-2 nt">              
              <Button
              color="success"
              className="btn-sm btn"
              data-dismiss="modal"              
              onClick={this.handleAprobar}
              >
                Aceptar
              </Button>              
              <Button
                color="info"
                className="btn-sm btn"
                data-dismiss="modal"                
                onClick={this.toggleModalAprobar}
              >Cancelar</Button> 
            </ButtonGroup>
            
          </div>
        </Modal>

      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...cajaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  cajas: state.cajas,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(TableCajas);