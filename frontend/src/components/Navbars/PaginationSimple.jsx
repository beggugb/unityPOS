import React from 'react'
import {
  Button,  
  Nav
} from "reactstrap";
function PaginationSimple ({makeHttpRequestWithPage,total,paginas,current,handlePagina,label}){    
return(     
          <Nav className="navbar navbar-expand">                                        
              <li className="nav-link">
                <Button className="nav-link btn-link text-white" onClick={() => makeHttpRequestWithPage(current)}>
                  <i className="fas fa-chevron-left"></i>
                </Button>
              </li>       
              <li className="lbl">
                {total} { label}
              </li>         
              <li className="nav-link">
                <Button className="nav-link btn-link text-white" onClick={() => makeHttpRequestWithPage(paginas)}>
                     <i className="fas fa-chevron-right" />
                </Button>   
              </li>  
          </Nav>         
  );
}
export default PaginationSimple