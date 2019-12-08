import React from 'react'
import {
  Button,  
  Nav
} from "reactstrap";
import Select from 'react-select'
import { stylesErp } from '../../helpers'

const options =[{"value":12,"label":"12"},
                {"value":18,"label":"18"},
                {"value":20,"label":"20"},
                {"value":25,"label":"25"}
               ];

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}
function Pagination ({makeHttpRequestWithPage,total,paginas,current,handlePagina,pagina}){
    let renderPageNumbers;
   const pageNumber = [];
    if (total !== null){
      for(let i = 1; i <= paginas; i++){
        pageNumber.push(i);
      }
      renderPageNumbers = pageNumber.map(number =>{
        let classes = current === number ? 'nav-pag': 'nav-pag disabled';

         if (number === 1 || number === total || (number >= current - 2 && number <= current + 2)) {
                return (
                  <button key={number} className={classes} onClick={() => makeHttpRequestWithPage(number,pagina)}>{number}</button>
                );
            }else{ return null;}
      });
    }
return(     
          <Nav className="navbar navbar-expand">                          
              <li className="nav-link">Nro. Items :</li>
              <li className="nav-link">
                <Select                                                               
                  name="pagina"                        
                  options={options}                                
                  value={defaultVal(options,pagina)} 
                  styles={stylesErp}                                                                                                 
                  onChange={handlePagina('pagina')}
                />
              </li>              
              <li className="nav-link">
                <Button className="nav-link btn-link " onClick={() => makeHttpRequestWithPage(1,pagina)}>
                  <i className="fas fa-chevron-left"></i>
                </Button>
              </li>  
              <li className="nav-link">
                { renderPageNumbers }
              </li>  
              <li className="nav-link">
                <Button className="nav-link btn-link" onClick={() => makeHttpRequestWithPage(paginas,pagina)}>
                     <i className="fas fa-chevron-right" />
                </Button>   
              </li>  
              <li className="nav-link pull-right">página  { current } de { paginas } </li>            
              <li className="nav-link ml-2"><b>Total: { total } items</b></li>
          </Nav>         
  );
}
export default Pagination