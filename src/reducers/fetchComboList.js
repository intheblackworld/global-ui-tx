const initState = {
}
const fetchComboListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_COMBO_LIST_SUCCESS':
      return { ...action.payload }
    default:
      return state
      break
  }
}

export default fetchComboListReducer