const prompt = require('prompt-sync')({sigint: true})
const {v4: uuidv4} = require('uuid');

function app() {
    var users = []
    var companies = []
    var running = true

    while (running) {
        console.log("What would you like to do?")
        console.log("Press 1 to add a user")
        console.log("Press 2 to add a company")
        console.log("Press 3 to exit")

        const choice = prompt()
        if (choice === "1") {
            const userName = prompt("Enter a username: ")
            const isUniqueName = !users.some(user => user.userName === userName);

            if (isUniqueName) {
                const userId = uuidv4();
                users.push({userName, userId})
            } else {
                console.log("Username already exists, please try again");
            }

        } else if (choice === "2") {
            var companyName = prompt("Enter company name: ")
            var companyId = 1
            companies.push({companyName, companyId})
        } else if (choice === "3") {
            running = false
        }
    }
}

app()