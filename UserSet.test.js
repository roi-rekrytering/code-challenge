import { describe, expect, test, afterAll, vi } from 'vitest'
import UserSet from "./UserSet"

const userSet = new UserSet()

test('Check if there is any user', () => {
    const result = userSet.anyUser()
    expect(result).toStrictEqual(false)
})

test('Add a user', () => {
    const users = userSet.getUsers()

    expect(users.length).toBe(0)
    let user = userSet.addUserByName('Emma')
    expect(users.length).toBe(1)
    expect(users[0]).toEqual(user)
})

test('Check if user exists', () => {
    const result = userSet.doesUserExist('Emma')
    expect(result).toStrictEqual(true)
})

test('This user should not exist', () => {
    const result = userSet.doesUserExist('Anna')
    expect(result).toStrictEqual(false)
})

test('Get user by name', () => {
    const emma = userSet.getUserByName('Emma')
    expect(emma.userName).toBe('Emma')
})

test('Try to get non-existing user by name', () => {
    const anna = userSet.getUserByName('Anna')
    expect(anna).toStrictEqual(null)
})

describe('Mock console.log', () => {
    const mock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    afterAll(() => {
        mock.mockReset()
    })

    test('Print all users', () => {
        userSet.printUsers()
        expect(mock).toHaveBeenLastCalledWith({ 'userName': 'Emma', 'userId': 1 })
    })
})
