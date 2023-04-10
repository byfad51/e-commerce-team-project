import React from 'react'
import Navbar from '../components/Navbar'
import MyAccount from '../components/MyAccount'

function Dashboard () {
  return(
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <MyAccount />
      </div>
    </div>

  )

}

export default Dashboard;