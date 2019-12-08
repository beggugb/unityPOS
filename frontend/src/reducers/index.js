import { combineReducers } from 'redux'
import notifyReducer from 'react-redux-notify';
import { pendingTasksReducer } from 'react-redux-spinner'
import { users } from './users.reducers'
import { tasks } from './tasks.reducers'
import { categorias } from './categorias.reducers'
import { marcas } from './marcas.reducers'
import { tipos } from './tipos.reducers'
import { articulos } from './articulos.reducers'
import { cajas } from './cajas.reducers'
import { clientes } from './clientes.reducers'
import { ventas } from './ventas.reducers'
import { reportes } from './reportes.reducers'

const rootReducer = combineReducers({
  users,
  tasks,
  categorias,  
  marcas,
  tipos,  
  articulos,
  cajas,
  clientes,
  ventas,
  reportes,
  notifications: notifyReducer,
  pendingTasks: pendingTasksReducer
});

export default rootReducer;

