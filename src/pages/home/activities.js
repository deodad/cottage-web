import React from "react"
import { GraphQLClient } from "graphql-request"
import useSWR from "swr"
import { withSWR } from "../../hoc"
import { Activity } from "../../components/activity"

const endpoint = "http://localhost:8082/graphql"

const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include",
  mode: "cors",
})

const ActivitiesContainer = () => {
  const { data, error, isValidating } = useSWR("activities")
  useSWR(
    `{
      currentPerson {
        id
        name
      }
  }`,
    (query) => graphQLClient.request(query)
  )

  return <Activities {...{ data, error, isValidating }} />
}

const Activities = withSWR(({ data }) => (
  <ul className="space-y-5">
    {data.activities.map((activity) => (
      <li key={activity.id}>
        <Activity
          user={activity.user}
          activity={activity.activity_data}
          date={new Date(activity.created_at)}
        />
      </li>
    ))}
  </ul>
))

export default ActivitiesContainer
