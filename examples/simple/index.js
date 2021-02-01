import * as path from 'path'
import * as candymail from '../../index'

const automationPath = path.resolve('..', 'candymail.automation.json')

candymail.init(automationPath, {
  mail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: '',
    },
    tls: {
      rejectUnauthorized: true,
    },
  },
  hosting: { url: 'http://localhost:4242' },
})

candymail.start()

// candymail.unsubscribeUser('user@hotmail.com') // Immediatedly unsubscribe user and they will not receive any more messages

const someConditionSatisfiedByUser = () => {
  const user = 'gopode2677@vy89.com'
  candymail.runAutomation('automation1', user)
}

someConditionSatisfiedByUser()
