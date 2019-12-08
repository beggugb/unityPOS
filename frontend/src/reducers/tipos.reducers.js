const initialState = { 
    data:[],    
    items:[],
    pagina:0,
    paginas:0,
    total:0,
    item:{
      id:'',
      name:'',
      code:''
    },
    modalRegister:false
} ;

export function tipos(state = initialState, action) {
  switch (action.type) {    
    case 'TIPO_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total
      };  
   
    case 'TIPO_MODAL_REGISTRO':
      return {                           
        ...state,
        modalRegister: action.state,
        item: initialState.item         
      };
    case 'TIPO_ITEM':
      return {                           
        ...state,     
        item: action.item   
      };  
    case 'TIPO_LISTA':
      return {                           
        ...state,     
        items: action.response.data
      };  
    case 'TIPO_RESET':
      return {                           
        data: [],
        items:[],
        item: initialState.item
      };  
    case 'TIPO_CHANGE':
      return {
        ...state,              
          item:
           {...state.item,                
             [action.props]: action.value 
           }
        }; 
    case 'TIPO_CREATE':
      return {                           
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total,
        modalRegister: false,
        item: initialState.item

      };    
    case 'TIPO_ITEM_MODAL':
      return {                           
        ...state,
        item: action.item,
        modalRegister: action.state 
      };                                                 
    default:
      return state
  }    
}
