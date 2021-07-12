import * as path from 'path'
import { Workflow, EmailAction, AutomationFile, Options } from './types'
import { isEmpty } from 'lodash'
import { setConfig } from './config'
import { addScheduledMessage } from './queue'
import { setWorkflows } from './workflow'
import * as moment from 'moment'


const init = (workflows: Workflow[], options: Options) => {
  if (workflows && workflows.length > 0) {
    console.log("setting workflow")
    setWorkflows(workflows)
  } else {
    const automationFile = require(path.join(__dirname + 'candymail.automation.json'))
    setWorkflows(automationFile?.workflows)
  }

  setConfig(options)
}


const buildEmailAction = (emails: EmailAction[], sendTo: string) => {
  emails.forEach(({ sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = moment.utc()
    const time = today.add(sendDelay, 'hours').format("YYYY-MM-DD HH:mm:ss")

    const sendFrom = from
    addScheduledMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

export { init, buildEmailAction }
