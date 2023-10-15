export default class UserSet {
    #users = []
    #id = 1

    addUserByName(userName) {
        const user = { userName, userId: this.#id++ }
        this.#users.push(user)

        return user
    }

    printUsers() {
        for (let index = 0; index < this.#users.length; index++) {
            console.log(this.#users[index])
        }
    }

    doesUserExist(userName) {
        for (let index = 0; index < this.#users.length; index++) {
            if (this.#users[index].userName === userName) {
                return true
            }
        }

        return false
    }

    getUserByName(userName) {
        for (let index = 0; index < this.#users.length; index++) {
            if (this.#users[index].userName === userName) {
                return this.#users[index]
            }
        }

        return null
    }

    anyUser() {
        return this.#users.length > 0
    }

    getUsers() {
        return this.#users
    }
}
