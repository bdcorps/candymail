const validator = require('validator').default;
const mailer = require('nodemailer');

/**
 * @typedef {Object} config
 * @property  {URL} hostingURL
 * @property  {"Custom"|"126"|"163"|"1und1"|"AOL"|"DebugMail"|"DynectEmail"|"FastMail"|"GandiMail"|"Gmail"|"Godaddy"|"GodaddyAsia"|"GodaddyEurope"|"hot.ee"|"Hotmail"|"iCloud"|"mail.ee"|"Mail.ru"|"Maildev"|"Mailgun"|"Mailjet"|"Mailosaur"|"Mandrill"|"Naver"|"OpenMailBox"|"Outlook365"|"Postmark"|"QQ"|"QQex"|"SendCloud"|"SendGrid"|"SendinBlue"|"SendPulse"|"SES"|"SES-US-EAST-1"|"SES-US-WEST-2"|"SES-EU-WEST-1"|"Sparkpost"|"Yahoo"|"Yandex"|"Zoho"|"qiye.aliyun"} mailService - Set mailing service to use defaults to gmail
 * @property  {String} senderEmail set sender's email or user only in case of supported services
 * @property  {String} senderPassword set sender's password only in case of supported services
 * @property  {Object} [auth]
 * @property  {String} auth.senderEmail set sender's email or user only in case of custom service
 * @property  {String} auth.senderPassword set sender's password only in case of custom service
 * @property  {String} [host] - Host for your custom service
 * @property  {Number} [port] - Port for your custom service
 * @property  {Boolean} [secure] - Set to true for your custom service if you want a (TLS) secured connection
 */

/**
 * @private
 * @type {config} configuration for mailer service
 */
let config = {}
/**
 * @exports 
 * @param  {Object} userConfig set sender's email configuration
 * @param  {URL} userConfig.hostingURL
 * @param  {"Custom"|"126"|"163"|"1und1"|"AOL"|"DebugMail"|"DynectEmail"|"FastMail"|"GandiMail"|"Gmail"|"Godaddy"|"GodaddyAsia"|"GodaddyEurope"|"hot.ee"|"Hotmail"|"iCloud"|"mail.ee"|"Mail.ru"|"Maildev"|"Mailgun"|"Mailjet"|"Mailosaur"|"Mandrill"|"Naver"|"OpenMailBox"|"Outlook365"|"Postmark"|"QQ"|"QQex"|"SendCloud"|"SendGrid"|"SendinBlue"|"SendPulse"|"SES"|"SES-US-EAST-1"|"SES-US-WEST-2"|"SES-EU-WEST-1"|"Sparkpost"|"Yahoo"|"Yandex"|"Zoho"|"qiye.aliyun"} userConfig.mailService- Set mailing service to use defaults to gmail
 * @param  {String} userConfig.senderEmail set sender's email in case of supported services or user in case of custom service
 * @param  {String} userConfig.senderPassword set sender's password in case of supported services or user in case of custom service
 * @param  {String} [userConfig.host] - Host for your custom service
 * @param  {Number} [userConfig.port] - Port for your custom service
 * @param  {Boolean} [userConfig.secure ]- Set to true for your custom service if you want a (TLS) secured connection
 * @throws Invalid Configurations provided for custom service
 * @throws Invalid settings provided for senderEmail, senderPasword, or mailService
 * @returns {config} configuration that has been set
 */
function setConfig(
  userConfig = {
    hostingURL: '',
    mailService: 'Gmail',
    senderEmail: '',
    senderPassword: '',
    host: '',
    port: 465,
    secure: false,
  }
) {
  config = {}
  // config.hostingURL = (validator.isURL(userConfig.hostingURL || process.env.HOSTING_URL))?userConfig.hostingURL || process.env.HOSTING_URL: '';
  config.hostingURL = userConfig.hostingURL || process.env.HOSTING_URL;
  // DONE: Better  validation
  
  if ((userConfig.mailService || process.env.MAIL_SERVICE) === 'Custom') {
    if ( validator.isFQDN(userConfig.host || process.env.MAIL_HOST) && validator.isPort(`${userConfig.port || process.env.MAIL_PORT}`) && !validator.isEmpty(userConfig.senderEmail || process.env.MAIL_USER) && !validator.isEmpty(userConfig.senderPassword || process.env.MAIL_PASSWORD) && validator.isBoolean(`${userConfig.secure || process.env.MAIL_SECURE}`) ) {
      config.mailService = 'Custom'
      config.host = userConfig.host || process.env.MAIL_HOST;
      config.port = userConfig.port || process.env.MAIL_PORT;
      config.secure = userConfig.secure || process.env.MAIL_SECURE;
      config.auth = {
        user: userConfig.senderEmail || process.env.MAIL_USER,
        pass: userConfig.senderPassword || process.env.MAIL_PASSWORD,
      };
      return config
    } else {
      throw new Error('Invalid Configurations provided for custom service');
    }
  }
  config.mailService = (userConfig.mailService || process.env.MAIL_SERVICE)? userConfig.mailService || process.env.MAIL_SERVICE : 'Gmail';
  if (validator.isEmail(userConfig.senderEmail || process.env.MAIL_USER) && !validator.isEmpty(userConfig.senderPassword || process.env.MAIL_PASSWORD)) {
    config.senderEmail = userConfig.senderEmail || process.env.MAIL_USER
    // deepcode ignore WrongNumberOfArgs: Because it is wrong
    config.senderPassword = userConfig.senderPassword || process.env.MAIL_PASSWORD
  } else {
    throw new Error('Invalid settings provided for senderEmail, senderPasword, or mailService')
  }
  return config
}

/**
 * @returns {config} Config
 */
const getConfig = () => {
  return config
}

/**
 * @param {config} [config]
 * @returns {mailer.createTransport}
 */
const getTransporter = (config = {}) => {
  if (Object.keys(config).length !== 0 && config.constructor === Object) {
    setConfig(config)
  }
  if (config.mailService !== 'Custom') {
    return mailer.createTransport({
      service: getConfig().mailService || process.env.MAIL_SERVICE,
      auth: {
        user: getConfig().senderEmail || process.env.MAIL_USER,
        pass: getConfig().senderPassword || process.env.MAIL_PASSWORD,
      },
    })
  } else {
    return mailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.senderEmail,
        pass: config.auth.senderPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }
}

// console.log(getTransporter());

module.exports = { getConfig, setConfig, getTransporter }
