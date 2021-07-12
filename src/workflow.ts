import { Workflow, EmailAction, AutomationFile, Options } from './types'
import {
  buildEmailAction
} from './automation'
import { isEmpty } from 'lodash'

let loadedWorkflows: Workflow[]

const setWorkflows = (workflows: Workflow[]) => {
  loadedWorkflows = workflows
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

export { setWorkflows, runWorkflow }