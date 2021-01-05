![NPM](https://img.shields.io/npm/l/candymail)
![npm](https://img.shields.io/npm/v/candymail)
![David](https://img.shields.io/david/bdcorps/candymail)

# CandyMail - Email Automation for Node.js
Candymail makes it easy to trigger and send multi-step email sequences in Node.js using a single JSON file. Built for bootstrappers, indie makers with special care.

<p align="center">
  <img src="https://github.com/bdcorps/candymail/blob/main/web.PNG?raw=true" />
</p>

## Features
1. **Portable**: Create, share and reuse email marketing strategies between different products
2. **Simple to use**: Time to send, subject, body of the emails can all be set up in a single JSON file
3. **Free**: No need to pay for monthly Mailchimp etc. payments for email automation plans

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
      "name": "automation1",
      "description": "tell users about pro features",
      "trigger_name": "proplan",
      "emails": [
        {
          "trigger": "time",
          "sendDelay": 1,
          "subject": "Have you tried Feature A?",
          "body": "Feature A will let you do ABC things. Check it out!",
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
- Gmail
- Looking for more support? Send me a message.

### Usage
```
const path = require('path')
const candymail = require('candymail')

const automationPath = path.resolve('candymail.automation.json')

candymail.init(automationPath, {
  senderEmail: **GMAILEMAIL**,
  senderPassword: **GMAILPASSWORD**
})

candymail.start()

const user = 'howivey729@chatdays.com'
candymail.runAutomation('automation1', user)

console.log('Emails added to queue', candymail.getAllScheduledMessages())
```
Note: Having problems with Gmail? Enable `Allow less secure apps`  in Google Account settings [here](https://myaccount.google.com/lesssecureapps).

## Automation File Options
| Property        | Required           | Description  |
| ------------- |:-------------:| -----:|
| trigger     | No | Name of the trigger (Not usable) |
| sendDelay      | Yes | Delay after which the email will be sent (in hours). From time 0, not from the last email |
| subject | Yes  | Subject of the email |
| body | Yes | Body of the email |
| from | Yes | Sender's Email Address |

## Methods
### init (automationPath, config)
Initializes automations specified in the automation path and sets the configuration with sender's email and password.
- **automationPath**: Absolute path to the candymail.automation.json file. Example: `path.resolve('example', 'candymail.automation.json')` if the file is located at `*ROOT*/example/candymail.automation.json`.

- **config**: `{senderEmail -> Gmail Address of the sender, senderPassword -> Gmail Password of the sender }`


### start()
Starts the internal timer that will send emails at appropriate times.

### runAutomation(automationName)
Triggers an automation based on `name` specified in the `candymail.automation.json` file. Needs `candymail.start()` to have been called.
- **automationName**: Name of `automation` in `candymail.automation.json`. Example: 'automation1'.

### getAllScheduledMessages()
Get the list of all scheduled messages.

### getScheduledMessagesAtTime(time)
Get the list of scheduled messages for a particular `time`.
- **time**: Time should be specified in this format: `MM/DD/YYYY:HH`. For Example: `8/20/2020:2`.

### clearAllScheduledMessages()
Clears all scheduled messages.

### stop()
Stops the internal timer. Can be restarted with `candymail.start()`

### destroy()
Destroys the internal timer.

## Notes
1. Only the hour value will be used in the cron, minutes will be ignored. +1 hour at 11:58 is 12.
2. Object keys: `MM/DD/YYYY:HH`. Hours are specified in 24-hour format.
3. There is currently no `Unsubscribe` option in the emails. Being worked on right now.
4. Only supports GMail. More providers being added right now.

Got Feeback? Hit me up at <a href="mailto:sunnyashiin@gmail.com">sunnyashiin@gmail.com</a> \
Now available for freelance work.
