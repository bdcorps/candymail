import * as path from 'path'
import { Workflow, EmailAction, Options, BodyParam} from './types'
import { setConfig } from './config'
import { addScheduledMessage } from './queue'
import { setWorkflows } from './workflow'
import * as moment from 'moment'
import { genConnection } from './db/connection'

const init = async (workflows: Workflow[], options: Options) => {
  await genConnection()

  if (workflows && workflows.length > 0) {
    setWorkflows(workflows)
  } else {
    const automationFile = require(path.join(__dirname + 'candymail.automation.json'))
    setWorkflows(automationFile?.workflows)
  }

  setConfig(options)
}

const buildEmailAction = (emails: EmailAction[], sendTo: string, params?:BodyParam[]) => {
  emails.forEach(async ({ sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = moment.utc()
    const sendAt = today.add(sendDelay, 'hours').toDate()
    if (typeof params !== "undefined") {
      body=setBodyParameters(body,params)
    }
    const sendFrom = from
    await addScheduledMessage({ template, sendFrom, sendTo, sendAt, subject, body })
  })
}

const setBodyParameters=(body:string, params?:BodyParam[]) =>{
  if (typeof params !== "undefined") {
    params.forEach(element => {
      body=body.replace(`PARAMS_${element.key}`, element.value);
    });
  }
  return body
}

export { init, buildEmailAction, setBodyParameters }
