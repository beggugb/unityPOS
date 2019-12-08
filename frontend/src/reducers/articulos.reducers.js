const initialState = { 
    data:[],    
    pagina:0,
    paginas:0,
    total:0,
    item:{
        id:'',
        name:'',
        code:'', 
        variant:'', 
        vol:0,
        brt:0,
        net:0,
        psale:0, 
        filename:'product-default.jpg', 
        pdesc:0,
        ofert:false, 
        desc: 0,
        description:'',
        inStock:false,
        stock:0,
        minim:0,
        inCatalog:false,
        dest:false,
        origin:'',
        purchase:0,
        reposic:0,
        typeId:1,
        categoryId:1,
        markId:1,
        Category:{
          id:0,
          name:''
        },
        Type:{
          id:0,
          name:''
        },
        Mark:{
          id:0,
          name:''
        }
      },
    modalRegister:false,
    modalImagen:false,
    modalView:false,
} ;

export function articulos(state = initialState, action) {
  switch (action.type) {    
    case 'ARTICULO_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total
      };  
    case 'ARTICULO_MODAL_REGISTRO':
      return {                           
        ...state, 
        modalRegister: action.state,
        item: initialState.item     
      };
    case 'ARTICULO_RESET':
      return {                           
        ...state,
        data: [],
        item: initialState.item
      };
    case 'ARTICULO_CREATE':
      return {                           
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total,
        modalRegister: false,
        modalImagen: false,
        item: initialState.item

      };    
    case 'ARTICULO_ITEM':
      return {                           
        ...state,
        item: action.item,
        modalRegister: action.state 
      };
    case 'ARTICULO_ITEM_VIEW':
      return {                           
        ...state,
        item: action.item,
        modalView: action.state 
      };  
    case 'ARTICULO_ITEM_VIEWS':
      return {                           
        ...state,
        item: initialState.item,
        modalView: false
      };    
    case 'ARTICULO_IMAGEN':
      return {                           
        ...state,
        item: action.item,
        modalImagen: action.state 
      };  
    case 'ARTICULO_ITEM_CODE':
      return {                           
        ...state,
        item: action.item === null ? initialState.item : action.item
      };    
    case 'ARTICULO_CHANGE':
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
