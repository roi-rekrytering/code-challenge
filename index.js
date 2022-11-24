import promptSync from 'prompt-sync';
import {printMenu, printUserAndCompanies} from "./helpers/print-helper.js";
import {
    promptAddUserToCompany,
    promptCreateCompany,
    promptCreateUser,
} from "./helpers/prompt-helper.js";

const prompt = promptSync({sigint: true});

const CHOICES = {
    CREATE_USER: "1",
    CREATE_COMPANY: "2",
    ADD_USER_TO_COMPANY: "3",
    PRINT: "4",
    EXIT: "5",
};

const app = () => {
    const users = [];
    const companies = [];
    let running = true;

    while (running) {
        printMenu();

        const choice = prompt();
        switch (choice) {
            case CHOICES.CREATE_USER: {
                promptCreateUser(users, prompt);
                break;
            }
            case CHOICES.CREATE_COMPANY: {
                promptCreateCompany(companies, prompt);
                break;
            }
            case CHOICES.ADD_USER_TO_COMPANY: {
                promptAddUserToCompany(users, companies, prompt);
                break;
            }
            case CHOICES.PRINT: {
                printUserAndCompanies(users, companies);
                break;
            }
            case CHOICES.EXIT: {
                running = false;
                break;
            }
        }
    }
};

app();