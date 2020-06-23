import React from "react"
import { withLayout } from "../hoc"

const Pricing = () => (
  <div>
    <div>
      <h3 className="h3">Transaction Fees</h3>

      <p>
        When you make a sale through Cottage, you will be charged a transaction
        fee of 5% + 30 cents.
      </p>
    </div>

    <div className="mt-5">
      <h3 className="h3">Market Fees</h3>

      <p>
        When a new customer discovers your shop and buys from you via the Cottage
        marketplace or social graph, the purchase is subject to an additional 10%
        fee unless the customer has already purchased from you in the past.
      </p>
    </div>

    <div className="mt-5">
      <h4 className="h4">The Details</h4>

      <p>
        One of the core services Cottage provides is a marketplace where people
        can come together to buy and sell local products.
      </p>

      <p>
        When a person discovers your shop via the Cottage Marketplace or Activity
        Feed, an additional 10% fee is applied to any purchases they make from
        you in the next 30 days. From then on, the customer is considered yours
        and no marketplace fee will be applied regardless of how the sale
        originates.
      </p>

      <p>
        Someone is considered to have discovered your store via the Cottage
        Marketplace when they click on a search or browse result that takes
        them to your store and have discovered your store via the Activity 
        Feed when they click on a social activity that links them to your 
        store.
      </p>

      <p>
        This approach allows Cottage to be compensated for introducing new
        customers to you without imposing itself as a permenant middleman between
        you and your customers.
      </p>

      <p>
        By default, all listings will show up in the marketplace and social graph. 
        You can disable this for an individual listing or at the account level.
      </p>

      <div className="my-5">
        <img src="https://assets.cottage.dev/web/img/2940628728_bf933dac39_c.jpg" alt="people interacting at a street market" className="mx-auto" />
      </div>
    </div>
  </div>
)

export default withLayout("simple", { title: "Pricing" })(Pricing)
