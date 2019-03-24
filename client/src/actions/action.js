
export function fetchActions(){
	return function(dispatch){
		fetch('http://localhost:8000')
		.then(res => res.json())
		.then(data => dispatch({
			type: 'FETCH_DATA',
			payload: data
		}))
	}
}

