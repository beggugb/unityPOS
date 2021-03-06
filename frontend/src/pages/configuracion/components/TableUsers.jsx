import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clienteActions } from '../../../actions'
import Pagination from '../../../components/Navbars/Pagination'

import {      
  Row,
  Col,  
  Table,  
  Button,
  ButtonGroup,
  Modal
} from "reactstrap";

class TableUsers extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      nroPagina:12,
      modalDelete: false,
      deleteId: 0  
    };    
} 


componentDidMount() {  
  let num =   this.state.nroPagina
  this.makeHttpRequestWithPage(1,num);  
}

makeHttpRequestWithPage = (pageNumber,num) => {
    this.props.clienteData(pageNumber,num)
} 

handlePagina = prop => event => {             
    this.setState({
      nroPagina: event.value
    })    
   this.makeHttpRequestWithPage(1,event.value); 

}

toggleModalDelete = (item) => {
  this.setState({
    modalDelete: !this.state.modalDelete,
    deleteId: item
  });
};

handleDelete = () => {            
this.props.clienteDelete(this.state.deleteId);  
   this.setState({
    modalDelete: false,    
    deleteId:0
   })
}

toggleModal = (item) => {   
  let est = this.props.clientes.modalRegister === true ? false : true
  this.props.clienteItem(est,item)
}

render() {    
  const { data, pagina, paginas, total} = this.props.clientes   
  const { nroPagina, modalDelete } = this.state  
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

    
        <Table className="table-basica">         
          <thead>
            <tr>          
              <th className="text-center" width="7%">#</th>                                        
              <th width="28%">Nombre</th>
              <th width="25%">Dirección</th>
              <th width="15%">Teléfono</th>
              <th width="15%">Nit</th>
              <th width="10%" className="text-center" >Acciones</th>                                            
            </tr>          
          </thead> 
          {data &&        
        <tbody>
        { data.map(item=>(
          <tr key={item.id} > 
            <td className="text-center">{ item.id }</td>                                                                   
            <td >{ item.name }</td>
            <td >{ item.address }</td>
            <td >{ item.phone }</td>
            <td >{ item.nit }</td>
            <td className="text-center">
              <ButtonGroup>              
                <Button                                
                  className="btn-success btn-sm"
                  type="button"                                                  
                  onClick={() => this.toggleModal(item) } >
                  <i className="fas fa-edit" />
                </Button>
                <Button                                
                  className="btn-danger btn-sm"                          
                  onClick={() => this.toggleModalDelete(item.id) } >
                  <i className="fas fa-trash" />
                </Button>
              </ButtonGroup>
            </td>          
          </tr>    
          ))}
        </tbody>
        }  
        </Table>

        <Modal
          modalClassName="modal-delete"
          isOpen={modalDelete}
          toggle={this.toggleModalDelete}
        >       
          <div className="modal-content">
            <h5 className="text-center">Eliminar ?</h5>                                        
            <ButtonGroup className="botones mb-2 nt">              
              <Button
              color="success"
              className="btn-sm btn"
              data-dismiss="modal"              
              onClick={this.handleDelete}
              >
                Aceptar
              </Button>              
              <Button
                color="info"
                className="btn-sm btn"
                data-dismiss="modal"                
                onClick={this.toggleModalDelete}
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
      ...clienteActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  clientes: state.clientes,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(TableUsers);