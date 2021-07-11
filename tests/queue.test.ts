import {
  addScheduledMessage,
  getAllScheduledMessages,
  getScheduledMessagesBeforeTime,
  clearAllScheduledMessages,
} from '../src/queue'
import * as db from "../src/db"

jest.mock('../src/db');
describe('Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('should get all messages in the db', () => {
    const messages = getAllScheduledMessages()
    expect(messages.length).toBe(2)
  })

  test('should get all messages in the db before time', () => {
    const messages = getScheduledMessagesBeforeTime("2020-08-20 02:30:30")

    expect(messages.length).toBe(1)
  })

  test('add scheduled message', () => {
    addScheduledMessage("2020-08-20 02:30:30", { body: "asd", sendTo: "d", sendFrom: "d", template: "d", subject: "sda" })

    const messages = getAllScheduledMessages()
    expect(messages.length).toBe(3);
  })
})