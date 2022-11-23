const prompt = require('prompt-sync')({sigint: true})
const {v4: uuidv4} = require('uuid');

const selectFromList = (type, list) => {
    let index = undefined;
    let selected = false;

    list.forEach((user, index) => console.log(`${index + 1}: ${user[`${type}Name`]}`));

    while (!selected) {
        const value = prompt(`Select ${type} (By number): `);

        if (Number(value) && value <= list.length) {
            index = value - 1;
            selected = true;
        } else {
            console.log(`You have not selected a correct ${type}`);
        }
    }
    return list[index];
}

function app() {
    let users = []
    let companies = []
    let running = true

    while (running) {
        console.log()
        console.log("What would you like to do?")
        console.log("Press 1 to add a user")
        console.log("Press 2 to add a company")
        console.log("Press 3 to add user to a company")
        console.log("Press 4 to see listed users and companies")
        console.log("Press 5 to exit")

        const choice = prompt()
        switch (choice) {
            case "1": {
                const userName = prompt("Enter a username: ");
                const isUniqueName = !users.some(user => user.userName === userName);

                if (isUniqueName) {
                    const userId = uuidv4();
                    users.push({userName, userId});
                } else {
                    console.log("Username already exists, please try again");
                }
                break;
            }
            case "2": {
                const companyName = prompt("Enter company name: ");
                const companyId = uuidv4();

                companies.push({companyName, companyId});
                break;
            }
            case "3": {
                if (users.length && companies.length) {

                    const user = selectFromList("user", users);
                    const company = selectFromList("company", companies);

                    company.users = [...company.users || [], user];

                    console.log(`${user.userName} added to ${company.companyName}`);
                    console.log();
                } else {
                    !users.length && console.log("No existing users");
                    !companies.length && console.log("No existing companies");
                }
                break;
            }
            case "4": {
                console.log("##### USERS #####");
                users.forEach(user => console.log(`${user.userName}`));

                console.log("##### COMPANIES #####");
                companies.forEach(company => {
                    console.log(company.companyName);
                    company.users && console.log(`Users: ${company.users.map(user => user.userName).join(", ")}`);
                })
                break;
            }
            case "5": {
                running = false;
                break;
            }
        }
    }
}

app()