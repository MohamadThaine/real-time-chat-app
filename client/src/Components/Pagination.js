import classNames from "classnames" 
import '../Assets/Styles/Pagination.css'; 
function Pagination({pagesLength, currentPage, handleChangePage}) {
    return(
        <ul className='pagination'>
            {pagesLength.map((page) => (
               <Page page={page} pagesLength={pagesLength} currentPage={currentPage} handleChangePage={handleChangePage} />
            ))}
        </ul>
    )
}

function Page({page, currentPage, handleChangePage}){
    const listClasses = classNames({
        'pageItem':true,
        active: page === currentPage
    })
    return(
        <li className={listClasses} onClick={() => handleChangePage(page)}>
            <span className='pageLink'>{page}</span>
        </li>
    )
}
export default Pagination