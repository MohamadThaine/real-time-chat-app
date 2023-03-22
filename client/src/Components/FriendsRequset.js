import cancelFriendRequest from '../api/delete';
import close from '../Assets/Images/close.png';
import { useState } from 'react';
import Pagination from './Pagination';
import '../Assets/Styles/FriendRequest.css'; 
import acceptFriendRequest from '../api/put';

const range = (start, end) => {
    return [...Array(end).keys()].map((element) => element + start)
};

function FriendRequest({requestsList, updateRequestsList, handleClose}){
    const [currentPage, setCurrentPage] = useState(1);
    const [pageRequests, setPageRequests] = useState(requestsList.slice(0 , 5));
    const pagesLength = range(1 ,  Math.ceil(requestsList.length / 5));
    const remove = (e) => {
        const targetedRequestID = e.target.getAttribute("name");
        const userID = e.target.getAttribute("id");
        const ID = targetedRequestID.slice(0, -1);
        updateRequestsList(requestsList.filter(requset => requset.requestID != ID));
        setPageRequests(pageRequests.filter(requset => requset.requestID != ID));
        const isAccepted = targetedRequestID.charAt(targetedRequestID.length - 1);
        handleRequest(isAccepted, targetedRequestID.slice(0, -1), userID);
    };
    function handleRequest(isAccepted , targetedRequestID, userID){
        if(isAccepted == 'y'){
            acceptFriendRequest(targetedRequestID, userID);
        }
        else{
            cancelFriendRequest(targetedRequestID, userID);
        }
    }

    function handleChangePage(page){
        const lastElementInNewPage = page * 5;
        setPageRequests(requestsList.slice(lastElementInNewPage - 5 , lastElementInNewPage));
        setCurrentPage(page);
    }

    return(
        <div className="popupBox">
            <div className='popupWrapper'>
                <img src={close} className="closeIcon" onClick={handleClose} />
                <div className='content'>
                    <p>Friend Requests</p>
                    <div className='requestsList'>
                        <RequestsList requestsList={pageRequests} remove={remove}/>
                    </div>
                    <Pagination pagesLength={pagesLength} currentPage={currentPage} handleChangePage={handleChangePage}/>
                </div>
            </div>
        </div>
    )
}

function RequestsList({requestsList , remove}){
    if(requestsList == null || requestsList.length == 0) return;
    return(
        requestsList.map(request => {
            return <Request key={request.requestID} request={request} remove={remove} />
        })
    )
}

function Request({request , remove}){
    return(
        
        <div className='person'>
            <img src={request.personImg} />
            <p>{request.username}</p>
            <button name={request.requestID + 'y'} id={request.ID} onClick={remove} style={{marginLeft: 70}}>Accept Request</button>
            <button name={request.requestID + 'n'} id={request.ID} onClick={remove}>Remove Requset</button>
        </div> 
    )
}



export default FriendRequest