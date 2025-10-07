import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    console.warn('Image failed to load:', props.src)
    setDidError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gradient-to-br from-gray-50 to-gray-100 text-center align-middle ${className ?? ''} flex items-center justify-center`}
      style={style}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4 text-gray-400">
        <img src={ERROR_IMG_SRC} alt="Error loading image" className="w-12 h-12 opacity-60 mb-2" data-original-url={src} />
        <span className="text-xs font-medium">Image unavailable</span>
      </div>
    </div>
  ) : (
    <>
      {isLoading && (
        <div className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${className ?? ''}`} style={style}>
          <div className="w-8 h-8 border-2 border-[#D32F2F] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} 
        style={style} 
        {...rest} 
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  )
}
