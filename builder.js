const messages = {}

// messages = { 22: { template: '', sendFrom: 'sunnyashiin@gmail.com', sendTo: 'sunnyashiin@gmail.com', subject: 'its 23 reight now', body: 'body!' } }

const addMessage = (time, messageOptions) => {
  if (time in messages) {
    messages[time] = [...messages[time], messageOptions]
  } else {
    messages[time] = [messageOptions]
  }
  // console.log(messages)
}

const getMessagesAtTime = (time) => {
  return messages[time]
}

// addMessage(12, { template: '', sendFrom: 'sunnyashiin@gmail.com', sendTo: 'sunnyashiin@gmail.com', subject: 'first email', body: 'body!' })

// addMessage(10, { template: '', sendFrom: 'another@gmail.com', sendTo: 'sunnyashiin@gmail.com', subject: 'first email', body: 'body!' })

// addMessage(12, { template: '', sendFrom: 'anotheragain@gmail.com', sendTo: 'sunnyashiin@gmail.com', subject: 'first email', body: 'body!' })

// console.log(messages)

// console.log('1' in messages)
// console.log(messages[1])
// console.log(messages.get(22))


module.exports = { addMessage, getMessagesAtTime }
