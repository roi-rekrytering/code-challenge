export default class UserCompanyAssociation {
    #association = []

    attachUserToCompany(userId, companyId) {
        if (this.hasCompanyAssociation(companyId)) {
            for (let index = 0; index < this.#association.length; index++) {
                if (this.#association[index].companyId === companyId) {
                    if (this.#association[index].users.includes(userId)) {
                        return false
                    }
                    this.#association[index].users.push(userId)
                }
            }
        } else {
            this.#association.push({ companyId, users: [userId] })
        }

        return true
    }

    hasCompanyAssociation(companyId) {
        for (let index = 0; index < this.#association.length; index++) {
            if (this.#association[index].companyId === companyId) {
                return true
            }
        }

        return false
    }

    printAllAssociations() {
        for (let index = 0; index < this.#association.length; index++) {
            console.log(this.#association[index])
        }
    }

    getAssociations() {
        return this.#association
    }
}
