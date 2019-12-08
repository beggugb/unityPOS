
import Util from '../utils/Utils';

const util = new Util();

class RolController {
  
  static async getAllRols(req, res) {
    try {
      const allRols = await RolService.getAllRols();
      if (allRols.length > 0) {
        util.setSuccess(200, 'Rols retrieved', allRols);
      } else {
        util.setSuccess(200, 'No book found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addRol(req, res) {
    if (!req.body.name) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newRol = req.body;
    try {
      const createdRol = await RolService.addRol(newRol);
      util.setSuccess(201, 'Rol Added!', createdRol);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedRol(req, res) {
    const alteredRol = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateRol = await RolService.updateRol(id, alteredRol);
      if (!updateRol) {
        util.setError(404, `Cannot find book with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Rol updated', updateRol);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getARol(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theRol = await RolService.getARol(id);

      if (!theRol) {
        util.setError(404, `Cannot find book with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Rol', theRol);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteRol(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const bookToDelete = await RolService.deleteRol(id);

      if (bookToDelete) {
        util.setSuccess(200, 'Rol deleted');
      } else {
        util.setError(404, `Rol with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default RolController;