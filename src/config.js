let config = {
  senderEmail: '',
  senderPassword: '',
  automationPath: ''
}

const setConfig = (userConfig) => {
  // TODO: Better  validation with joi
  if (userConfig.senderEmail && userConfig.senderPassword) {
    config = userConfig
  } else {
    throw new Error('senderEmail, senderPasword, not provided')
  }
}

const getConfig = () => {
  return config
}

module.exports = { getConfig, setConfig }
