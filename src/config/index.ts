import { Options } from '../types/types'
import * as mailer from 'nodemailer'

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
const getMailerConfig = () => {
  return config
}

const getTransporter = () => {
  const config = getMailerConfig()
  return mailer.createTransport(config.mail)
}

export { getMailerConfig, setMailerConfig, getTransporter }
