import { Options } from './types/types'
import * as mailer from 'nodemailer'
import * as validator from 'validator'

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

const getTransporter = (config = {}) => {
  return mailer.createTransport(config)
}

export { getMailerConfig, setMailerConfig, getTransporter }
