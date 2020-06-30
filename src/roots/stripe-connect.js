import React from "react"
import { useQuery } from "react-query"
import { get } from "../api"
import { withUserPage } from "../hoc"

const StripeConnectRoot = () => {
  const { data } = useQuery("stripe-connect", () => get("stripe/connect"))

  if (data.connected) {
    return <StripeDashboardLink />
  }

  return <StripeConnect data={data} />
}

const StripeConnect = ({ data }) => {
  return (
    <div className="px-3">
      <p>
        Payouts are securely processed using the Stripe Connect platform. Click
        the connect button below to setup your account information.
      </p>

      <a className="surface btn btn-ctn btn-1" href={data.url}>
        Connect
      </a>
    </div>
  )
}

const StripeDashboardLink = () => {
  const redirectToDashboard = () => {
    get("stripe/connect/login-link").then(({ url }) => window.location = url )
  }

  return (
    <div className="px-3">
      <p>
        Click the button below to modify you payment information and view recent
        and upcoming payments.
      </p>

      <button className="surface btn btn-ctn btn-1" onClick={redirectToDashboard}>
        Go to Stripe Dashboard
      </button>
    </div>
  )
}

export default withUserPage({ 
  page: { 
    title: "Stripe Connect", 
    back: "/settings"
  }
})(StripeConnectRoot)
