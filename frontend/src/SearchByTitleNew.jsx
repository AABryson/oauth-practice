import React, {useState, useContext} from 'react'
import axios from 'axios'
import ContextObject from './ContextObject'
import {NavLink} from 'react-router-dom'
import './SearchByTitleNew.css'


 //need form, handleSubmit, onChange, api endpoint, how do I show then the .preview in google bsooks, need img, title, author

function SearchByTitleNew() {
    console.log('SearchByAuthor page')
    
    const {title, setTitle} = useContext(ContextObject)
    const [input, setInput] = useState('')
    const {authToken} = useContext(ContextObject)
    const [addingBook, setAddingBook] = useState(false)


    let BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

    const apiKey = 'AIzaSyBZR1XenESLwQpCZDFvClClUHijprCS7D4';

    async function handleSubmit(evt) {
        evt.preventDefault()

        let response = await axios.get(`${BASE_URL}intitle:${input}&maxResults=40&key=AIzaSyCb0W-9jMh6sviCF2ugUnLp_Sc-D5Z0sWI`)

        setTitle(response.data.items)
        setInput('')  
    }
    
    function handleChange(evt) {
        let value = evt.target.value
        setInput(value)
    }

    async function handleAddTo(id, authToken, num) {
        //prevent duplicate calls
        if (addingBook) return; 
        //set state to show adding a book
        setAddingBook(true); 
    
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
    
        } catch (error) {
            console.error('Error adding book:', error);
        
        } finally {
        
            setAddingBook(false); 
        }
    }

    function renderInfo(item) {
        return title.map((item, index) => (
            <div className='card text-start ms-5 me-5' style={{ backgroundColor: 'rgb(242, 242, 242, 0.7)', marginBottom: '12px', marginLeftmarginRight: '40px', width: '92%'}} key={index}>
                <div className='card-body col-12' style={{maringRight:'3100x'}}>
                    {console.log('item returned', item)}
                    <h4 className='card-title' id='cardTitle'>{item.volumeInfo.title}</h4>
                    <h5 className='card-title' id='cardTitle'>{item.volumeInfo.subtitle}</h5>
                    <h5 className='card-subtitle mb-2' id='cardSubTitle'>{item.volumeInfo.authors}</h5>

                    <div className='row'>
                        <div className='col-xs-12 col-sm-9 mx-3' style={{borderLeft: 'solid black 2px'}}>
                            <p className='card-text' >{item.volumeInfo.description}</p>
                        </div>
                        <div className='col-xs-12 col-sm-2 text-center'>
                            {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? (
                                <img src={item.volumeInfo.imageLinks.thumbnail} alt="Thumbnail" />
                            ) : (
                                null
                            )}
                        </div>
                    </div>

                    <div className='row pt-2' style={{height:'30px'}}>
                        <div className='col-4'>
                            {item.volumeInfo.averageRating ? (
                                <div>
                                    <p style={{color:'#858585'}}>Average rating: {item.volumeInfo.averageRating}</p>
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
                                            <a href={item.saleInfo.buyLink} className='card-link btn' id='cardLinkBtn'>Google</a>
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
        
        // </div>
    <>
    <div className='container-fluid text-center p-0' id='backgroundColor'>
        <div className='row'>
            {!title ? (
                <h3 className='pt-4'>Search by title</h3>
            ) : (null)
            }
        </div>
        <div className='row pb-4'>
        
            <form onSubmit={handleSubmit}>
                <div id='handleSubmit'>
                    <label htmlFor='Title' id='labelTitle'>Title</label>
                    <input type='text' id='inputTitle' value={input} onChange={handleChange} name='title'/>
                        <button className='btn btn-light' id='searchButton' type='submit'>Search</button>
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
            </>
        ) : (
            null
        )}
        </div>
    </div>
    </>
    )
}

export default SearchByTitleNew
