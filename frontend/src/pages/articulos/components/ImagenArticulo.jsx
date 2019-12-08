import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { articuloActions } from '../../../actions'
import { apiErp } from '../../../helpers'
import { Label, FormGroup, ButtonGroup, Button, Row, Col } from "reactstrap";

class ArticuloImagen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
            file: '',
    				imagePreviewUrl:''
    			};
  }

   componentDidMount() { 
    this.setState({
        file: '',
        imagePreviewUrl: ''
      })
  }

  _handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);         
    this.props.articuloUpload(formData,this.props.articulos.item.id); 
    this.setState({
        file: '',
        imagePreviewUrl: ''
      });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {    
    const {imagePreviewUrl, file } = this.state;
    const { item } = this.props.articulos
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img alt="preview" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<img alt="articulo" className="img-responsive" src={apiErp + '/static/images/articulos/lg/'+ item.filename }/>);
    }    
    return (
      <div className="previewComponent">         
      <div className="row">
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
      <div className="row">       
      <form onSubmit={(e)=>this._handleSubmit(e)}>                        
        <Row className="crl">
        <Col className="imga">
        <FormGroup className="frmi">          
         <input type="file" 
         id="file" 
         name="formData"
         onChange={(e)=>this._handleImageChange(e)} />
         <Label for="file">seleccionar archivo</Label>          
        </FormGroup>   
        </Col>
        </Row>
        { file && this.props.articulos.item.id ?
        <Row className="crl">
        <Col className="imga">        
        <ButtonGroup>
          <Button
            className="submitButton btn-success" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>
            Cargar Imagen
          </Button>
        </ButtonGroup>
        </Col>
        </Row>
        : null}
      </form>
      </div>  
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...articuloActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  articulos: state.articulos
});

export default connect(mapStateToProps,mapDispatchToProps)(ArticuloImagen);
