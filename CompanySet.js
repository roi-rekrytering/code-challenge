export default class CompanySet {
    #companies = []
    #id = 1

    addCompanyByName(companyName) {
        const company = { companyName, companyId: this.#id++ }
        this.#companies.push(company)

        return company
    }

    printCompanies() {
        for (let index = 0; index < this.#companies.length; index++) {
            console.log(this.#companies[index])
        }
    }

    doesCompanyExist(companyName) {
        for (let index = 0; index < this.#companies.length; index++) {
            if (this.#companies[index].companyName === companyName) {
                return true
            }
        }

        return false
    }

    getCompanyByName(companyName) {
        for (let index = 0; index < this.#companies.length; index++) {
            if (this.#companies[index].companyName === companyName) {
                return this.#companies[index]
            }
        }

        return null
    }

    anyCompany() {
        return this.#companies.length > 0
    }

    getCompanies() {
        return this.#companies
    }
}
