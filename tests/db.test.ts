import { getAllEmailRows } from "../src/db"
jest.mock('../src/db');

describe('Basic Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })


  test('should correctly send messages with a delay', () => {
    const a = getAllEmailRows();
    expect(a.length).toBe(2)
  })

})
