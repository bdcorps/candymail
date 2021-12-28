import { runWorkflow, setWorkflows } from '../src/workflow'

import { sampleWorkflows } from '../src/utils/setupTests'
import * as mockQueue from '../src/queue'

jest.mock('../src/queue')
jest.mock('../src/db')
describe('Unit Tests - Workflow', () => {
  test('runWorkflow', async () => {
    setWorkflows(sampleWorkflows)
    runWorkflow('workflow1', 'sendTo')

    expect(mockQueue.addScheduledMessage).toBeCalled()
  })
})
