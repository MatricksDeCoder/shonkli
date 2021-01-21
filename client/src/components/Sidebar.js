import React, { useContext } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faAddressCard,
  faLink,
  faHeadphones,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import logo from './../images/logo.png'
import { AuthContext } from './../context/AuthContext';

const navItems = [

  {
    label: 'Dashboard',
    path: 'dashboard',
    icon: faChartLine,
    allowedRoles: ['user', 'admin']
  },
  {
    label: 'Account',
    path: 'account',
    icon: faAddressCard,
    allowedRoles: ['user', 'admin']
  },
  {
    label: 'Support',
    path: 'support',
    icon: faHeadphones,
    allowedRoles: ['user', 'admin']
  },
  {
    label: 'Links',
    path: 'links',
    icon: faLink,
    allowedRoles: ['user', 'admin']
  },
  {
    label: 'Admin',
    path: 'admin',
    icon: faDoorOpen,
    allowedRoles: ['user', 'admin']
  },
]

const NavItem = ({ navItem }) => {

  const location = useLocation();

  const isCurrentRoute =
    location.pathname === `/${navItem.path}`

  const classes = classNames({
    'px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex': true,
    'text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100': !isCurrentRoute,
    'bg-gradient text-gray-100 shadow-lg': isCurrentRoute
  });

  return (

    <Link to={navItem.path} className={classes}>
      <div className="flex items-center">
        <div className="mr-0 sm:mr-4">
          <FontAwesomeIcon icon={navItem.icon} />
        </div>
        <span className="hidden sm:block">
          {navItem.label}
        </span>
      </div>
    </Link>
  );

};

const NavItemContainer = ({ children }) => (
  <div>{children}</div>
)

const Sidebar = () => {

  const auth = useContext(AuthContext)
  const { role } = auth.authState.userInfo

  return (

    <section className="h-screen">
      <div className="w-16 sm:w-24 m-auto">
        <Link to="/" ><img src={logo} rel="logo" alt="Logo" /></Link>
      </div>
      <div className="mt-20">
        {navItems.map((navItem, i) => (
          <NavItemContainer key={i}>
            {navItem.allowedRoles.includes(role) && (
              <NavItem navItem={navItem} />
            )}
          </NavItemContainer>
        ))}
      </div>
    </section>
  )

};

export default Sidebar
