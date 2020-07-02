import React from "react"
import cx from "classnames"


/* overflow-hidden clips the blur */
export const Image = ({ 
  alt, 
  className,
  image,
  loading = "lazy"
}) =>
  <div className={cx("relative overflow-hidden", className)} >
    <div style={{paddingTop: "100%"}} />
    { image ? (
      <>
        <img className="absolute inset-0 w-full" src={image.base64} style={{filter: "blur(.3rem)"}}/>
        <picture className="absolute inset-0 w-full">
          <source srcSet={image.webpCdnUrl} type="image/webp" />
          <source srcSet={image.cdnUrl} />
          <img src={image.cdnUrl} alt={alt} loading={loading} />
        </picture>
      </>
    ) : (
      <div className="absolute inset-0 w-full bg-gray-300" />
    )}
  </div>
