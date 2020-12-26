let config = {
  senderEmail: '',
  senderPassword: '',
  workflowPath: ''
}

const setConfig = (myConfig) => {
  // TODO: Better  validation with joi
  if (myConfig.senderEmail && myConfig.senderPassword && myConfig.workflowPath) {
    config = myConfig
  } else {
    throw new Error('senderEmail, senderPasword, workflowPath not provided')
  }
}

const getConfig = () => {
  return config
}

module.exports = { getConfig, setConfig }
