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

const buildEmailAction = (emails: EmailAction[], sendTo: string, params: BodyParam[] = []) => {
  emails.forEach(async ({ sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = moment.utc()
    const sendAt = today.add(sendDelay, 'hours').toDate()
    const sendFrom = from
    let formattedBody = body;
    formattedBody=setBodyParameters(body,params)
    await addScheduledMessage({ template, sendFrom, sendTo, sendAt, subject, body:formattedBody })
  })
}

const setBodyParameters=(body:string, params: BodyParam[] = []) =>{
  params.forEach(element => {
    body=body.replace(`PARAMS_${element.key}`, element.value);
  });
  return body
}

export { init, buildEmailAction, setBodyParameters }
