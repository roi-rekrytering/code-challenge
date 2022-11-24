import {v4 as uuidv4} from "uuid";
import {printMessage} from "../helpers/print-helper.js";

const createCompany = (companies, companyName) => {
    const isUniqueName = !companies.some(user => user.companyName === companyName);

    if (!isUniqueName) {
        throw new Error("Company name already exists, please try again");
    }

    const companyId = uuidv4();
    companies.push({companyName, companyId});
}

const addUserToCompany = (company, user) => {
    company.users = [...company.users || [], user];
    printMessage(`${user.userName} added to ${company.companyName}`);
}

export {createCompany, addUserToCompany}