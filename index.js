import { default as prmpt } from 'prompt-sync'
import UserSet from './UserSet.js'
import CompanySet from './CompanySet.js'
import UserCompanyAssociation from './UserCompanyAssociation.js'

function app() {

  const userSet = new UserSet()
  const companySet = new CompanySet()
  const association = new UserCompanyAssociation()
  const USERS = '--- Users'
  const COMPANIES = '--- Companies'
  const ENTER_A_USERNAME = "Enter a username: "
  const ENTER_A_COMPANY_NAME = "Enter a company name: "
  const ALL_ASSOCIATIONS_OF_USERCOMPANY = '--- all associations of user-company'
  const prompt = prmpt({ sigint: true })
  let running = true

  while (running) {
    console.log("What would you like to do?")
    console.log("   Press 1 to add a user")
    console.log("   Press 2 to add a company")
    console.log("   Press 3 to exit")
    console.log("   Press 4 to attach a user to a company")
    console.log("   Press 5 to list users and companies")
    console.log("   Press 6 to list all associations of user-company")
    let choice = prompt()

    switch (choice) {
      case '1':
        let userName = prompt(ENTER_A_USERNAME).trim()
        while (userName.length < 1) {
          userName = prompt(ENTER_A_USERNAME).trim()
        }
        if (userSet.doesUserExist(userName)) {
          console.error('--- The user with that name exists. Please, enter another one!')
          break
        }
        userSet.addUserByName(userName)
        break
      case '2':
        let companyName = prompt(ENTER_A_COMPANY_NAME).trim()
        while (companyName.length < 1) {
          companyName = prompt(ENTER_A_COMPANY_NAME).trim()
        }
        companySet.addCompanyByName(companyName)
        break
      case '3':
        running = false
        break
      case '4':
        if (!userSet.anyUser() && !companySet.anyCompany()) {
          console.log('--- Please, add a user and a company first!')
          break
        }
        if (!userSet.anyUser()) {
          console.log('--- Please, add a user first to attach her to a company!')
          break
        }
        if (!companySet.anyCompany()) {
          console.log('--- Please, add a company first to attach a user to it!')
          break
        }

        console.log(USERS)
        userSet.printUsers()
        console.log(COMPANIES)
        companySet.printCompanies()

        let uName = prompt(ENTER_A_USERNAME).trim()
        while (!userSet.doesUserExist(uName)) {
          console.log('Please, enter a correct user name!')
          uName = prompt(ENTER_A_USERNAME).trim()
        }

        let cName = prompt(ENTER_A_COMPANY_NAME).trim()
        while (!companySet.doesCompanyExist(cName)) {
          console.log('Please, enter a correct company name!')
          cName = prompt(ENTER_A_COMPANY_NAME).trim()
        }

        let user = userSet.getUserByName(uName)
        let company = companySet.getCompanyByName(cName)

        const result = association.attachUserToCompany(user.userId, company.companyId)
        if (!result) {
          console.log(`--- You already attached ${user.userName} to ${company.companyName}.`)
        }

        console.log(ALL_ASSOCIATIONS_OF_USERCOMPANY)
        association.printAllAssociations()
        break
      case '5':
        console.log(USERS)
        userSet.printUsers()
        console.log(COMPANIES)
        companySet.printCompanies()
        break
      case '6':
        console.log(ALL_ASSOCIATIONS_OF_USERCOMPANY)
        association.printAllAssociations()
        break
      default:
        console.log('--- Please, enter a number between 1 and 6')
    }
  }
}

app()