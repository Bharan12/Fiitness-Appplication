import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './topbar.css'

function TopBar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = ()=>{
    if (window.innerWidth <= 960) {
      setButton(false)
    }
    else {
      setButton(true)
    }
  }

  window.addEventListener('resize', showButton)

  return (
    <>
      <topbar className="topbar">
        <div className="topbar-container">
          <Link to='/' className='topbar-logo'>
          BUILDUP FITNESS <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'topbar-menu active' : 'topbar-menu'}>
            <li className='topbar-item'>
              <Link to='/' className='topbar-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='topbar-item'>
              <Link to='/signin' className='topbar-links' onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
            <li className='topbar-item'>
              <Link to='/signup' className='topbar-links' onClick={closeMobileMenu}>
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </topbar>
    </>
  )
}

export default TopBar