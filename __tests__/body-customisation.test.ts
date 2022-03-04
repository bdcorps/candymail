import { setBodyParameters} from '../src/automation'

describe('Unit Tests', () => {

  test('Test setBodyParameters with 2 parameters set', async () => {
    const body = "<h1>{{Lastname}} {{Firstname}} Send automated messages with Candymail</h1><p>Now with HTML support</p><a href='https://saasbase.dev/candymail'>Learn more here</a>"
    const params=[{key:"Firstname",value:"Harry"},{key:"Lastname",value:"GBAGUIDI"}]
    let response = setBodyParameters(body, params)
    let counter=0
    counter = (response.match(/{{.+?}}/g) || []).length;
    expect(counter).toBe(0)
  })

  test('Test setBodyParameters without passing parameters', async () => {
    const body = "<h1>{{Lastname}} {{Firstname}} Send automated messages with Candymail</h1><p>Now with HTML support</p><a href='https://saasbase.dev/candymail'>Learn more here</a>"
    let response = setBodyParameters(body)
    expect(response).toBe(body)
  })

})
