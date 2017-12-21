const initState = {
  LLH: {
    comboList: [], // 龙虎
  },
  tenThousands: {
    oddEvenDisplay: [], // 万位单双
    sizeDisplay: [], // 万位大小
  },
  thousands: {
    oddEvenDisplay: [],
    sizeDisplay: [],
  },
  hundreds: {
    oddEvenDisplay: [],
    sizeDisplay: [],
  },
  tens: {
    oddEvenDisplay: [],
    sizeDisplay: [],
  },
  units: {
    oddEvenDisplay: [],
    sizeDisplay: [],
  },
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