import {printSelections} from "./print-helper.js";
import {createUser} from "../modules/user.js";
import {addUserToCompany, createCompany} from "../modules/company.js";

const validSelection = (value, type, listLength) => {
    if (!(Number(value) && value <= listLength)) {
        throw new Error(`You have not selected a correct ${type}`);
    }
    return value - 1;
}

const selectFromList = (type, list, prompt) => {
    let index = null;

    if (!list.length) {
        throw new Error(`No existing ${type}`);
    }

    printSelections(list, type)

    while (index === null) {
        try {
            const value = prompt(`Select ${type} (By number): `);
            index = validSelection(value, type, list.length);
        } catch (error) {
            console.log(error.message);
        }
    }
    return list[index];
};

const promptCreateUser = (users, prompt) => {
    try {
        const userName = prompt("Enter a username: ");
        createUser(users, userName);
    } catch (error) {
        console.log(error.message);
    }
}

const promptCreateCompany = (companies, prompt) => {
    try {
        const companyName = prompt("Enter company name: ");
        createCompany(companies, companyName);
    } catch (error) {
        console.log(error.message);
    }
}

const promptAddUserToCompany = (users, companies, prompt) => {
    try {
        const user = selectFromList("user", users, prompt);
        const company = selectFromList("company", companies, prompt);

        if (user && company) {
            addUserToCompany(company, user);
        }
    } catch (error) {
        console.log(error.message);
    }
}

export {selectFromList, promptCreateUser, promptCreateCompany, promptAddUserToCompany};