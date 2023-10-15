import { describe, expect, test, afterAll, vi } from 'vitest'
import CompanySet from './CompanySet'

const companySet = new CompanySet()

test('Check if there is any company', () => {
    const result = companySet.anyCompany()
    expect(result).toStrictEqual(false)
})

test('Add a company', () => {
    const companies = companySet.getCompanies()

    expect(companies.length).toBe(0)
    let company = companySet.addCompanyByName('Volvo')
    expect(companies.length).toBe(1)
    expect(companies[0]).toEqual(company)
})

test('Check if company exists', () => {
    const result = companySet.doesCompanyExist('Volvo')
    expect(result).toStrictEqual(true)
})

test('This company should not exist', () => {
    const result = companySet.doesCompanyExist('Ford')
    expect(result).toStrictEqual(false)
})

test('Get company by name', () => {
    const volvo = companySet.getCompanyByName('Volvo')
    expect(volvo.companyName).toBe('Volvo')
})

test('Try to get non-existing company by name', () => {
    const anna = companySet.getCompanyByName('Ford')
    expect(anna).toStrictEqual(null)
})

describe('Mock console.log', () => {
    const mock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    afterAll(() => {
        mock.mockReset()
    })

    test('Print all companies', () => {
        companySet.printCompanies()
        expect(mock).toHaveBeenLastCalledWith({ 'companyName': 'Volvo', 'companyId': 1 })
    })
})
