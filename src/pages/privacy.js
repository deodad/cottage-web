import React from "react"
import { withLayout } from "../hoc"

const Privacy = () => (
  <>
    <h1 className="h1">Privacy Policy</h1>

    <p>
      Welcome to Cottage! We want to be completely open with how the information
      you provide will be used.
    </p>

    <div className="mt-5 space-y-5">
      <QnA question="1. What is Cottage?">
        <p>
          Cottage is an online marketplace for buying and selling goods and services
          locally.
        </p>
      </QnA>
    
      <QnA question="2. What is information is collected?">
        <p>
          The information we will collect from you depends on the account features
          you use.
        </p>

        <h4 className="mt-3 mb-1 italic">Profile</h4>

        <ul className="list-disc list-inside">
          <li> 
            In order for users to be able to identify one another, we
            have you provide information about who you are including your
            name, location, bio, and a profile image.
          </li>
          <li>
            Your profile, with the exception of your location, will be publicly
            available.
          </li>
        </ul>

        <h4 className="mt-3 mb-1 italic">Contact Information</h4>

        <ul className="list-disc list-inside">
          <li> 
            In order to be able to communicate with you, we have your
            provide an email address. Your email address will never be made
            public to other users, but instead a temporary email will be
            available that forwards mail to your address.
          </li>
        </ul>

        <h4 className="mt-3 mb-1 italic">Payment Information</h4>

        <ul className="list-disc list-inside">
          <li> 
            In order to purchase goods and services from sellers on Cottage,
            you will provide payment information to Stripe, our trusted third
            party payments processor.
          </li>
        </ul>

        <h4 className="mt-3 mb-1 italic">Reviews</h4>

        <ul className="list-disc list-inside">
          <li> 
            In order to establish trust and provide more information on listings 
            and sellers to users, you may provide reviews and ratings for specifc
            purchases you made.
          </li>
        </ul>

        <h4 className="mt-3 mb-1 italic">Seller Information</h4>

        <ul className="list-disc list-inside">
          <li> 
            In order to sell goods and services from sellers on Cottage,
            you will provide bank account information to Stripe, our trusted 
            third party payments processor so funds can be paid out to you.
          </li>
          <li>
            Listings
          </li>
        </ul>
      </QnA>
    </div>
  </>
)

const QnA = ({ question, children }) => (
  <div>
    <div className="text-lg font-bold">{question}</div>
    <div>{children}</div>
  </div>
)

export default withLayout("simple")(Privacy)
