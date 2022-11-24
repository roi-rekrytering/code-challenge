const printMenu = () => {
    console.log();
    console.log("What would you like to do?");
    console.log("Press 1 to add a user");
    console.log("Press 2 to add a company");
    console.log("Press 3 to add user to a company");
    console.log("Press 4 to see listed users and companies");
    console.log("Press 5 to exit");
}

const printUserAndCompanies = (users, companies) => {
    console.log("##### USERS #####");
    users.forEach(user => console.log(`${user.userName}`));

    console.log("##### COMPANIES #####");
    companies.forEach(company => {
        console.log(company.companyName);
        company.users && console.log(`# Users: ${company.users.map(user => user.userName).join(", ")}`);
    })
}

const printSelections = (list, type) => {
    list.forEach((user, index) => {
        const selectionNumber = index + 1;
        const userName = user[`${type}Name`];

        console.log(`${selectionNumber}: ${userName}`)
    });
}

const printMessage = message => {
    console.log(message);
    console.log();
}

export {printMenu, printUserAndCompanies, printSelections, printMessage};