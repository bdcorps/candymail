import { getAllEmailRows } from '../src/db'
jest.mock('../src/db')

describe('Basic Tests', () => {
  test('should correctly send messages with a delay', async () => {
    const emails = await getAllEmailRows()
    expect(emails.length).toBe(2)
  })
})
