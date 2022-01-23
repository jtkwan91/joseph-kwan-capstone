import React from 'react'
import './Handbook.scss'

function Handbook() {
  return (
      <div className='handbook__container'>
        <iframe title="Player's Handbook" className='handbook' src="https://online.anyflip.com/opmdb/rvmi/index.html" allowFullScreen={true} />
      </div>
  )
}

export default Handbook
