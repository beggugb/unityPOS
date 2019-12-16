import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { taskActions } from '../../../actions'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import ModalTask from './ModalTask'
import ViewTask from './ViewTask'
import { Modal } from "reactstrap";

class CalendarTask extends React.Component {    
constructor(props){
    super(props);
    this.state = {
      modalDelete: false,
      modalRegister: false,
      modalView: false,
      deleteId:0,
      fechaId:'',
      titulo:'' ,
      task: {            
          id:'',          
          userId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }    
    };
    this.handleSubmit = this.handleSubmit.bind(this);    
} 

componentDidMount() {
 
 this.props.taskData(this.props.users.user.id)
}

componentWillUnmount() {
  this.props.taskReset()
}

handleChange = async (event) => {
   const { name, value } = event.target; 
   const { task } = this.state
   await this.setState({
    task:{
      ...task,
      [name]: value
      }
   })
};

handleChanges = async (event) => {      
   const { task } = this.state
   await this.setState({
    task:{
      ...task,
      backgroundColor: event.value
      }
   })
};


toggleModalRegister = (arg) => {      
  this.setState({
    modalRegister: !this.state.modalRegister,
    fechaId: arg
  }); 
}

toggleModalView = (item) => {  
  if(this.state.modalView){
    this.setState({
    modalView: !this.state.modalView  ,
    task: {            
          id:'',          
          userId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }   
  }); 
  } else{  
    console.log(item.event)
    this.setState({
    modalView: !this.state.modalView,
    task: {
      id: item.event.id,
      title: item.event.title,
      start: item.event.start
    }
  });
  }   
};

handleSubmit(event){     
  let dato = this.state.task
  dato.userId = this.props.users.user.id    
  dato.start = this.state.fechaId.date
  dato.end = this.state.fechaId.date

  this.props.taskCreate(dato);
  this.setState({
    modalRegister: false,        
    fechaId:'',
     task: {            
          id:'',          
          userId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }
    
   })
  event.preventDefault();      
}

handleMarcar=(task)=>{
  let dato = task
  dato.classNames="tachado"
  dato.backgroundColor="#26e413"
  dato.userId = this.props.users.user.id
  this.props.taskUpdate(dato);
  this.setState({
    modalView: false,        
    fechaId:'',
     task: {            
          id:'',          
          userId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }
    
   })
}

render() {      
  const { modalRegister, modalView, task } = this.state
  const {data } = this.props.tasks      
    return (
      < >
    	<FullCalendar      
     		locales={[ esLocale]}  
     		locale= {'es'}
        timeZone={'America/La_Paz'}
        navLinks={true}
     		plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        defaultView="dayGridMonth"                
        header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
     		events= { data }         
        eventLimit={ true}
        dateClick={ this.toggleModalRegister}
        eventClick={this.toggleModalView}    
           
        /> 
      <Modal
        modalClassName="modal-task" 
        isOpen={modalRegister}
        toggle={this.toggleModalRegister} 
        >        
        <ModalTask        
        handleChange={this.handleChange}
        handleChanges={this.handleChanges}
        handleSubmit={ this.handleSubmit}
        task = {task}
        /> 
      </Modal>
      
      <Modal 
      modalClassName="modal-task"
      isOpen={modalView}
      toggle={this.toggleModalView} 
      > 
      <ViewTask
          task={task}   
          handleMarcar={ this.handleMarcar}            
        />          
      </Modal>

  </>  


    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...taskActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  tasks: state.tasks,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(CalendarTask);
