
import Util from '../utils/Utils';

const util = new Util();

class BranchController {
  
  static async getAllBranchs(req, res) {
    try {
      const allBranchs = await BranchService.getAllBranchs();
      if (allBranchs.length > 0) {
        util.setSuccess(200, 'Branchs retrieved', allBranchs);
      } else {
        util.setSuccess(200, 'No users found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addBranch(req, res) {
    if (!req.body.name) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newBranch = req.body;
    try {
      const createdBranch = await BranchService.addBranch(newBranch);
      util.setSuccess(201, 'Branch Added!', createdBranch);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedBranch(req, res) {
    const alteredBranch = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateBranch = await BranchService.updateBranch(id, alteredBranch);
      if (!updateBranch) {
        util.setError(404, `Cannot find book with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Branch updated', updateBranch);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getABranch(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theBranch = await BranchService.getABranch(id);

      if (!theBranch) {
        util.setError(404, `Cannot find book with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Branch', theBranch);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteBranch(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const bookToDelete = await BranchService.deleteBranch(id);

      if (bookToDelete) {
        util.setSuccess(200, 'Branch deleted');
      } else {
        util.setError(404, `Branch with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default BranchController;