import React from "react"
import cx from "classnames"

export const Image = ({ image, alt, className }) =>
  <div className={cx("relative overflow-hidden", className)} >
    <div style={{paddingTop: "100%"}} />
    <img className="absolute inset-0 w-full" src={image.base64} style={{filter: "blur(.5rem)"}}/>
    <picture className="absolute inset-0 w-full">
      <source srcSet={image.webpCdnUrl} type="image/webp" />
      <source srcSet={image.cdnUrl} />
      <img src={image.cdnUrl} alt={alt} loading="lazy" />
    </picture>
  </div>
