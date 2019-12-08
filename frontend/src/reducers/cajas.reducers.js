const initialState = { 
    data:[],    
    items:[],    
    pagina:0,
    paginas:0,
    total:0,
    item:{
      id:'',
      dateOpen:'2019-01-01',
      dateClose:null,
      montoInicial:0,
      montoIngreso:0,
      montoEgreso:0,
      montoFinal:0,
      open:true,
      userId:0,
      num:0,
      User:{
        id:'',
        name:''
      }

    },
    modalRegister:false,
    modalItem:false,
    modalInforme:false,
    modalRecibo:false,

} ;

export function cajas(state = initialState, action) {
  switch (action.type) {    
    case 'CAJA_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total
      };  
   
    case 'CAJA_MODAL_REGISTRO':
      return {                           
        ...state,
        modalRegister: action.state,
        item: initialState.item         
      };
    case 'CAJA_ITEM':
      return {                           
        ...state,     
        item: action.item   
      };  
    case 'CAJA_LISTA':
      return {                           
        ...state,     
        items: action.response.data
      };  
    case 'CAJA_RESET':
      return {                           
        data: [],
        items:[],
        item: initialState.item
      };  
    case 'CAJA_CHANGE':
      return {
        ...state,              
          item:
           {...state.item,                
             [action.props]: action.value 
           }
        }; 
    case 'CAJA_CREATE':
      return {                           
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total,
        modalRegister: false,
        item: initialState.item

      };    
    case 'CAJA_ITEM_MODAL':
      return {                           
        ...state,
        item: action.response.item,
        items:action.response.items,
        modalItem: action.state 
      };
    case 'CAJA_ITEMU_MODAL':
      return {                           
        ...state,
        item: action.item,
        items:action.items        
      };   
    case 'CAJA_ITEM_MODALS':
      return {                           
        ...state,        
        item: initialState.item,
        items:[],
        modalItem: action.state
      };

    case 'CAJA_ITEM_RECIBO':
      return {                           
        ...state,
        item: action.response.item,        
        modalRecibo: action.state 
      };
    case 'CAJA_ITEM_INFORME':
      return {                           
        ...state,
        item: action.response.item,
        items:action.response.items,
        modalInforme: action.state 
      };       
      case 'CAJA_ITEM_RECIBOS':
      return {                           
        ...state,
        item: initialState.item,
        items: [],
        modalRecibo: false
      };
    case 'CAJA_ITEM_INFORMES':
      return {                           
        ...state,
        item: initialState.item,
        items:[],
        modalInforme: false
      };

     case 'CAJA_ITEM_USER':
      return {                           
        ...state,
        item: action.item === null ? initialState.item :action.item
      };                                                  
    default:
      return state
  }    
}
