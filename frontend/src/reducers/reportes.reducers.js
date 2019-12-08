import React from 'react'
import ReporteVentas from '../pages/reportes/components/ReporteVentas'
import ReporteArticulos from '../pages/reportes/components/ReporteArticulos'
import ReporteCajas from '../pages/reportes/components/ReporteCajas'
import ReporteCompras from '../pages/reportes/components/ReporteCompras'
import ReportePagos from '../pages/reportes/components/ReportePagos'
const initialState = {          
        items: [],
        item:{
          tipo:'0',
          desde:'',
          hasta:'',
          stock:true,
          minimos:false,
          saldo:true,
          categoriaId:0,
          categoria:''
        },
        total:0,
        cantidad:0,
        suma:0,
        busqueda:false,
        report:null
                     
 };

export function reportes(state = initialState, action) {
  switch (action.type) {    
    case 'REPORTE_VENTAS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          item: action.item,
          busqueda:true,
          report:<ReporteVentas/>
      };  
      case 'REPORTE_ARTICULOS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          item: action.item,
          busqueda:true,
          report:<ReporteArticulos/>
      };   
      case 'REPORTE_CAJAS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          suma: action.suma,
          item: action.item,
          busqueda:true,
          report:<ReporteCajas/>
      }; 
      case 'REPORTE_COMPRAS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          busqueda:true,
          item: action.item,
          report:<ReporteCompras/>
      }; 
      case 'REPORTE_PAGOS_LIST':
      return {                   
        ...state,
          items: action.data,          
          cantidad: action.cantidad,
          busqueda:true,
          suma: action.suma,
          item: action.item,
          report:<ReportePagos/>
      };
      case 'REPORTE_RESET':
      return {                   
        ...state,
          items: [],
          item: initialState.item,
          cantidad: 0
      };  
      case 'REPORTE_CHANGE':
      return {
        ...state,              
          item:
          {...state.item,                
            [action.props]: action.value 
          }
      };  
    default:
      return state
  }
}