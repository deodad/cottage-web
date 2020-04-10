import React from "react"
import { UserActivity } from "./user"

export const Reviews = ({ reviews }) => (
  <ul>
    {reviews.map((r) => (
      <li key={r.id}>
        <Review review={r} />
      </li>
    ))}
  </ul>
)

export const Review = ({ review }) => {
  return (
    <UserActivity user={review.reviewer} date={review.date}>
      {review.body}
    </UserActivity>
  )
}
