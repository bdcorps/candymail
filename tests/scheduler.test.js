let scheduler = require('../src/scheduler')
const { sendMessagesNow } = require('../index')
let { sendEmail } = require('../src/helper')

Date.now = jest.fn(() => new Date('2020-12-27T03:20:30Z'))

jest.mock('../index')
jest.mock('../src/scheduler')
jest.mock('../src/helper')

test('Adding 1 + 1 equals 2', () => {
  const response = [{
    template: 'default',
    sendFrom: 'sunnyashiin@gmail.com',
    sendTo: 'betoko1104@chatdays.com',
    subject: 'w1e1',
    body: 'Customizations are great'
  }, {
    template: 'default',
    sendFrom: 'sunnyashiin@gmail.com',
    sendTo: 'betoko1104@chatdays.com',
    subject: 'w1e1',
    body: 'Customizations are great'
  }]

  scheduler.getScheduledMessagesAtTime.mockImplementation((key) => response)

  sendMessagesNow('123')
  expect(sendEmail).toHaveBeenCalledTimes(2)
})
