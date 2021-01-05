require("dotenv").config()
const path = require("path")
const candymail = require("../../index")
const express = require("express")
const app = express()
const port = 3000

const automationPath = path.resolve("examples", "candymail.automation.json")
candymail.init(automationPath, {
  senderEmail: process.env.MAIL_USER,
  senderPassword: process.env.MAIL_PASSWORD,
  hostingURL: "http://localhost:3000",
})

candymail.start()

const someConditionSatisfiedByUser = () => {
  const user = "mewice9875@chomagor.com"
  candymail.runAutomation("automation1", user)
}

app.get("/", (req, res) => {
  res.send(
    "Welcome to Candymail Demo. Go to /trigger to trigger the `automation1` email automation. Be sure to replace email with yours in the `someConditionSatisfiedByUser` method to be able to view the messages."
  )
})

app.get("/trigger", (req, res) => {
  someConditionSatisfiedByUser()
  res.send(candymail.getAllScheduledMessages())
})

app.get("/unsubscribe", (req, res) => {
  const { email } = req.query
  console.log(email)
  candymail.unsubscribeUser(email)
  res.send(`Sent a unsubscribe request for ${email}`)
})

app.listen(port, () => {
  console.log(`Learn about our new features at http://localhost:${port}/trigger`)
})
