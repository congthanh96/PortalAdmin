import React from 'react'

function Loading({ name }) {
  return (
    <div className={`lds-ring ${name}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loading
