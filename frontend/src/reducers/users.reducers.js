let user  = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));
let items = JSON.parse(localStorage.getItem('items'));
let data = [];
let userId = 0;
let name = '';
const initialState = user ? { modalRegister:false, total:0, pagina:0, paginas:0, loggedIn: true, user, token, items, data, userId, name } : {data, userId, name};

export function users(state = initialState, action) {
  switch (action.type) {    
    case 'LOGIN_SUCCESS':
      return { 
          loggingIn: true,
          user: action.user,
          items: action.items

      };
    case 'LOGIN_USER':
      return {           
          ...state
      };
    case 'LOGIN_LOGOUT':
      return {           
          user: {},
          token:{},
          items:[]
      };  
    case 'USER_DATA_LIST':
      return {                   
        ...state,
        data: action.data
      };   
    case 'USER_SET_ID':
      return {                   
        ...state,
        userId: action.user.id,
        name: action.user.name

      }; 
    case 'USER_RESET':
      return {           
         userId: 0,
         name:'',
         data:[]
      };   
     case 'USER_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total
      };  
   
    case 'USER_MODAL_REGISTRO':
      return {                           
        ...state,
        modalRegister: action.state,
        item: initialState.item         
      };
    case 'USER_ITEM':
      return {                           
        ...state,     
        item: action.item   
      };  
    case 'USER_LISTA':
      return {                           
        ...state,     
        items: action.response.data
      };    
    case 'USER_CHANGE':
      return {
        ...state,              
          item:
           {...state.item,                
             [action.props]: action.value 
           }
        }; 
    case 'USER_CREATE':
      return {                           
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total,
        modalRegister: false,
        item: initialState.item

      };    
    case 'USER_ITEM_MODAL':
      return {                           
        ...state,
        item: action.item,
        modalRegister: action.state 
      };                                          
    default:
      return state
  }
}

