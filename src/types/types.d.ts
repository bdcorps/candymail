export type Email = {
  template: string
  sendFrom: string
  sendTo: string
  subject: string
  body: string
}

export type HostingOptions = {
  url: string
}

export type MailOptions = {
  host: string,
  port: number,
  secure: boolean,
  auth: {
    user: string
    pass: string
  },
  tls: {
    rejectUnauthorized: true,
  }
}

export type Options = {
  mail: MailOptions,
  hosting: HostingOptions
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
