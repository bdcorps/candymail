<div align="center">
  <img src="https://github.com/bdcorps/candymail/blob/main/web.png?raw=true" />
  <h1>CandyMail - Email Automation for Node.js 🍬</h1>

  <img alt="MIT License" src="https://img.shields.io/github/license/bdcorps/candymail"/>
  <img alt="Github Stars" src="https://badgen.net/github/stars/bdcorps/candymail" />

</div>

Candymail makes it easy to trigger and send multi-step email sequences in Node.js using a single JSON file. Built for bootstrappers, indie makers with special care.

## Looking for the documentation? 📝
Latest version => [Full docs](candymail.saasbase.dev)


## Sponsors
- [SaasBase: Guides on building your next SaaS app](https://bit.ly/3oumU3V)

## Features
1. **Written in Typescript**
2. **Portable**: Create, share and reuse email marketing strategies between different products
3. **Simple to use**: Time to send, subject, body of the emails can all be set up in a single JSON file
4. **Free**: No need to pay for monthly Mailchimp etc. payments for email automation plans
5. **HTML Support**: Add HTML templates in the email body
6. **Compliance**: Unsubscribe Option added to email footer

## Use Cases
- Build better onboarding by guiding the user through the app with paced training emails
- Reduce churn by sending exciting community content every few days
- Convert more customers to paid plans by offering discounts based on the user's usage activity

## Installation
Install candymail using yarn:
```
yarn add candymail
```
Or npm:
```
npm install --save candymail
```
## Getting Started
### Configuration
Create a `candymail.automation.json` file on the root level of your project.

Here's a sample:
```
{
  "automations": [
    {
      "name": "workflow1",
      "description": "tell users about pro features",
      "trigger_name": "proplan",
      "emails": [
        {
          "trigger": "time",
          "sendDelay": 1,
          "subject": "Have you tried Feature A?",
          "body": "Feature A will let you do ABC things. <p>We can also do HTML!</p>",
          "from": "abc@gmail.com"
        },
        {
          "trigger": "time",
          "sendDelay": 3,
          "subject": "Try our feature B!",
          "body": "We released feature B just last week and can't wait for you to try it out :)",
          "from": "abc@gmail.com"
        }
      ]
    }
  ]
}
```

### Supported Email Providers
- [Send emails using Gmail](https://github.com/bdcorps/candymail/wiki/Send-emails-using-Gmail)
- [Send emails using Mailgun](https://github.com/bdcorps/candymail/wiki/Send-emails-using-Mailgun)
- We use Nodemailer under the hood, any SMTP provider will work

## Automation File Options
| Property        | Required           | Description  |
| ------------- |:-------------:| -----:|
| trigger     | No | Name of the trigger (Not usable) |
| sendDelay      | Yes | Delay after which the email will be sent (in hours) |
| subject | Yes  | Subject of the email |
| body | Yes | Body of the email: HTML or Text |
| from | Yes | Sender's Email Address |

## Methods
### init (automations, options)
Loads up all the automations and the options.
- **automations**: Automations to be run.

- **options**: `{
   mail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  },
  hosting: { url: process.env.HOSTING_URL },
  db: { reset: true },
  debug: { trace: true }}`

### start()
Starts the internal timer that will send emails at appropriate times.

### runWorkflow(workflowName)
Triggers an automation based on `name` specified in the `candymail.automation.json` file. Needs `candymail.start()` to have been called.
- **automationName**: Name of `automation` in `candymail.automation.json`. Example: 'workflow1'.

### getAllScheduledMessages()
Get the list of all scheduled messages.

### getScheduledMessagesBeforeTime(time)
Get the list of scheduled messages for a particular `time`.
- **time**: Time should be specified in this format: `MM/DD/YYYY:HH`. For Example: `8/20/2020:2`.

### clearAllScheduledMessages()
Clears all scheduled messages.

### stop()
Stops the internal timer. Can be restarted with `candymail.start()`

### destroy()
Destroys the internal timer.

### unsubscribeUser(email)
Unsubscribes a user's email. No further emails will be sent out to the user. 

## Looking to contribute?
Read the `CONTRIBUTING.md` and pick up issues to work on from the Project Roadmap [here](https://github.com/bdcorps/candymail/wiki/Project-Roadmap).

Got Feedback? Hit me up at <a href="mailto:sunnyashiin@gmail.com">sunnyashiin@gmail.com</a> \
Now available for freelance work.

Thanks to [u/grantrules on Reddit](https://www.reddit.com/user/grantrules/) for helping with a code review
