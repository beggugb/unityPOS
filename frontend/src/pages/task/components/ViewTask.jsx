import React from "react";
import { ButtonGroup, Button } from 'reactstrap'

import Moment from 'react-moment'

const ModalTask = ({...props}) => (
  <>
  <div className="taskv">   
    <p className="tt">Tarea # { props.task.id }</p>
    <p className="tt"><Moment format="DD/MM/YYYY">{props.task.start}</Moment></p>
    <p className="tu">{ props.task.title }</p>    
  </div>
  <div className="taskb">   
    <ButtonGroup>
      <Button className="btn btn-sm btn-success"
      onClick={() => {props.handleMarcar(props.task)}} 
      >
      <i className="fas fa-check"/>
      {' '}
      Marcar tarea realizada
      </Button>      
    </ButtonGroup> 
  </div>
  </>
 );

export default ModalTask
