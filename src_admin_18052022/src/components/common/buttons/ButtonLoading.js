import React, { memo } from 'react'
import Loading from './Loading'

export const ButtonLoading = memo(({ isLoading, text, handleClick }) => {
  return (
    <button
      className="newee-btn btn-flex-row btn-l btn-solid-primary"
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading && <Loading name="info small" />}
      {!isLoading && <span>{text}</span>}
      {isLoading && <span className="ml-1">{text}</span>}
    </button>
  )
})
