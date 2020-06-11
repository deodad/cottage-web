import React from "react"
import { withLayout } from "../hoc"

const Trust = () => (
  <>
    <h1 className="h1">Community Standards</h1>

    <p> 
      Social capital is an intangible force that allows for a diverse set of
      people to work and live together in harmonious ways. It's not something that
      can be bought, it can only be built over time as networks of trust forms
      between individual members of the community.
    </p>

    <p> 
      The idea of building social capital as a means to enrich our economic,
      social and spiritual lives is a founding pillar of Cottage. The Community
      Standards are here to serve as a guide to developing social capital within
      our communities. 
    </p>

    <h2 className="mt-5 h2">Reciprocity</h2>

    <p>
      Every transaction that occurs on Cottage is between two consenting parties
      who are mutually enriching each other's lives. The seller has invested their
      time and skills in creating something of interest. The buyer is making a
      concious choice to spend their money in their local community.
    </p>

    <p>
      It's a beautiful thing! Both parties are expected to treat the other with 
      respect, fairness, and gratitude. Necessary but not sufficient behaviors 
      to acheive this include being reliable, honest, and kind.
    </p>

    <p>
      Given that we are all human and will fall short of these standards at one 
      time or another, <b>grace</b> is key in building social capital. When 
      conflicts arise, always give the benefit of the doubt and work torwards 
      resolution rather than being right.
    </p>

    <div className="hidden">
      <h2>Authenticity</h2>
      <h2>Safety</h2>
      <h2>Security</h2>
      <h2>Openness</h2>


      AirBnB: safety, security, fairness, authenticity, reliability
      Reading list:
      Jane Jacobs
      Rosa Luxemborg
      De Bouis
    </div>
  </>
)

export default withLayout("simple")(Trust)
