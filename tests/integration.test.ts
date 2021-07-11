import { Options, Workflow } from '../src/types';
import {
  init
} from '../src/automation'
import { runWorkflow } from '../src/workflow'
const sqlite3 = require('better-sqlite3')

import * as mockModelDB from '../src/db/db.model'
import { addEmailRow, getAllEmailRows, getEmailRowsToBeSent } from '../src/db'

jest.mock('../src/config');

jest.mock('../src/db/db.model', () => {
  return {
    ...jest.requireActual('../src/db/db.model') as object,
    getDB: jest.fn().mockImplementation(() => {
      const db = sqlite3(':memory:')
      return db
    }),
  }
})

describe('Integration Tests - Workflow', () => {

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('runWorkflow', () => {
    // Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z').valueOf())

    const workflows: Workflow[] = [
      {
        "name": "w1",
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
        "name": "w2",
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

    const mockDBFn = jest.fn().mockImplementation(() => {
      const db = sqlite3(':memory:')
      return db
    })

    addEmailRow("2020-08-20 03:20:00", {
      template: 'template1',
      sendFrom: 'sendFrom1',
      sendTo: 'sendTo1',
      subject: 'subject1',
      body: 'body1',
    })

    addEmailRow("2020-08-20 04:20:00", {
      template: 'template1',
      sendFrom: 'sendFrom1',
      sendTo: 'sendTo1',
      subject: 'subject1',
      body: 'body1',
    })
    expect(getAllEmailRows().length).toBe(2)
    expect(getEmailRowsToBeSent("2020-08-20 04:00:00").length).toBe(1)
  })
})