const initialState = { 
    data:[],    
    items:[],
    pagina:0,
    paginas:0,
    total:0,
    item:{
      'id':'',
      'orden':'0',
      'type':'terminal',
      'estate':'pendiente',
      'cant':0,
      'total':0,
      'mesaId':null,
      'userId':0,
      'clientId':0
    },
    modalRegister:false,
    modalPagar:false,
    sumaTotal:0,
    cantidadTotal:0,
    dato:{},
    inter:0
} ;

export function ventas(state = initialState, action) {
  switch (action.type) {    
    case 'VENTA_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total
      };  
   
    case 'VENTA_MODAL_PAGAR':
      return {                           
        ...state,
        modalPagar: action.state,
        item: initialState.item         
      };
    case 'VENTA_ITEM':
      return {                           
        ...state,     
        item: action.item   
      };  
    case 'VENTA_LISTA':
      return {                           
        ...state,     
        items: action.response.data
      };  
    case 'VENTA_RESET':
      return {                           
        data: [],
        items:[],
        item: initialState.item
      };  
    case 'VENTA_CHANGE':
      return {
        ...state,              
          item:
           {...state.item,                
             [action.props]: action.value 
           }
        }; 
    case 'VENTA_CREATE':
      return {                           
        ...state,                
        modalPagar: false,
        item: initialState.item,
        items:[],
        sumaTotal:0,
        cantidadTotal:0


      };    
    case 'VENTA_ITEM_MODAL':
      return {                           
        ...state,
        item: action.item,
        modalRegister: action.state 
      };   
    case 'VENTA_DIRECTA_LISTA': 
        return {            
         ...state,
          items: action.items,
          sumaTotal: action.suma,
          cantidadTotal: action.cantidad,
          dato:{},
          inter:0  
        };  
      case "VENTA_SET": 
        return {  
        ...state,                   
          dato:action.dato,
          inter:action.inter
        };                                                 
    default:
      return state
  }    
}
