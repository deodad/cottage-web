import React, { lazy } from "react"
import { useQuery } from "react-query"
import { withUserPage } from "../hoc"
import { get } from "../api"

const getDashboard = () => get("me/dashboard")

const Dashboard = lazy(() => import("../pages/dashboard"))

const DashboardRoot = () => {
  const { data } = useQuery("dashboard", getDashboard)

  return <Dashboard data={data} />
}

export default withUserPage({ 
  page: { 
    title: "Dashboard"
  }
})(DashboardRoot)
