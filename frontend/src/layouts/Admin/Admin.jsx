import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../../actions'
import { Route, Switch } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AdminNavbar from "../../components/Navbars/AdminNavbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import logo from "../../assets/img/react-logo.png";
import { Notify } from 'react-redux-notify';
import Error from '../Error.jsx'
import Dashboard from "../../pages/dashboard/dashboard.jsx";
import Configuracion from "../../pages/configuracion/configuracion.jsx";
import Articulos from "../../pages/articulos/articulos.jsx";
import Categorias from "../../pages/categorias/categorias.jsx";
import Marcas from "../../pages/marcas/marcas.jsx";
import Tipos from "../../pages/tipos/tipos.jsx";
import Cajas from "../../pages/cajas/cajas.jsx";
import Clientes from "../../pages/clientes/clientes.jsx";
import Reportes from "../../pages/reportes/reportes.jsx";

import Ventas from "../../pages/ventas/ventas.jsx";


import { Spinner } from 'react-redux-spinner';
var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "primary",
      itemr:[],
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    this.cahrgeModule()
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    this.props.logout()
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  verificar = (component) =>{
 switch(component)
      {
        case "Dashboard":
        return Dashboard;
        case "Configuracion":
        return Configuracion; 
        case "Articulos":
        return Articulos; 
        case "Cajas":
        return Cajas;
        case "Ventas":
        return Ventas;
        case "Clientes":
        return Clientes;
        case "Reportes":
        return Reportes;                        
        default:
        return null;

      } 
}
cahrgeModule = () => {
    let items = [...this.state.itemr]     
    this.props.users.items.map((prop, key) => {                       
      var dato = {
        path : prop.path,        
        icon : prop.icon,
        component: this.verificar(prop.component),
        layout: prop.layout
       };                
      items.push(dato);  
      return null    
    });

    this.setState({
      itemr : items
    })    
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route            
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
 
  render() {
    const {itemr} = this.state         
    return (
      <>
        <div className="wrapper">
         
          <Sidebar
            {...this.props}     
            routes={itemr}       
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "https://www.beggu.net/",
              text: "UNITY",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
          <Spinner config={{ trickleRate: 3 }} />
          <Notify />
            <AdminNavbar
              {...this.props}              
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

          <Switch>
            {this.getRoutes(itemr)}     
             <Route path="/admin/categorias" component={Categorias} />
             <Route path="/admin/tipos" component={Tipos} />
             <Route path="/admin/marcas" component={Marcas} />                                
            <Route component={Error} />                   
          </Switch>
           
            
          </div>
        </div>     
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
       ...userActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(Admin);