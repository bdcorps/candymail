import * as path from 'path'
import { addScheduledMessage, getAllScheduledMessages, clearAllScheduledMessages } from '../src/queue'
import { runWorkflow } from '../src/workflow'
import { init, sendMessagesNow } from '../index'
import * as db from "../src/db"
jest.mock('../src/db');

describe('Basic Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('should send email at time', () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z').valueOf())

    const date = new Date(Date.now()).toISOString()

    addScheduledMessage(date, {
      template: 'template',
      sendFrom: 'sendFrom',
      sendTo: 'sendTo',
      subject: 'subject',
      body: 'body',
    })

    sendMessagesNow()

    expect(db.addEmailRow).toHaveBeenCalledTimes(1)
  })

  test('should correctly send messages with a delay', () => {

    Date.now = jest.fn(() => new Date('2020-08-19T20:20:30Z').valueOf())

    let date = new Date(Date.now())

    const oneHourAheadTime = date
    oneHourAheadTime.setHours(oneHourAheadTime.getHours() + 1);

    const oneHourAheadTimeString = oneHourAheadTime.toISOString()


    const twoHourAheadTime = date
    twoHourAheadTime.setHours(twoHourAheadTime.getHours() + 2);

    const twoHourAheadTimeString = twoHourAheadTime.toISOString()

    console.log("sukh scheduled", oneHourAheadTimeString, twoHourAheadTimeString)

    addScheduledMessage(oneHourAheadTimeString, {
      template: 'template',
      sendFrom: 'sendFrom',
      sendTo: 'sendTo',
      subject: 'subject',
      body: 'body',
    })

    addScheduledMessage(twoHourAheadTimeString, {
      template: 'template1',
      sendFrom: 'sendFrom1',
      sendTo: 'sendTo1',
      subject: 'subject1',
      body: 'body1',
    })



    Date.now = jest.fn(() => new Date('2020-08-20T21:20:30Z').valueOf())

    sendMessagesNow()


    Date.now = jest.fn(() => new Date('2020-08-20T22:20:30Z').valueOf())

    sendMessagesNow()

    expect(db.addEmailRow).toHaveBeenCalledTimes(2)
  })

  test('Correctly sets automation messages', () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z').valueOf())

    const mockAutomationsFile = require('../mocks/candymail.automation.json')
    const mockAutomations = mockAutomationsFile.automations

    init(mockAutomations, {
      mail: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'user',
          pass: 'pass',
        },
        tls: {
          rejectUnauthorized: true,
        },
      },
      hosting: { url: 'http://localhost:4242' }, db: { reset: false }
    })

    const user1 = 'betoko1104@chatdays.com'
    runWorkflow('automation1', user1)

    expect(db.addEmailRow).toHaveBeenCalledTimes(2)
  })

  // TODO tests pending for email services configurations and their validations
})
