

import * as path from 'path'
import { addScheduledMessage, getAllScheduledMessages, clearAllScheduledMessages } from '../src/queue'
import { runWorkflow } from '../src/workflow'
import { init, sendMessagesNow } from '../index'
import { getAllEmailRows } from "../src/db"
jest.mock('../src/db');

describe('Basic Tests', () => {
  // afterEach(() => {
  //   jest.clearAllMocks()
  //   jest.resetAllMocks()
  // })


  test('should correctly send messages with a delay', async () => {
    const emails = await getAllEmailRows();
    expect(emails.length).toBe(2)
  })

})
