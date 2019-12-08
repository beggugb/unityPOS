
import Util from '../utils/Utils';

const util = new Util();

class CompanyController {
  
  static async getAllCompanys(req, res) {
    try {
      const allCompanys = await CompanyService.getAllCompanys();
      if (allCompanys.length > 0) {
        util.setSuccess(200, 'Companys retrieved', allCompanys);
      } else {
        util.setSuccess(200, 'No book found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addCompany(req, res) {
    if (!req.body.name) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newCompany = req.body;
    try {
      const createdCompany = await CompanyService.addCompany(newCompany);
      util.setSuccess(201, 'Company Added!', createdCompany);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedCompany(req, res) {
    const alteredCompany = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateCompany = await CompanyService.updateCompany(id, alteredCompany);
      if (!updateCompany) {
        util.setError(404, `Cannot find book with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Company updated', updateCompany);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getACompany(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theCompany = await CompanyService.getACompany(id);

      if (!theCompany) {
        util.setError(404, `Cannot find book with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Company', theCompany);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteCompany(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const bookToDelete = await CompanyService.deleteCompany(id);

      if (bookToDelete) {
        util.setSuccess(200, 'Company deleted');
      } else {
        util.setError(404, `Company with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default CompanyController;