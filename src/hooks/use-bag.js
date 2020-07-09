import { queryCache, useMutation, useQuery } from "react-query"
import { get, post, put, del } from "../api"

export const useBag = () => useQuery('bag', get)

export const useAdd = () => useMutation(
  (data) => post("bag", data), 
  { onSuccess: bag => queryCache.setQueryData('bag', bag), useErrorBoundary: false, throwOnError: true }
)

export const useUpdate = () => useMutation(
  (data) => put("bag", data), 
  { onSuccess: bag => queryCache.setQueryData('bag', bag), useErrorBoundary: false, throwOnError: true }
)

export const useRemove = () => useMutation(
  ({ listingId }) => del("bag", { listingId }),
  { onSuccess: bag => queryCache.setQueryData('bag', bag), useErrorBoundary: false, throwOnError: true }
)

export const clearCache = () => queryCache.removeQueries('bag')
