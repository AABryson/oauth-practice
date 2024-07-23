import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import ContextObject from './ContextObject'
import NavBar from './NavBar'
import HomePage1 from './HomePage1'
import SearchByAuthor from './SearchByAuthor'
import SearchByTitleNew from './SearchByTitleNew'
import SearchBySubjectNew from './SearchBySubjectNew'
import SearchBookshelves from './library'
import SearchBooks from './SearchBooks'
import Signup from './credentials/Signup'
import Login from './credentials/Login'

function App() {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [user, setUser] = useState('')
  const [authToken, setAuthToken] = useState('')
    
    // 'ya29.a0AXooCgvY6QpKN-ovVcSk7CcMJv6y9xyEkaW_FFag3ckizCqJdz-O64Gt1S-tY10iWddnFwRUE0V5V7DCkzDCUyrsZVdVI2WSQomD1FLTTADaHKUIkO8egzeEF-a8N_xqPnIeY95Y2V9OdsEF_YyfGkIVBgzgZISh7DTaaCgYKATUSARESFQHGX2Mifz1YEkPg87nmCmAk8BTX-Q0171')
//###############[]
  const [books, setBooks] = useState([])

  // function navigate(url) {
  //   window.location.href = url
  // }
  // async function auth() {
  //   const response = await fetch('http://127.0.0.1:3001/request', { method: 'post' })
  //   const data = await response.json();
  //   navigate(data.url);
  // }

  // auth()
  
  return (
    <div className='container-fluid p-0'>

      <ContextObject.Provider value={{author, setAuthor, title, setTitle, subject, setSubject, user, setUser, authToken, setAuthToken, books, setBooks}}>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage1 />}/>
          <Route path='/author' element={<SearchByAuthor />} />
          <Route path='/subject' element={<SearchBySubjectNew />} />
          <Route path='/title' element={<SearchByTitleNew />} />
          <Route path='/library' element={<SearchBookshelves />} />
          <Route path='/books/:id' element={<SearchBooks />} />
          <Route path='/signup' element={<Signup />}  />
          <Route path='/login' element={<Login />} />
        </Routes>
      </ContextObject.Provider>

    </div>

  )
}

export default App
