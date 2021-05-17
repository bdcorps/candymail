import * as scheduler from '../index'
import { addScheduledMessage, clearAllScheduledMessages } from '../src/queue'
import { unsubscribeUser } from '../src/unsubscribe'

describe('Basic Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    clearAllScheduledMessages()
  })
  test('should throw an error when email about to be sent to unsubscribed user', () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z').valueOf())
    const user = 'unsubscribeduser@gmail.com'
    addScheduledMessage('8/20/2020:3', {
      template: 'template',
      sendFrom: 'sendFrom',
      sendTo: user,
      subject: 'subject',
      body: 'body',
    })

    unsubscribeUser(user)

    expect(() => {
      scheduler.sendMessagesNow()
    }).toThrow(
      new Error(
        'The user unsubscribeduser@gmail.com you are trying to send a message to has already unsubscribed'
      )
    )
  })
})
