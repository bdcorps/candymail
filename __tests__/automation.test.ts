import { init } from '../src/automation'

import * as mockConfig from '../src/config'
import * as mockWorkflow from '../src/workflow'

import { sampleWorkflows, sampleOpts } from '../src/utils/setupTests'

jest.mock('../src/config')
jest.mock('../src/workflow')
jest.mock('../src/db')

describe('Unit Tests - Automation', () => {
  beforeAll((done) => {
    init(sampleWorkflows, sampleOpts).then(() => {
      done()
    })
  })

  test('init', () => {
    expect(mockWorkflow.setWorkflows).toHaveBeenCalledWith(sampleWorkflows)
    expect(mockConfig.setConfig).toHaveBeenCalledWith(sampleOpts)
  })
})
