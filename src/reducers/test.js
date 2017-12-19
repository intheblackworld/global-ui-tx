import { range } from 'rambda'

const initState = [0]

const test = (state = initState, action) => {
  if (action.type === 'testList') {
    return range(0, action.index)
  }
  return state
}

export default test
