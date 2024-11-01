export const Pagination = ({totalPages, onSetPage, page}) => {
    return (
        <div className="pagination">
            {[...Array(totalPages)].map((_, idx)=> (<div className='pageNumber' key={idx} style={{backgroundColor: page === idx + 1 ? ' #007bff' : 'white' }} onClick={() => onSetPage(idx + 1)}> {idx + 1} </div>))}
        </div>
    )
}