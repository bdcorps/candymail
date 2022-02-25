import { setBodyParameters} from '../src/automation'
import { BodyParam} from '../src/types/index'
import { sampleMessages } from '../src/utils/setupTests'
import typeorm = require('typeorm')

describe('Unit Tests', () => {

  test('Test setBodyParameters with 2 parameters set', async () => {
    const body = "<h1>PARAMS_Lastname PARAMS_Firstname Send automated messages with Candymail</h1><p>Now with HTML support</p><a href='https://saasbase.dev/candymail'>Learn more here</a>"
    const params=[{key:"Firstname",value:"Harry"},{key:"Lastname",value:"GBAGUIDI"}]
    let response = setBodyParameters(body, params)
    let counter=0
    params?.forEach(element => {
      counter=counter+(response.match(/PARAMS_/g) || []).length
    });
    expect(counter).toBe(0)
  })

  test('Test setBodyParameters without passing parameters', async () => {
    const body = "<h1>PARAMS_Lastname PARAMS_Firstname Send automated messages with Candymail</h1><p>Now with HTML support</p><a href='https://saasbase.dev/candymail'>Learn more here</a>"
    let response = setBodyParameters(body)
    expect(response).toBe(body)
  })

})
