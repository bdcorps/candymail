import { Options, Workflow } from '../src/types';
import {
  init
} from '../src/automation'

import * as mockConfig from '../src/config'
import * as mockWorkflow from '../src/workflow'
import * as mockAutomation from '../src/automation'

jest.mock('../src/config');
jest.mock('../src/workflow', () => ({
  ...jest.requireActual('../src/workflow') as object,
  setWorkflows: jest.fn()
}));

jest.mock('../src/db');
describe('Unit Tests - Automation', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('init', () => {
    const workflows: Workflow[] = [
      {
        "name": "automation1",
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
        "name": "automation2",
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

    init(workflows, options)

    expect(mockWorkflow.setWorkflows).toHaveBeenCalledWith(workflows)
    expect(mockConfig.setConfig).toHaveBeenCalledWith(options)
  })
})