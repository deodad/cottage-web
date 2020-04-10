import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import { NavLink } from "../components/common"
import { ListingLink, Listing } from "../components/listing"
import { Trade } from "../components/trade"
import { UserActivity, UserLink } from "../components/user"
import { listings, users, trades, proposals } from "../data"

const myListings = [listings[0]]

const Home = () => (
  <Layout title="Home">
    <div className="-mx-5 mt-3 flex">
      <NavLink to="" className="px-5 py-3 font-bold">
        Activity
      </NavLink>
      <NavLink to="proposals" className="px-5 py-3 font-bold">
        Open Proposals ({proposals.length})
      </NavLink>
      <NavLink to="listings" className="px-5 py-3 font-bold">
        My Listings
      </NavLink>
    </div>

    <div className="mt-5">
      <Router>
        <Feed path="/" />
        <Proposals path="proposals" />
        <Listings path="listings" />
      </Router>
    </div>
  </Layout>
)

const Feed = () => (
  <>
    <UserActivity user={users[1]} date={new Date() - 10 * 60000}>
      Listed <ListingLink listing={listings[1]} className="font-bold" />
    </UserActivity>
    <UserActivity user={users[2]} date={new Date() - 240 * 60000}>
      Traded <ListingLink listing={listings[2]} className="font-bold" /> to{" "}
      <UserLink user={users[0]} /> for a{" "}
      <ListingLink listing={listings[3]} className="font-bold" />
    </UserActivity>
    <UserActivity user={users[5]} date={new Date() - 10 * 60 * 60000}>
      Traded <ListingLink listing={listings[6]} className="font-bold" /> to{" "}
      <UserLink user={users[4]} /> for a{" "}
      <span className="font-bold">Salsa Rojo</span>
    </UserActivity>
    <UserActivity user={users[4]} date={new Date() - 10 * 2000 * 60000}>
      Listed <ListingLink listing={listings[5]} className="font-bold" />
    </UserActivity>

    <div className="hidden mt-5">
      <p>What goes on here?</p>
      Activities from people you are following:
      <ul>
        <li>Listed item</li>
        <li>Trade</li>
        <li>Comment</li>
        <li>Post</li>
      </ul>
    </div>
  </>
)

const Proposals = () => (
  <>
    {proposals.map(({ id, from, to, date }, index) => (
      <UserActivity key={id} user={from.user} date={date}>
        <div key={index} className="mb-5">
          Proposed a trade:
          <br />
          <div className="mt-1 p-3 border">
            <ListingLink listing={from.listing} /> for a{" "}
            <ListingLink listing={to.listing} />.
            <div className="mt-2">
              <button className="px-4 py-2 bg-green-400 text-white font-bold">
                Accept
              </button>{" "}
              <button className="px-4 py-2 bg-red-400 text-white font-bold">
                Pass
              </button>
            </div>
          </div>
        </div>
      </UserActivity>
    ))}
  </>
)

const Listings = () => (
  <div>
    <button className="px-4 py-2 bg-green-400 text-white font-bold">
      Add new
    </button>

    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {myListings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
      ))}
    </div>
  </div>
)

const Trades = () => (
  <ul>
    {trades.map((trade, index) => (
      <li key={index} className="py-2">
        <Trade {...trade} />
      </li>
    ))}
  </ul>
)

export default Home
