const initialState = { 
    data:[],    
    items:[],
    pagina:0,
    paginas:0,
    total:0,
    item:{
      id:'',
      name:'',
      address:'',
      phone:'',
      nit:''
    },
    modalRegister:false
} ;

export function clientes(state = initialState, action) {
  switch (action.type) {    
    case 'CLIENTE_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total
      };  
   
    case 'CLIENTE_MODAL_REGISTRO':
      return {                           
        ...state,
        modalRegister: action.state,
        item: initialState.item         
      };
    case 'CLIENTE_ITEM':
      return {                           
        ...state,     
        item: action.item   
      };  
    case 'CLIENTE_LISTA':
      return {                           
        ...state,     
        items: action.response.data
      };  
    case 'CLIENTE_RESET':
      return {                           
        data: [],
        items:[],
        item: initialState.item
      };  
    case 'CLIENTE_CHANGE':
      return {
        ...state,              
          item:
           {...state.item,                
             [action.props]: action.value 
           }
        }; 
    case 'CLIENTE_CREATE':
      return {                           
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total,
        modalRegister: false,
        item: initialState.item

      };    
    case 'CLIENTE_ITEM_MODAL':
      return {                           
        ...state,
        item: action.item,
        modalRegister: action.state 
      };                                                 
    default:
      return state
  }    
}
