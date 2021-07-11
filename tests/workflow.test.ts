import { Options, Workflow } from '../src/types';
import {
  init
} from '../src/automation'
import { runWorkflow } from '../src/workflow'

import * as mockAutomation from '../src/automation'

jest.mock('../src/config');

jest.mock('../src/db');
describe('Unit Tests - Workflow', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('runWorkflow', () => {
    const workflows: Workflow[] = [
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
      },
      {
        "name": "workflow2",
        "description": "tell user about pro features 2",
        "trigger_name": "proplan",
        "emails": [
          {
            "trigger": "time",
            "sendDelay": 1,
            "subject": "w2e1",
            "body": "Customizations are great",
            "from": "sunnyashiin@gmail.com"
          }
        ]
      }
    ]

    const options: Options = {
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
      db: { reset: true },
      debug: { trace: true },
    }

    const a = jest.spyOn(mockAutomation, 'buildEmailAction');

    init(workflows, options)
    runWorkflow("workflow1", "sendTo")

    expect(mockAutomation.buildEmailAction).toBeCalled()
  })
})