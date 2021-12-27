import { Options, Workflow } from '../src/types';
import {
  init
} from '../src/automation'

import * as mockConfig from '../src/config'
import * as mockWorkflow from '../src/workflow'
import * as mockAutomation from '../src/automation'

import { sampleWorkflows, sampleOpts } from "../src/utils/setupTests"

jest.mock('../src/config');
jest.mock('../src/workflow');
// jest.mock('../src/workflow', () => ({
//   ...jest.requireActual('../src/workflow') as object,
//   setWorkflows: jest.fn()
// }));

jest.mock('../src/db');

describe('Unit Tests - Automation', () => {
  beforeAll((done) => {
    init(sampleWorkflows, sampleOpts).then(() => {
      done()
    })
  })

  // afterEach(() => {
  //   jest.clearAllMocks()
  //   jest.resetAllMocks()
  // })

  test('init', () => {
    expect(mockWorkflow.setWorkflows).toHaveBeenCalledWith(sampleWorkflows)
    expect(mockConfig.setConfig).toHaveBeenCalledWith(sampleOpts)
  })
})