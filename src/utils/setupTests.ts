import { Message } from '../entity/Message'
import { Workflow, Options } from '../types'

export const sampleWorkflows: Workflow[] = [
  {
    name: 'workflow1',
    description: 'tell user about pro features',
    trigger_name: 'proplan',
    emails: [
      {
        trigger: 'time',
        sendDelay: 1,
        subject: 'w1e1',
        body:
          "<h1>Send automated messages with Candymail</h1><p>Now with HTML support</p><a href='https://saasbase.dev/candymail'>Learn more here</a>",
        from: 'sunnyashiin@gmail.com',
      },
      {
        trigger: 'time',
        sendDelay: 3,
        subject: 'w1e2',
        body: 'Customizations are great',
        from: 'sunnyashiin@gmail.com',
      },
    ],
  },
  {
    name: 'workflow2',
    description: 'tell user about pro features 2',
    trigger_name: 'proplan',
    emails: [
      {
        trigger: 'time',
        sendDelay: 1,
        subject: 'w2e1',
        body: 'Customizations are great',
        from: 'sunnyashiin@gmail.com',
      },
    ],
  },
]

export const sampleOpts: Options = {
  mail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'process.env.MAIL_USER',
      pass: 'process.env.MAIL_PASSWORD',
    },
    tls: {
      rejectUnauthorized: true,
    },
  },
  hosting: { url: 'process.env.HOSTING_URL' },
  db: { reset: true },
  debug: { trace: true },
}

export const sampleMessages: Message[] = [
  {
    id: 1,
    template: '',
    sendFrom: 'a@gmail.com',
    sendTo: 'a@gmail.com',
    sendAt: new Date(Date.parse('2020-07-20T02:30:30')),
    subject: '',
    body: '',
    sent: true,
  },
]
