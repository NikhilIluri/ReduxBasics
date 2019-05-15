// library code

function createStore(reducer) {
// Store should have parts
// The state
// Get the  state
// Listen to changes on state
// Update the state


let state

let listeners = []

const getState = () => state

const subscribe = (listener) =>{
										listeners.push(listener)
                    return () => {
                    listeners = listeners.filter(l => l!=listener)
                    }
                    }
const dispatch = (action) => {
	state = reducer(state,action);
  listeners.forEach( listener => listener())
}

return {
	getState,
  subscribe,
  dispatch
}
}


function todos(state =[], action) {
  switch(action.type) {
	case 'ADD_TODO':
  	return state.concat([action.todo])
  case 'REMOVE_TODO':
  	return state.filter(todo => todo.id!=action.id)
  case 'TOGGLE_TODO':
  	return state.map(todo => todo.id !=action.id ? todo : Object.assign({},todo,{complete:!todo.complete}))
  default:
  	return state
	}
}


function goals (state = [], action) {
  switch(action.type) {
    case 'ADD_GOAL' :
      return state.concat([action.goal])
    case 'REMOVE_GOAL' :
      return state.filter((goal) => goal.id !== action.id)
    default :
      return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app)


store.subscribe(()=> console.log("State is",  store.getState()));

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Master React',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Learn Redux',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 1,
    name: 'Lose weight'
  }
})

store.dispatch({
  type: 'REMOVE_GOAL',
  id: 1
})
