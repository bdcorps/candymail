
const sqlite3 = require('better-sqlite3')
import { Options, Workflow } from '../src/types';
import {
  init
} from '../src/automation'
import { runWorkflow } from '../src/workflow'
import * as mockHelper from '../src/utils/helper'
import { sendMessagesNow, start, unsubscribeUser } from '../index'

import * as mockModelDB from '../src/db/db.model'
import { addEmailRow, getAllEmailRows, getEmailRowsToBeSent } from '../src/db'
import { clearAllScheduledMessages } from '../src/queue';
import { hasUnsubscribed } from '../src/unsubscribe';

jest.mock('../src/utils/helper')

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
    clearAllScheduledMessages()
  })

  test('runWorkflow', () => {
    addEmailRow("2020-08-20 03:20:00", {
      template: 'template1',
      sendFrom: 'sendFrom1',
      sendTo: 'sendTo1',
      subject: 'subject1',
      body: 'body7',
    })

    addEmailRow("2020-08-20 04:20:00", {
      template: 'template1',
      sendFrom: 'sendFrom1',
      sendTo: 'sendTo1',
      subject: 'subject1',
      body: 'body8',
    })

    expect(getAllEmailRows().length).toBe(2)
    expect(getEmailRowsToBeSent("2020-08-20 04:00:00").length).toBe(1)
  })

  test('DB', async () => {
    Date.now = jest.fn(() => new Date('2020-08-20T03:20:00Z').valueOf())

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
            "from": "a@gmail.com"
          },
          {
            "trigger": "time",
            "sendDelay": 3,
            "subject": "w1e2",
            "body": "Customizations are great",
            "from": "a@gmail.com"
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
    runWorkflow("w1", "a@gmail.com")

    Date.now = jest.fn(() => new Date('2020-08-20T03:19:00Z').valueOf())
    await sendMessagesNow()

    expect(mockHelper.sendEmail).not.toBeCalled()

    Date.now = jest.fn(() => new Date('2020-08-20T04:31:00Z').valueOf())

    await sendMessagesNow()
    expect(mockHelper.sendEmail).toHaveBeenCalledTimes(1)

    unsubscribeUser("a@gmail.com")
    const wasUserUnsubscribed = hasUnsubscribed("a@gmail.com")
    expect(wasUserUnsubscribed).toBe(true)
    Date.now = jest.fn(() => new Date('2020-08-20T06:31:00Z').valueOf())
    await sendMessagesNow()
    expect(mockHelper.sendEmail).toHaveBeenCalledTimes(1)
  })
})
