# CandyMail - Email Automation for Node.js

Trigger and send multi-step email sequences in Node.js using a single JSON file.

## Who is it for?
- SAAS Product Makers

## Why use this?
- Increase retention by sending users personalized emails when they complete certain actions in your application. 

## Installation
Install candymail using yarn:
```
yarn add --dev candymail
```
Or npm:
```
npm install --save-dev candymail
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
Note: Having problems with Gmail? Enable `Allow less secure apps`  in Google Account settings [here](!https://myaccount.google.com/lesssecureapps).

## Notes
1. Only the hour value will be used in the cron, minutes will be ignored. +1 hour at 11:58 is 12.
2. Object keys: `MM/DD/YYYY:HH`. Hours are specified in 24-hour format. 
3. Only GMail with `Less Secure Apps` turned on. 
