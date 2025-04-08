import React from 'react'

function NoData() {

    return (
        <li className="list-group-item p-0 flex-fill">
            <div className='d-flex flex-column justify-content-center align-items-center text-muted w-100 h-100'>
                <h3 className='mt-3'>No Data Found</h3>
            </div>
        </li>
    )
}

export default NoData
