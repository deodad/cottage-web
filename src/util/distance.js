const metersToFeet = 3.28
const milesToFeet = 5280

const roundToNearest = (n, x) => Math.ceil(n / x) * x

export const formatDistance = (distance) => {
  distance *= metersToFeet

  if (distance < 1000) {
    return `${roundToNearest(distance, 50).toPrecision(1)} ft`
  }

  distance /= milesToFeet

  if (distance < 10) {
    return `${roundToNearest(distance, 0.1).toPrecision(2)} mi`
  }

  return `${roundToNearest(distance, 1).toPrecision(1)} mi`
}
