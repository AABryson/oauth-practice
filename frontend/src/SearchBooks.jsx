import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ContextObject from './ContextObject'
import axios from 'axios'
import {NavLink} from 'react-router-dom'


function SearchBooks() {

    const params = useParams()
    console.log('params', params)
    const {books, setBooks, authToken} = useContext(ContextObject)
    const [addingBook, setAddingBook] = useState(false)
    const [removingBook, setRemovingBook] = useState(false)

    const apiKey = 'AIzaSyBZR1XenESLwQpCZDFvClClUHijprCS7D4';
    
    async function retrieveBooks() {
        let result = await axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${params.id}/volumes?key=${apiKey}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
                }
            })
        console.log('results from book api call', result)
        setBooks(result.data.items)
        console.log('result from making call to specific bookshelf', result)
    }
    useEffect(() => {
        retrieveBooks()
        console.log('books state', books)
    }, [params.id])

    async function handleAddTo(id, authToken, num) {
        if (addingBook) return; // If already adding, prevent duplicate calls
    
        setAddingBook(true); // Set state to indicate adding book
    
        try {
          const response = await axios.post(
            `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${num}/addVolume?volumeId=${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          console.log('Book added successfully:', response.data);
          // Handle success: display message, update state, etc.
        } catch (error) {
          console.error('Error adding book:', error);
          // Handle error: display error message, retry, etc.
        } finally {
          setAddingBook(false); // Reset state after request completes
        }
      }

    async function handleRemove(paramsId, itemId, apiKey, authToken) {
        if (removingBook) return; // If already removing, prevent duplicate calls
    
        setRemovingBook(true); // Set state to indicate adding book
    
        try {
            let response = await axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${paramsId}/removeVolume?volumeId=${itemId}&key=${apiKey}`, 
            {},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            }
            )
    
            console.log('Book removed successfully:', response.data);
          // Handle success: display message, update state, etc.
          await retrieveBooks()
        } catch (error) {
            console.error('Error removing book:', error);
          // Handle error: display error message, retry, etc.
        } finally {
          setRemovingBook(false); // Reset state after request completes
        }
      }
        
    

    function renderInfo(books) {
        return books.map((item, index) => (
            <div className='card text-start mx-5' style={{ backgroundColor: 'rgb(242, 242, 242, 0.7)', marginBottom: '12px' }} key={index}>
                <div className='card-body col-12'>
                    {console.log('item returned', item)}
                    <h4 className='card-title' style={{ fontFamily: 'garamond', fontWeight: '400' }}>{item.volumeInfo.title}</h4>
                    <h5 className='card-subtitle mb-2' style={{ color: '#a84343', fontFamily: 'calisto' }}>{item.volumeInfo.authors}</h5>
                    <div className='row'>
                        {/* <div className='col-1 border-start p-1'></div> */}
                        <div className='col-10 border-start'>
                            <p className='card-text'>{item.volumeInfo.description}</p>
                        </div>
                        <div className='col-2 text-center'>
                            {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? (
                                <img src={item.volumeInfo.imageLinks.thumbnail} alt="Thumbnail" />
                            ) : (
                                <img className='img-fluid' src='https://images.pexels.com/photos/1463376/pexels-photo-1463376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="Default" />
                            )}
                        </div>
                    </div>
                    {/* Add href to link to */}
                </div>
                <div className='card-footer border-top border-danger'>
                    <div className='row'>
                        <div className='col-3'>
                            <h5 style={{ fontSize: '14px' }}>Purchase from</h5>
                            <div className='row'>
                                <div className='col-3'>
                                    {item.saleInfo.buyLink ? (
                                        <a href={item.saleInfo.buyLink} className='card-link btn' style={{ backgroundColor: '#1B1B1F', color: 'white', fontSize: '10px' }}>Google</a>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <h5 style={{ fontSize: '14px' }}>Preview</h5>
                            <div className='row'>
                                <div className='col-3'>
                                    {item.volumeInfo.previewLink ? (
                                        <a href={item.volumeInfo.previewLink} className='card-link btn' style={{ backgroundColor: '#1B1B1F', color: 'white', fontSize: '10px' }}>Preview</a>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='col-3 d-flex'>
                            <button className='btn btn-secondary align-self-center' type='button' onClick={async () => {await handleRemove(params.id, item.id, apiKey, authToken)}}>Remove</button>
                        </div>
                        <div className='col-3 d-flex'>
                            <button className='btn btn-secondary dropdown-toggle align-self-center' type='button' data-bs-toggle='dropdown'>Add to</button>
                            <ul className='dropdown-menu'>
                                {/* Add the correct href attribute here */}
                            {/**began working on dropdown and navlin */}
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 0)}>Favorites</li>
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 2)}>To Read</li>
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 4)}>Have Read</li>
                                <li className='dropdown-item' onClick={() =>  handleAddTo(item.id, authToken, 5)}>Reviewed</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }


    return (
        <div>
            {/* {books.map((book) => (
                <div className='row'>
                    <div className='col-8'>
                        <h5>{book.volumeInfo.title}</h5>
                    </div>
                </div>
                ))
            } */}
            {!books ? (
                null 
            ) : ( 
                renderInfo(books)
            )}
        </div> 

    )

}

export default SearchBooks