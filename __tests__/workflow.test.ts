import { Options, Workflow } from '../src/types'
import { init } from '../src/automation'
import { runWorkflow, setWorkflows } from '../src/workflow'

import * as mockAutomation from '../src/automation'
import { sampleWorkflows } from '../src/utils/setupTests'
// import * as mockWorkflow from '../src/workflow'
import * as mockQueue from '../src/queue'

jest.mock('../src/queue')
jest.mock('../src/db')
// jest.mock('../src/workflow', () => ({
//   ...jest.requireActual('../src/workflow') as object,
//   getWorkflows: jest.fn().mockReturnValue(sampleWorkflows)
// }));

describe('Unit Tests - Workflow', () => {
  // afterEach(() => {
  //   jest.clearAllMocks()
  //   jest.resetAllMocks()
  // })

  test('runWorkflow', async () => {
    // const a = jest.spyOn(mockAutomation, 'buildEmailAction');

    // jest.spyOn(mockWorkflow, "getWorkflows").mockReturnValue(sampleWorkflows);
    // mockWorkflow.setWorkflows(sampleWorkflows)
    setWorkflows(sampleWorkflows)
    runWorkflow('workflow1', 'sendTo')

    expect(mockQueue.addScheduledMessage).toBeCalled()
  })
})
