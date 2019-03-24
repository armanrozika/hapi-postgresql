
const initState = {
	data: [],
	addpost: ''
}

const reducer = (state = initState, action) => {
	if(action.type === 'FETCH_DATA'){
		return {
			...state,
			data: action.payload
		}
	}

	if(action.type === 'SHOW_SUCCESS'){
		return {
			...state,
			addpost: action.payload
		}
	}
	
	return state;
}

export default reducer;