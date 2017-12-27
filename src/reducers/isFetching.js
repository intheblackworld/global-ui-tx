const isFetchingReducer = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'RECEIVE_POST':
      return { isFetching: false }
    case 'REQUEST_POST':
      return { isFetching: true }
    default:
      return { isFetching: false }
      break
  }
}

export default isFetchingReducer