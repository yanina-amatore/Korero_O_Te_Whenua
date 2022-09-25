import React from 'react'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Link } from 'react-router-dom'

function Nav() {
  const user = useSelector((state: any) => state?.user)
  // DONE call the useAuth0 hook and destructure logout and loginWithRedirect
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <>
      <div className="navGroup">
        <IfAuthenticated>
        <Link to="/add">Add A Story</Link>
        </IfAuthenticated>
        <br/>
        <Link className="navLink" to="/"><i className="fa-light fa-house"></i>
          Home
        </Link>
        <br />
        <Link to="/stories">Stories</Link>
                <br />
        <IfAuthenticated>
          <Link className="navLink" to="/" onClick={handleLogOff}>
            Log off
          </Link>
          <br />
          <p>{user?.username}</p>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link className="navLink" to="/" onClick={handleSignIn}>
            Sign In
          </Link>
          <br />
        </IfNotAuthenticated>
        <IfNotAuthenticated>
          <Link className="navLink" to="/" onClick={handleSignIn}>
            Sign Up
          </Link>
          <br />
        </IfNotAuthenticated>
      </div>
    </>
  )
}

export default Nav
