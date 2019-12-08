const initialState = { 
    data:[],
    item:{}
} ;

export function tasks(state = initialState, action) {
  switch (action.type) {    
    case 'TASK_DATA':
      return {                   
        ...state,
        data: action.data
      };  
    case 'TASK_RESET':
      return {                           
        data: []
      };                                            
    default:
      return state
  }    
}

