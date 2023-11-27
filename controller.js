const utils = require('./utils');
const strings = require('./strings');
const input = require('./input');

module.exports = function (users, companies, relations) {
  let running = true;

  const controller = {};
 
  controller.addUser = () => {
    return users.add(input.getInput(strings.ENTER_USERNAME));
  }

  controller.addCompany = () => {
    return companies.add(input.getInput(strings.ENTER_COMPANY));
  }

  controller.attachUserToCompany = () => {
    const companyId = utils.getNameId(companies, strings.COMPANY_NAME);
    if (companyId === -1) {
      return false;
    }
    const userId = utils.getNameId(users, strings.USER_NAME);
    if (userId === -1) {
      return false;
    }
    relations.add(companyId, userId); 
  }

  controller.listUsers = () => {
    users.list();
  }

  controller.listCompanies = () => {
    companies.list();
  }

  controller.listRelations = () => {
    relations.get().forEach(function (userIds, companyId, map) {
      console.log(companies.getById(companyId));
      console.log(strings.LIST_RELATIONS_USERS);;
      userIds.forEach(function (userId) {
        console.log(`\t${users.getById(userId)}`);
      });
    });
  }

  controller.isRunning = () => {
    return running;
  }

  controller.doExit = () => {
    running = false;
  }

  return controller;
}
