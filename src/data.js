import tony from "./images/tony.jpg"
import olga from "./images/olga.jpg"
import chris from "./images/chris.jpg"
import colin from "./images/colin.jpg"
import talia from "./images/talia.jpg"
import eggs from "./images/eggs.jpg"
import honey from "./images/honey.jpg"

export const users = [
  {
    id: 1,
    name: "Tony D'Addeo",
    handle: "tdad",
    location: "Chestnut, Austin, TX",
    bio: "Cottage father",
    dateJoined: "4/1/2020",
    profileImage: tony,
    threads: [],
  },
  {
    id: 2,
    name: "Olga Vilkotskaya",
    handle: "ovil",
    location: "Chestnut, Austin, TX",
    bio: "",
    dateJoined: "4/1/2020",
    profileImage: olga,
    threads: [],
  },
  {
    id: 3,
    name: "Chris Beavers",
    handle: "cbeav",
    location: "East Caesar Chavez, Austin, TX",
    bio: "",
    dateJoined: "4/1/2020",
    profileImage: chris,
    threads: [],
  },
  {
    id: 4,
    name: "Talia Pinzari",
    handle: "talia",
    location: "Govalle, Austin, TX",
    bio: "",
    dateJoined: "4/1/2020",
    profileImage: talia,
    threads: [],
  },
  {
    id: 5,
    name: "Cecilia Hernandez",
    handle: "cece",
    location: "East Caesar Chavez, Austin, TX",
    bio: "",
    dateJoined: "4/1/2020",
    threads: [],
  },
  {
    id: 6,
    name: "Colin Thurmond",
    handle: "guitarman",
    location: "Govalle, Austin, TX",
    bio: "",
    dateJoined: "4/1/2020",
    profileImage: colin,
    threads: [],
  },
]

users[0].threads = [
  {
    id: 1,
    user: users[2],
    lastActivityText: "Yo I want some of that focaccia",
    activities: [
      {
        id: 1,
        type: "message",
        text: "Yo I want some of that focaccia",
      },
    ],
  },
  {
    id: 2,
    user: users[1],
    lastActivityText: "Husband did you see that salsa?",
    activities: [
      {
        id: 2,
        type: "message",
        text: "Husband did you see that salsa?",
      },
    ],
  },
]

export const listings = [
  {
    id: 1,
    name: "Sourdough Starter",
    shortDescription: "2 years old, father of many",
    description: "2 years old, father of many",
    user: users[3],
  },
  {
    id: 2,
    name: "Honey",
    image: honey,
    shortDescription: "From Vilkotski family bees in Sammamish, WA",
    description: "From Vilkotski family bees in Sammamish, WA",
    user: users[1],
  },
  {
    id: 3,
    name: "Dozen Eggs",
    shortDescription: "12 light pink medium sized eggs from hens",
    description: "12 light pink medium sized eggs from hens",
    user: users[2],
    image: eggs,
  },
  {
    id: 4,
    name: "Focaccia",
    shortDescription: "Oily, rosemary, crunchy, chewiness",
    description: "Oily, rosemary, crunchy, chewiness",
    user: users[0],
  },
  {
    id: 5,
    name: "Pickled Beets",
    user: users[5],
  },
  {
    id: 6,
    name: "Salsa Verde",
    shortDescription: "Mexican recipe of tomatillo and avocado",
    description: "Mexican recipe of tomatillo and avocado",
    user: users[4],
  },
  {
    id: 7,
    name: "Zatar Flatbread",
    shortDescription: "Sourdough starter fried in olive oil and zatar",
    description: "Sourdough starter fried in olive oil and zatar",
    user: users[5],
  },
]

export const trades = [
  {
    id: 1,
    left: listings[5],
    right: listings[4],
    date: "3/26/2020",
  },
  {
    id: 2,
    left: listings[0],
    right: listings[1],
    date: "3/26/2020",
  },
  {
    id: 3,
    left: listings[0],
    right: listings[2],
    date: "3/25/2020",
  },
  {
    id: 4,
    left: listings[3],
    right: listings[2],
    date: "3/21/2020",
  },
  {
    id: 5,
    left: listings[3],
    right: listings[0],
    date: "4/9/2020",
  },
]

export const reviews = [
  {
    id: 1,
    user: users[0],
    reviewer: users[3],
    date: "4/8/2020",
    stars: 5,
    body: "I liked trading with Tony. Would trade again!",
  },
]

export const proposals = [
  {
    id: 1,
    from: {
      user: users[2],
      listing: listings[2],
    },
    to: {
      user: users[0],
      listing: listings[3],
    },
    date: "4/1/2020",
  },
  {
    id: 2,
    from: {
      user: users[5],
      listing: listings[4],
    },
    to: {
      user: users[0],
      listing: listings[3],
    },
    date: "3/31/2020",
  },
]
