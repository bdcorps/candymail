import { Config } from './types/types'

let config: Config = {
  senderEmail: '',
  senderPassword: '',
  hostingURL: '',
}

const setConfig = (userConfig: Config) => {
  // TODO: Better  validation with joi
  if (userConfig.senderEmail && userConfig.senderPassword && userConfig.hostingURL) {
    config = userConfig
  } else {
    throw new Error('senderEmail, senderPasword, not provided')
  }
}

const getConfig = () => {
  return config
}

export { getConfig, setConfig }
