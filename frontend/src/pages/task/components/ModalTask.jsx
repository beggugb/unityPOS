import React from "react";
import { Form, Label, ButtonGroup, Button, Input, FormGroup } from 'reactstrap'
import Select from 'react-select'
import { stylesErp } from '../../../helpers'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const importancia =[{"value":"#1da1f2","label":"Normal"},
                    {"value":"#fd5d93","label":"Urgente"}                    
                 ];

const ModalTask = ({...props}) => (
   <>
  <div className="taskv">   
    <Form onSubmit={ props.handleSubmit}>        
      <FormGroup>        
      <Label for="title">Tarea</Label>
        <Input                            
          type="textarea"          
          name="title"                            
          value={ props.task.title }
          onChange={(e) => {props.handleChange(e)}}          
          required
        />
        </FormGroup>   
        <FormGroup>
              <Label for="backgroundColor">Importancia</Label>
              <Select                                                               
                  name="backgroundColor"                        
                  options={importancia}                                
                  value={defaultVal(importancia,props.task.backgroundColor)}                             
                  styles={stylesErp}                                                                               
                  onChange={(e) => {props.handleChanges(e)}}          
                />
            </FormGroup>      
       <ButtonGroup className="botones mb-2 text-center">              
        <Button          
          className="btn-sm btn-success btn"
          data-dismiss="modal"              
          onClick={props.handleSubmit}>
          <i className="fas fa-save"/>
      {' '}
          Registrar</Button>              
   
      </ButtonGroup>
    </Form>  
  </div>  
  </>
 );

export default ModalTask
