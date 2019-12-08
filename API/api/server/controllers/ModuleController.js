
import Util from '../utils/Utils';

const util = new Util();

class ModuleController {
  
  static async getAllModules(req, res) {
    try {
      const allModules = await ModuleService.getAllModules();      
      if (allModules.length > 0) {
        util.setSuccess(200, 'Modules retrieved', allModules);
      } else {
        util.setSuccess(200, 'No users found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addModule(req, res) {
    if (!req.body.name) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newModule = req.body;
    try {
      const createdModule = await ModuleService.addModule(newModule);      
      util.setSuccess(201, 'Module Added!', createdModule);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedModule(req, res) {
    const alteredModule = req.body;
    const newpassword = bcrypt.hashSync(alteredModule.password, bcrypt.genSaltSync(10), null);    
    alteredModule.password = newpassword;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateModule = await ModuleService.updateModule(id, alteredModule);
      if (!updateModule) {
        util.setError(404, `Cannot find book with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Module updated', updateModule);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAModule(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {      
      const theModule = await ModuleService.getAModule(id);      

      if (!theModule) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Module', theModule);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteModule(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const bookToDelete = await ModuleService.deleteModule(id);

      if (bookToDelete) {
        util.setSuccess(200, 'Module deleted');
      } else {
        util.setError(404, `Module with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }


}

export default ModuleController;