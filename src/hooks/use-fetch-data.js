import { useReducer } from "react"

const reducer = (state, action) => {
  switch (action.type) {
    case "error": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
      }
    }
    case "success": {
      return {
        ...state,
        status: "resolved",
        [action.key]: action.data,
      }
    }
    case "start": {
      return {
        ...state,
        status: "pending",
      }
    }
    case "update": {
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          ...action.data,
        },
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  status: "idle",
}

export const useFetchData = (key = "data") => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const start = () => dispatch({ type: "start" })
  const failure = (err) => dispatch({ type: "error", error: err })
  const success = (data) => dispatch({ type: "success", key, data })
  const update = (data) => dispatch({ type: "update", key, data })

  const handleFetch = (fetchRequest) => {
    start()

    return fetchRequest
      .then((res) => {
        if (res.ok) {
          res.json().then(success)
          return res
        }

        return Promise.reject()
      })
      .catch((err) => {
        failure("Failure")
      })
  }

  return {
    state,
    dispatch,
    failure,
    success,
    start,
    update,
    handleFetch,
    view: {
      isLoading: state.status === "idle" || state.status === "pending",
      [key]: state[key],
      isError: state.status === "rejected",
      error: state.error,
    },
  }
}
