import React from 'react'
import { NavLink } from 'react-router-dom'
import GoogleLogoutButton from './GoogleLogoutButton';
import GoogleLoginButton from './GoogleLoginButton';


function NavBar() {
    const isLoggedIn = false;

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark' style={{width:'100%'}}>
           

                <h5 className='navbar-brand' style={{marginLeft:'10px'}}>Glorious Books</h5>
                <div className='collapse navbar-collapse' id='navbarNav'>  
                    
                    <ul className='navbar-nav me-auto'>
                        <li className='nav-item'>
                        <NavLink to='/' className='nav-link' style={{ color: 'white' }}>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/author' className='nav-link' style={{ color: 'white' }}>Author</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/subject' className='nav-link' style={{ color: 'white' }}>Subject</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/title' className='nav-link' style={{ color: 'white' }}>Title</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to='/library' className='nav-link' style={{ color: 'white' }}>Library</NavLink>
                        </li>
                    </ul>
{/**started here for navbar right */}
                    <ul className='nav navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <NavLink to='/login' className='nav-link' style={{ color: 'white' }}>Login</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/signup' className='nav-link' style={{ color: 'white' }}>Signup</NavLink>
                    </li>
                    {isLoggedIn ? (
                        <li><GoogleLogoutButton /></li>
                        ) : (
                        <li><GoogleLoginButton /></li>
                    )}
                    </ul>

                </div>

           
            
        </nav>
    )
}

export default NavBar