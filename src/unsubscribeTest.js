require("dotenv").config()
const { sendEmail } = require("./helper")
const { unsubscribeUser } = require("./messages")

// unsubscribeUser('sosaso3288@28woman.com')

sendEmail({
  template: "template",
  sendFrom: "sunnyashiin@gmail.com",
  sendTo: "sosaso3288@28woman.com",
  subject: "subject",
  body:
    '<h1> Welcome</h1> <p>That was easy!</p><br><a href="/unsubscribe">Click here to unsubscribe</a>',
})
