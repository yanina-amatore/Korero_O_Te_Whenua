import { SEARCH_REGION, ADD_SAVED } from '../actions/search'

const initialState = []

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SEARCH_REGION:
            return payload
        case ADD_SAVED:
            return payload
        default:
            return state
    }
}


export default reducer