import React from "react"
import cx from "classnames"
import { useQuery } from "react-query"
import { withUserPage } from "../hoc"
import { get } from "../api"
import { Activity } from "../components/activity"

const queryActivities = () => get("activities")

const Home = () => {
  const { data } = useQuery("activities", queryActivities)

  return <Activities activities={data.activities} />
}

const Activities = ({ activities }) => (
  <ul className="space-y-5 divide-y">
    {activities.map((activity, idx) => (
      <li className={cx("px-3", idx > 0 && "pt-5")} key={idx}>
        <Activity
          user={activity.person}
          activity={activity.data}
          date={new Date(activity.createdAt)}
        />
      </li>
    ))}
  </ul>
)

export default withUserPage({ page: { title: "Home" }})(Home)
