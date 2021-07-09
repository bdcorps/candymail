import { Options } from '../types/types'
import * as mailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')
import { log } from '../utils/logger'

let config: Options

const setConfig = (configOptions: Options) => {
  if (!config) {
    config = configOptions
  } else {
    throw new Error('Invalid Configurations provided for custom service')
  }
}

/**
 * @returns {config} Config
 */
const getConfig = (): Options => {
  return config
}

const getTransporter = (): Mail => {
  const config = getConfig()
  return mailer.createTransport(config.mail)
}

export { getConfig, setConfig, getTransporter }
