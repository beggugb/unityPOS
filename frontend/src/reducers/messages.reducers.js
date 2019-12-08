const initialState = { 
    data:[],
    item:{},
    tipo:'recibido',
    pagina:0,
    paginas:0,
    total:0,
    modalEdit:false,
    modalView:false,   
    totales:0 
} ;

export function messages(state = initialState, action) {
  switch (action.type) {    
    case 'MESSAGE_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,    
        totales: action.response.pendientes,    
        tipo: 'recibido',
        modalEdit: false,
        
      };
    case 'MESSAGE_MODAL_REGISTRO':
      return {                   
        ...state,
        modalEdit: action.estado
      };
    case 'MESSAGE_CREATE':
      return {                   
        ...state,
        modalEdit: false
      };                                  
    case 'MESSAGE_RESET':
      return {                           
        data: []
      };                                              
    default:
      return state
  }    
}

