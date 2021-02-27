import React, { useCallback, useEffect, useState } from 'react'
import { Row } from './components/Row/Row'
import { TableHeader } from './components/TableHeader/TableHeader'
import { PhotoType } from './types/photos'

const step = 5

function App() {
    const [photos, setPhotos] = useState<PhotoType[] | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
            const data = await res.json()
            setPhotos(data)
        } catch (error) {}
    }, [])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    const renderPagination = () => {
        let btns = []
        for (let i = 0; i < photos!.length; i = i + step) {
            btns.push(
                <div
                    key={i / step}
                    className={`btn ${currentPage === i / step + 1 ? 'btn__active' : null}`}
                >
                    <p className="btn__text">{i / step + 1}</p>
                </div>
            )
        }
        return btns
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="table__container">
                    <div className="table__header">
                        {photos &&
                            Object.keys(photos[0]).map(key => <TableHeader key={key} text={key} />)}
                    </div>
                    {photos && photos.map(p => <Row key={p.id} photo={p} />)}
                </div>
                {photos && photos.length > step && (
                    <div className="bottomBar">{renderPagination()}</div>
                )}
            </div>
        </div>
    )
}

export default App
