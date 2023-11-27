const controllerLib = require('./controller');
const NameCollection = require('./models/namemap');
const relationLib = require('./models/relation');
const {
  getMenuInput,
  printMenu,
} = require('./utils');
const strings = require('./strings');

function app () {
  const users = new NameCollection();
  const companies = new NameCollection();
  const relations = new relationLib();
  const controller = controllerLib(users, companies, relations);
  const options = [
    {
      text: strings.MENU_ITEM_ADD_USER,
      exec: controller.addUser,
    },
    {
      text: strings.MENU_ITEM_ADD_COMPANY,
      exec: controller.addCompany,
    },
    {
      text: strings.MENU_ITEM_ATTACH_USER_TO_COMPANY,
      exec: controller.attachUserToCompany
    },
    {
      text: strings.MENU_ITEM_LIST_USERS,
      exec: controller.listUsers,
    },
    {
      text: strings.MENU_ITEM_LIST_COMPANIES,
      exec: controller.listCompanies,
    },
    {
      text: strings.MENU_ITEM_LIST_COMPANIES_USERS,
      exec: controller.listRelations,
    },
    {
      text: strings.MENU_ITEM_EXIT,
      exec: controller.doExit,
    },
  ];

  while (controller.isRunning()) {
    printMenu(options);
    getMenuInput(controller, options);
  }
}

app();
