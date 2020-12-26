# candymail

Email Automation library 

## Who can use this?
- SAAS Product Makers

## Why use this?
- Increase retention by sending users personalized emails when they complete certain actions in your application. 

## Notes
1. Only the hour value will be used in the cron, minutes will be ignored. +1 hour at 11:58 is 12.
2. Object keys: `MM/DD/YYYY:HH`. Hours are specified in 24-hour format. 

## API Reference
- `getAllMessages`: Get all scheduled emails
- `getMessagesAtTime`: Get all emails scheduled for a specific time
- `runWorkflow`: Run specific workflow defined in the candymail.workflow.json with the `user` being the recipient's email address

## Sample Configuration
```
{
  "workflows": [
    {
      "name": "workflow1",
      "description": "tell user about pro features",
      "trigger_name": "proplan",
      "emails": [
        {
          "trigger": "time",
          "sendDelay": 1,
          "subject": "w1e1",
          "body": "Customizations are great",
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
    },
    {
      "name": "workflow2",
      "description": "tell user about pro features 2",
      "trigger_name": "proplan",
      "emails": [
        {
          "trigger": "time",
          "sendDelay": 2,
          "subject": "w2e1",
          "body": "Customizations are great",
          "from": "sunnyashiin@gmail.com"
        }
      ]
    }
  ]
}
```