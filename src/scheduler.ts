import { AutomationConfig, AutomationEmailConfig, AutomationFile, Options } from './types/types'
import { isEmpty } from 'lodash'
import { setMailerConfig } from './config'
import { generateDateKey } from './helper'
import { addScheduledMessage } from './messages' // TODO: Clean these propagating imports

let loadedAutomations: AutomationConfig[]

// TODO: on init, validate JSON

const init = (automations: AutomationConfig[], options: Options) => {
  if (!automations) {
    const automationFile = require('../candymail.automation.json')
    loadedAutomations = automationFile?.automations
  } else {
    loadedAutomations = automations
  }

  setMailerConfig(options)
}

const build = (emails: AutomationEmailConfig[], sendTo: string) => {
  emails.forEach(({ sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = new Date(Date.now())
    today.setHours(today.getHours() + sendDelay) // TDDO: problem here. what happens with 10:59 + 1 will be 11
    const time = generateDateKey(today)
    const sendFrom = from

    addScheduledMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

const runAutomation = (automation: string, sendTo: string) => {
  if (!loadedAutomations || isEmpty(loadedAutomations)) {
    throw new Error('No automation configuration found. Run the init first: init()')
  }
  const messagesInAutomation = loadedAutomations.find((message) => message.name === automation)
  if (messagesInAutomation) {
    build(messagesInAutomation.emails, sendTo)
  }
}

export { init, runAutomation }
