import React, { useCallback, useEffect, useState } from 'react'
import { Row } from './components/Row/Row'
import { TableHeader } from './components/TableHeader/TableHeader'
import { PhotoType } from './types/photos'

const step = 5

type FilterState = {
    title: string | null
    sort: string
}

function App() {
    const [photos, setPhotos] = useState<PhotoType[] | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState<FilterState>({
        title: null,
        sort: 'asc',
    })

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

    const changePageHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const { page } = (event.target as HTMLDivElement).dataset
        page && setCurrentPage(+page)
    }

    const filterHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const { title } = (event.target as HTMLDivElement).dataset
        if (title) {
            title === filter.title
                ? setFilter(prev => ({ ...prev, sort: 'desc' }))
                : setFilter({ title, sort: 'asc' })
            setPhotos(prev => {
                const newState = prev
                newState?.sort((a, b) => {
                    if (title === 'id' || title === 'albumId') {
                        return a[title] - b[title]
                    } else if (title === 'title' || title === 'url' || title === 'thumbnailUrl') {
                        let A = a[title].toLowerCase(),
                            B = b[title].toLowerCase()
                        if (A < B) return -1
                        if (A > B) return 1
                        return 0
                    }
                    return 0
                })
                if (title === filter.title) return newState?.reverse() || []
                return newState || []
            })
        }
    }

    const renderPagination = () => {
        let btns = []
        for (let i = 0; i < photos!.length; i = i + step) {
            btns.push(
                <div
                    key={i / step}
                    className={`btn ${currentPage === i / step + 1 ? 'btn__active' : null}`}
                    data-page={i / step + 1}
                    onClick={changePageHandler}
                >
                    <p className="btn__text">{i / step + 1}</p>
                </div>
            )
        }
        return btns
    }

    const renderRow = () => {
        if (photos) {
            let newPhotos = photos.concat()
            newPhotos.copyWithin(0, (currentPage - 1) * step, (currentPage - 1) * step + step)
            newPhotos.splice(step)
            return newPhotos.map(p => <Row key={p.id} photo={p} />)
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="table__container">
                    <div className="table__header">
                        {photos &&
                            Object.keys(photos[0]).map(key => (
                                <TableHeader
                                    onClick={filterHandler}
                                    key={key}
                                    text={key}
                                    icon={filter.title === key ? filter.sort : null}
                                />
                            ))}
                    </div>
                    {photos && renderRow()}
                </div>
                {photos && photos.length > step && (
                    <div className="bottomBar">{renderPagination()}</div>
                )}
            </div>
        </div>
    )
}

export default App
