import React from 'react'
import Navbar from '../components/Navbar'
import Mya from '../components/Mya'

function Dashboard () {
  return(
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Mya />
      </div>
    </div>

  )

}

export default Dashboard;