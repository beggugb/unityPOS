import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Task, User } = model;

class TaskController {  
  static getAllTasks(req, res) {
    return Task
    .findAndCountAll({
        hierarchy: true,                
        order: ['title'],
        where: { userId: Number(req.params.user) }         
      })
    .then(tasks => res.status(200).send({'data': tasks.rows }))
    .catch(error => res.status(400).send(error));
  }

  static addTask(req, res) {

    if (!req.body.title) {      
      res.status(400).send({'message':'Please provide complete details'})
    }else{
      const newTask = req.body
      const userId  = 1     
      return Task
        .create(newTask)
        .then(task => 
           Task
             .findAll({  where: { userId: userId }})
              .then(tasks => res.status(200).send({'message':'List Task ','data':tasks}))
              .catch(error => res.status(400).send(error))
          )
        .catch(error => res.status(400).send(error));
    }
  }
  
  static updatedTask(req, res) {
 
    const upTask = req.body;    
    const {userId} = req.body;    
    const { id } = req.params;    
    if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Task
        .update(upTask, { where: { id: Number(id) }})
        .then(user => 
            Task
             .findAll({  where: { userId: userId }})
              .then(tasks => res.status(200).send({'message':'List Task ','data':tasks}))
              .catch(error => res.status(400).send(error))
          ) 
        .catch(error => res.status(400).send(error))    
      }
    }    
  

  static  getATask(req, res) {
    const { id } = req.params;    
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Task
        .findOne({  where: { id: id }, include: [{ model: Rol, attributes: ['name']}]})
        .then(userTask => {
          if(!userTask){
            res.status(404).send({'message':`Task with the id ${id} cannot be found`})
          }
          else{
            res.status(200).send({'user':userTask})
          }   
          } )  
        .catch(error => res.status(400).send(error))    
      }  
  }

  static deleteTask(req, res) {
    const { id } = req.params;
     if (!Number(id)) {      
        res.status(400).send({'message':'Please input a valid numeric value'})
     }else{
        return Task
            .findOne({ where: { id: Number(id) }})
            .then(task =>
              Task
                .destroy({ where: { id: Number(id) }})
                .then(tas =>
                  Task
                    .findAll({  where: { userId: task.userId }})
                    .then(tasks => res.status(200).send({'message':'Lista tasks','data':tasks}))
                    .catch(error => res.status(400).send(error))
                  )
            )

        .catch(error => res.status(400).send(error))    
      }  
  }  

}

export default TaskController;