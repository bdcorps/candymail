import * as path from 'path'
import { addScheduledMessage, getAllScheduledMessages, clearAllScheduledMessages } from '../src/messages'
import { init, runAutomation } from '../src/scheduler'
import { sendMessagesNow } from '../index'
import * as mockHelper from '../src/helper'

jest.mock('../src/helper', () => {
  return {
    ...jest.requireActual('../src/helper') as object,
    sendEmail: jest.fn(),
  }
})

describe('Basic Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    clearAllScheduledMessages()
  })

  test('should send email at time', () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z').valueOf())
    addScheduledMessage('8/20/2020:3', {
      template: 'template',
      sendFrom: 'sendFrom',
      sendTo: 'sendTo',
      subject: 'subject',
      body: 'body',
    })

    sendMessagesNow()

    expect(mockHelper.sendEmail).toHaveBeenCalledTimes(1)
  })

  test('should correctly send messages with a delay', () => {
    addScheduledMessage('8/19/2020:23', {
      template: 'template',
      sendFrom: 'sendFrom',
      sendTo: 'sendTo',
      subject: 'subject',
      body: 'body',
    })
    addScheduledMessage('8/20/2020:1', {
      template: 'template1',
      sendFrom: 'sendFrom1',
      sendTo: 'sendTo1',
      subject: 'subject1',
      body: 'body1',
    })

    Date.now = jest.fn(() => new Date('2020-08-19T23:20:30Z').valueOf())
    sendMessagesNow()

    Date.now = jest.fn(() => new Date('2020-08-20T01:20:30Z').valueOf())
    sendMessagesNow()

    expect(mockHelper.sendEmail).toHaveBeenCalledTimes(2)
  })

  test('Correctly sets automation messages', () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z').valueOf())

    const automationPath = path.resolve('mocks', 'candymail.automation.json')

    init(automationPath, {
      senderEmail: 'process.env.MAIL_USER',
      senderPassword: 'process.env.MAIL_PASSWORD',
      hostingURL: 'process.env.HOSTING_URL'
    })

    const user1 = 'betoko1104@chatdays.com'
    runAutomation('automation1', user1)

    expect(Object.keys(getAllScheduledMessages()).length).toBe(2)

    expect(getAllScheduledMessages()['8/20/2020:4'].length).toBe(1)
    expect(getAllScheduledMessages()['8/20/2020:6'].length).toBe(1)
  })
})
