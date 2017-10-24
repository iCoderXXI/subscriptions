import initialState from '../data/initialState';

const reducers = {
  ADD_SUBSCRIPTION: (state, action) =>
    ({
      ...state,
      items:
        [
          ...state.items,
          {
            ...action.payload,
            // calculating new item id
            id: state.items.reduce(
              (a,e) => e.id>a?e.id:a, 0
            )+1
          }
        ],
    }),

  DELETE_SUBSCRIPTION: (state, action) =>
    ({
      ...state,
      items: state.items.filter( item => item.id !== action.payload ),
    }),

  SET_DUPLICATE: (state) => ({ ...state, isDuplicate: true}),
  UNSET_DUPLICATE: (state) => ({ ...state, isDuplicate: false}),
}

export default (state=initialState.list, action) =>
  reducers[action.type]
    ? reducers[action.type](state, action)
    : state;
