import React from "react";
import { Card, CardBody } from 'reactstrap'
import Moment from 'react-moment'

const ViewTask = ({...props}) => (
    <Card className="card-author">
    <CardBody>          
            <div className="detalle text-center">                                  
            <p >Fecha Registro: <Moment format="DD/MM/YYYY">{props.task.start.createdAt}</Moment></p>                    
              <div className="texto">
              {props.task.title}
              </div>                            
            </div>
    </CardBody>    
    </Card>

 );

export default ViewTask
