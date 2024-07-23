
import React, {useState, useContext} from 'react'
import axios from 'axios'
import ContextObject from './ContextObject'
import {NavLink} from 'react-router-dom'


 //need form, handleSubmit, onChange, api endpoint, how do I show then the .preview in google books, need img, title, author

function SearchByTitle() {
    console.log('SearchByAuthor page')
    
    const { title, setTitle } = useContext(ContextObject)
    const [input, setInput] = useState('')
    const { authToken } = useContext(ContextObject)
    const [addingBook, setAddingBook] = useState(false)


    let BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

    const apiKey = 'AIzaSyBZR1XenESLwQpCZDFvClClUHijprCS7D4';
   


    async function handleSubmit(evt) {
        evt.preventDefault()

        let response = await axios.get(`${BASE_URL}intitle:${input}&maxResults=40&key=AIzaSyCb0W-9jMh6sviCF2ugUnLp_Sc-D5Z0sWI`)
        console.log('response from title api call', response.data.items)
        console.log('response.data from title api call', response.data)

        setTitle(response.data.items)
        setInput('')
    }
    
    function handleChange(evt) {
        let value = evt.target.value
        setInput(value)
    }

    console.log('what is in author state', title)

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

    function renderInfo(item) {
        return title.map((item, index) => (
            <div className='card text-start' style={{ backgroundColor: 'rgb(242, 242, 242, 0.7)', marginBottom: '12px' }} key={index}>
                <div className='card-body col-12'>
                    {console.log('item returned', item)}
                    <h4 className='card-title' style={{ fontFamily: 'garamond', fontWeight: '400' }}>{item.volumeInfo.title}</h4>
                    <h5 className='card-title' style={{ fontFamily: 'garamond', fontWeight: '400' }}>{item.volumeInfo.subtitle}</h5>
                    <h5 className='card-subtitle mb-2' style={{ color: '#a84343', fontFamily: 'calisto' }}>{item.volumeInfo.authors}</h5>
                    <div className='row'>
                        {/* <div className='col-1 border-start p-1'></div> */}
                        <div className='col-10' style={{ borderLeft: 'solid black 2px' }}>
                            <p className='card-text' >{item.volumeInfo.description}</p>
                        </div>
                        <div className='col-2 text-center'>
                            {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? (
                                <img src={item.volumeInfo.imageLinks.thumbnail} alt="Thumbnail" />
                            ) : (
                                <img className='img-fluid' src='https://images.pexels.com/photos/1463376/pexels-photo-1463376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="Default" />
                            )}
                        </div>
                    </div>
            
                    <div className='row pt-3'>
                        <div className='col 4'>
                            {item.volumeInfo.averageRating ? (
                                <div>
                                    <p style={{ color: '#858585' }}>Average rating: {item.volumeInfo.averageRating}</p>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>

                </div>
                <div className='card-footer border-top border-danger'>
                    <div className='row'>
                        <div className='col-4'>
                        
                            {item.saleInfo.buyLink ? (
                                <>
                                    <h5 style={{ fontSize: '14px' }}>Purchase from</h5>
                                
                                    <div className='row'>
                                        <div className='col-3'>
                                        
                                            <a href={item.saleInfo.buyLink} className='card-link btn' style={{ backgroundColor: '#1B1B1F', color: 'white', fontSize: '10px' }}>Google</a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                null)}
                        </div>
                        
                        <div className='col-2 d-flex'>
                            {item.volumeInfo.previewLink ? (
                        
                                <a href={item.volumeInfo.previewLink} className='btn btn-secondary align-self-center' role='button'>Preview</a>

                            ) : null}
                        </div>
                                            
                        <div className='col-2 d-flex'>
                            <button className='btn btn-secondary dropdown-toggle align-self-center' type='button' data-bs-toggle='dropdown'>Add to</button>
                            <ul className='dropdown-menu'>
                                {/* Add the correct href attribute here */}
                                {/**began working on dropdown and navlin */}
                                <li className='dropdown-item' onClick={() => handleAddTo(item.id, authToken, 0)}>Favorites</li>
                                <li className='dropdown-item' onClick={() => handleAddTo(item.id, authToken, 2)}>To Read</li>
                                <li className='dropdown-item' onClick={() => handleAddTo(item.id, authToken, 4)}>Have Read</li>
                                <li className='dropdown-item' onClick={() => handleAddTo(item.id, authToken, 5)}>Reviewed</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        
        <div className='container-fluid text-center p-0' style={{ backgroundColor: "#616E81"} } >
            <div className='row'>
            {!title ? (
                <h3 className='pt-3'>Search by title</h3>
            ) : (null)
            }
            </div>

            <div className='row'>
                <form onSubmit={handleSubmit}>
                    <div style={{ paddingTop: '20px' }}>
                        <label htmlFor='author' style={{marginLeft:'10px', fontSize:'24px', fontWeight:'500'}}>Title</label>
                        <input type='text' id='author' value={input} onChange={handleChange} name='author' style={{marginLeft:'15px', width:'400px'}}/>
                            <button className='btn btn-light' type='submit' style={{marginLeft:'20px'}}>Search</button>
                    </div>
                </form>
            </div>
        {!title ? (
            <div className='row pt-5' style={{width:'1500px'}}>
                <div className='col-2'>
                    <img src='https://cdn.kobo.com/book-images/991a4795-830b-43b3-8482-33af4d2482ff/1200/1200/False/metamorphoses-36.jpg' style={{width:'200px', height: '270px'}} />
                </div>
                <div className='col-2'>
                    <img src='https://m.media-amazon.com/images/I/71AsH3txYwL._AC_UF1000,1000_QL80_.jpg' style={{width:'200px', height: '270px'}} />
                </div>
                <div className='col-2'>
                    <img src='https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1344922523i/1953.jpg' style={{width:'200px', height: '270px'}} />
                </div>
                <div className='col-2'>
                    <img src='https://www.wtsbooks.com/cdn/shop/products/9780199537822_391x.jpg?v=1598630829' style={{width:'200px', height: '270px'}}></img> 
                </div>
                <div className='col-2'>
                    <img src='https://m.media-amazon.com/images/I/71dBIm2xbiL._AC_UF1000,1000_QL80_.jpg' style={{width:'200px', height: '270px'}}></img> 
                </div>
                <div className='col-2'>
                    <img src='https://m.media-amazon.com/images/I/71yV4eBo2fL._AC_UF1000,1000_QL80_.jpg' style={{width:'200px', height: '270px'}}></img> 
                </div>
            </div>
            ) : (
                null
            )}
            <div className='row'>
                {title ? (
                    <>
                    {renderInfo(title)}
                    {/* <p style={{ marginLeft: '20px' }}>{author.description}</p> */}
                    </>
                    ) : (
                    null
                )}
            </div>
        </div>
            
    )
}

export default SearchByTitle


