const { sendMessagesNow } = require("../index")
const scheduler = require("../src/scheduler")

describe("Basic Tests", () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    scheduler.clearAllScheduledMessages()
  })
  test("should throw an error when email about to be sent to unsubscribed user", () => {
    Date.now = jest.fn(() => new Date("2020-08-20T03:20:30Z"))
    const user = "unsubscribeduser@gmail.com"
    scheduler.addScheduledMessage("8/19/2020:23", {
      template: "template",
      sendFrom: "sendFrom",
      sendTo: user,
      subject: "subject",
      body: "body",
    })

    scheduler.unsubscribeUser(user)

    expect(() => {
      sendMessagesNow()
    }).toThrow(
      new Error(
        "The user unsubscribeduser@gmail.com you are trying to send a message to has already unsubscribed"
      )
    )
  })
})
