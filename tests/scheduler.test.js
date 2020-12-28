const path = require('path')
const { sendMessagesNow } = require('../index')
const scheduler = require('../src/scheduler')
const mockHelper = require('../src/helper')

jest.mock('../src/helper', () => {
  return {
    ...jest.requireActual('../src/helper'),
    sendEmail: jest.fn()
  }
})

describe('MyLastMssg Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    scheduler.clearAllScheduledMessages()
  })

  test('should send email at time', () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z'))
    scheduler.addScheduledMessage('8/19/2020:23', { template: 'template', sendFrom: 'sendFrom', sendTo: 'sendTo', subject: 'subject', body: 'body' })

    sendMessagesNow()
    expect(mockHelper.sendEmail).toHaveBeenCalledTimes(1)
  })

  test('should send email at time 1', () => {
    scheduler.addScheduledMessage('8/19/2020:23', { template: 'template', sendFrom: 'sendFrom', sendTo: 'sendTo', subject: 'subject', body: 'body' })
    scheduler.addScheduledMessage('8/20/2020:1', { template: 'template1', sendFrom: 'sendFrom1', sendTo: 'sendTo1', subject: 'subject1', body: 'body1' })

    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z'))

    sendMessagesNow()

    Date.now = jest.fn(() => new Date('2020-08-20T05:20:30Z'))

    sendMessagesNow()

    expect(mockHelper.sendEmail).toHaveBeenCalledTimes(2)
  })

  test('Correctly sets automation messages', () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z'))

    const automationPath = path.resolve('mocks', 'candymail.automation.json')

    scheduler.init(automationPath, {
      senderEmail: 'process.env.MAIL_USER',
      senderPassword: 'process.env.MAIL_PASSWORD'
    })

    const user1 = 'betoko1104@chatdays.com'
    scheduler.runAutomation('automation1', user1)
    console.log('messasges', scheduler.getAllScheduledMessages())
    expect(Object.keys(scheduler.getAllScheduledMessages()).length).toBe(1)

    expect(Object.keys(scheduler.getAllScheduledMessages()['8/19/2020:23']).length).toBe(2)
  })
})
