import { describe, expect, test, afterAll, vi } from 'vitest'
import UserCompanyAssociation from './UserCompanyAssociation'

const association = new UserCompanyAssociation()
const userId1 = 3
const userId2 = 5
const companyId = 7
const associations = association.getAssociations()

describe('Testing association of user-company', () => {

    test('Check if there is any association', () => {
        expect(associations.length).toBe(0)
    })

    test('Attach a user to a company', () => {
        const result = association.attachUserToCompany(userId1, companyId)
        expect(result).toStrictEqual(true)

        expect(associations.length).toBe(1)
        expect(associations[0].companyId).toBe(companyId)
        expect(associations[0].users[0]).toBe(userId1)
    })

    test('Attach a second user to the same company', () => {
        const result = association.attachUserToCompany(userId2, companyId)
        expect(result).toStrictEqual(true)

        expect(associations.length).toBe(1)
        expect(associations[0].companyId).toBe(companyId)
        expect(associations[0].users.length).toBe(2)
        expect(associations[0].users[1]).toBe(userId2)
    })

    test('Try to attach same user to the same company', () => {
        const result = association.attachUserToCompany(userId1, companyId)
        expect(result).toStrictEqual(false)

        expect(associations.length).toBe(1)
        expect(associations[0].companyId).toBe(companyId)
        expect(associations[0].users[0]).toBe(userId1)
    })

    test('Has this company any association', () => {
        let result = association.hasCompanyAssociation(companyId)
        expect(result).toStrictEqual(true)
    })

    describe('Mock console.log', () => {
        const mock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

        afterAll(() => {
            mock.mockReset()
        })

        test('Print all associations', () => {
            association.printAllAssociations()
            expect(mock).toHaveBeenLastCalledWith({ 'companyId': companyId, 'users': [userId1, userId2] })
        })
    })

})
