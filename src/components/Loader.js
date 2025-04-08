import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function Loader() {

  return (
    <div className="backdrop">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#EA0486', '#08B3C0', '#DD1B4E', '#74BE3C', '#BC55A4']}
      />
    </div>
  )
}

export default Loader
