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
        data: action.data,
      }
    }
    case "start": {
      return {
        ...state,
        status: "pending",
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

export const useFetchData = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const failure = (err) => dispatch({ type: "error", error: err })
  const success = (data) => dispatch({ type: "success", data })
  const start = () => dispatch({ type: "start" })

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
        failure(err)
        throw err
      })
  }

  return {
    state,
    dispatch,
    failure,
    success,
    start,
    handleFetch,
    view: {
      isLoading: state.status === "idle" || state.status === "pending",
      data: state.data,
      isError: state.status === "rejected",
      error: state.error,
    }
  }
}
