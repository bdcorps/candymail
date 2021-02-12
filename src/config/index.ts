import { Options } from '../types/types'
import * as mailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')

let config: Options

const setMailerConfig = (userConfig: Options) => {
  if (userConfig) {
    config = userConfig
  } else {
    throw new Error('Invalid Configurations provided for custom service')
  }
}

/**
 * @returns {config} Config
 */
const getMailerConfig = (): Options => {
  return config
}

const getTransporter = (): Mail => {
  const mailerOptions = getMailerConfig()
  return mailer.createTransport(mailerOptions.mail)
}

export { getMailerConfig, setMailerConfig, getTransporter }
