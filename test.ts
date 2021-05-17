import * as dotenv from "dotenv"
dotenv.config()

import { init, start, runWorkflow } from "./index"

console.log("sukh MAIL", process.env.MAIL_USER);

init([
  {
    "name": "workflow1",
    "description": "tell user about pro features",
    "trigger_name": "proplan",
    "emails": [
      {
        "trigger": "time",
        "sendDelay": 1,
        "subject": "w1e1",
        "body": "<h1>Send automated messages with Candymail</h1><p>Now with HTML support</p><a href='https://saasbase.dev/candymail'>Learn more here</a>",
        "from": "sunnyashiin@gmail.com"
      },
      {
        "trigger": "time",
        "sendDelay": 3,
        "subject": "w1e2",
        "body": "Customizations are great",
        "from": "sunnyashiin@gmail.com"
      }
    ]
  }], {
  mail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "process.env.MAIL_USER",
      pass: "process.env.MAIL_PASSWORD",
    },
    tls: {
      rejectUnauthorized: true,
    },
  },
  hosting: { url: "process.env.HOSTING_URL" },
  db: { reset: false },
})

start()

runWorkflow('workflow1', "user")