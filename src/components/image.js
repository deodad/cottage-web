import React from "react"
import cx from "classnames"

/* overflow-hidden clips the blur */
export const Image = ({ 
  alt, 
  children,
  className,
  image,
  loading = "eager"
}) =>
  <div className={cx("relative overflow-hidden", className)} >
    <div style={{paddingTop: "100%"}} />
    { image ? (
      <>
        { image.base64 &&
          <img className="absolute inset-0 w-full" src={image.base64} style={{filter: "blur(.3rem)"}} />
        }
        <picture className="absolute inset-0 w-full">
          { image.webpCdnUrl &&
            <source srcSet={image.webpCdnUrl} type="image/webp" />
          }
          <source srcSet={image.cdnUrl} />
          <img src={image.cdnUrl} alt={alt} loading={loading} className="w-full" />
        </picture>
      </>
    ) : (
      <div className="absolute inset-0 w-full bg-gray-300" />
    )}
    { children }
  </div>

export const ImageOverlay = (props) =>
  <div className="absolute inset-0 w-full">
    <div {...props} />
  </div>
