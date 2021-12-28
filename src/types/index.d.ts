export type Email = {
  template: string
  sendFrom: string
  sendTo: string
  subject: string
  body: string
  sendAt: Date
}

export type MessageRow = {
  id: number
  email: Email
}

export type HostingOptions = {
  url: string
}

export type DatabaseOptions = {
  reset: boolean
}

export type DebugOptions = {
  trace: boolean
}

export type MailOptions = {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  tls: {
    rejectUnauthorized: true
  }
}

export type Options = {
  mail: MailOptions
  hosting: HostingOptions
  db: DatabaseOptions
  debug: DebugOptions
}

export type AutomationFile = {
  automation: Workflow[]
}

export type Workflow = {
  name: string
  description: string
  trigger_name: string
  emails: EmailAction[]
}

export type EmailAction = {
  trigger: string
  sendDelay: number
  subject: string
  body: string
  from: string
}

export type EmailDB = {
  id: number
  time: string
  template: string
  sendFrom: string
  sendTo: string
  subject: string
  body: string
  sent: number
}
