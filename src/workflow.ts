import * as path from 'path'
import { Workflow, EmailAction, AutomationFile, Options } from './types/types'
import { isEmpty } from 'lodash'
import { setConfig } from './config'
import { generateDateKey } from './utils/helper'
import { addScheduledMessage } from './queue'
import * as moment from 'moment'

let loadedWorkflows: Workflow[]

const init = (workflows: Workflow[], options: Options) => {
  console.log("sukh ", workflows)
  if (!workflows) {
    const automationFile = require(path.join(__dirname + 'candymail.automation.json'))
    loadedWorkflows = automationFile?.workflows
  } else {
    loadedWorkflows = workflows
  }
  setConfig(options)
}

const buildEmailAction = (emails: EmailAction[], sendTo: string) => {
  emails.forEach(({ sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = moment.utc()
    // const time = today.add(sendDelay, 'hours').format("YYYY-MM-DD HH:MM:SS")

    const time = today.format("YYYY-MM-DD HH:mm:ss")
    const sendFrom = from
    addScheduledMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

const runWorkflow = (workflow: string, sendTo: string) => {
  if (!loadedWorkflows || isEmpty(loadedWorkflows)) {
    throw new Error('No workflows found. Run the init first: init()')
  }
  const messagesInWorkflow = loadedWorkflows.find((message) => message.name === workflow)
  if (messagesInWorkflow) {
    buildEmailAction(messagesInWorkflow.emails, sendTo)
  }
}

export { init, buildEmailAction, runWorkflow }
