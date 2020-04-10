import React from "react"
import { Link, Router } from "@reach/router"
import Layout from "../components/layout"
import { UnlinkedUserActivity } from "../components/user"

import { users } from "../data"

const Messages = () => {
  return (
    <Layout title="Messages">
      <Router>
        <Threads path="/" />
        <Thread path=":threadId" />
      </Router>
    </Layout>
  )
}

const Threads = () => (
  <ul>
    {users[0].threads.map((thread) => (
      <li key={thread.id}>
        <Link to={thread.id.toString()}>
          <UnlinkedUserActivity user={thread.user}>
            <div className="truncate">{thread.lastActivityText}</div>
          </UnlinkedUserActivity>
        </Link>
      </li>
    ))}
  </ul>
)

const Thread = ({ threadId }) => {
  const thread = users[0].threads.find((t) => t.id === parseInt(threadId))

  return (
    <div>
      {thread.activities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

const Activity = ({ activity }) => {
  switch (activity.type) {
    case "message":
      return <Message activity={activity} />
    default:
      return null
  }
}

const Message = ({ activity }) => <div>{activity.text}</div>

export default Messages
