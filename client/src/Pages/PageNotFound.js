import React from 'react';
import { useNavigate } from 'react-router-dom';
import error from '../Assets/Images/404-error.png';
import '../Assets/Styles/PageNotFound.css'; 
 

function PageNotFound(){
    const navigate = useNavigate()
    return(
        <div className="wrapper">
            <div className='errorElements'>
            <img src={error} />
                <p className='erorrMessage'>
                    Page not found!
                </p>
                <a onClick={() => navigate('/')}>
                    Go to Main Page
                </a>
            </div>
            
            </div>
    )
    
}

export default PageNotFound