export type Email = {
  template: string
  sendFrom: string
  sendTo: string
  subject: string
  body: string
}

export type Config = {
  senderEmail: string
  senderPassword: string
  hostingURL: string
}

export type AutomationFile = {
  automations: AutomationConfig[]
}

export type AutomationConfig = {
  name: string
  description: string
  trigger_name: string
  emails: AutomationEmailConfig[]
}

export type AutomationEmailConfig = {
  trigger: string
  sendDelay: number
  subject: string
  body: string
  from: string
}
