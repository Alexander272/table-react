import React from 'react'
import { PhotoType } from '../../types/photos'
import { Col } from '../Col/Col'
import classes from './row.module.scss'

type Props = {
    photo: PhotoType
}

export const Row: React.FC<Props> = ({ photo }) => {
    return (
        <div className={classes.row}>
            {Object.keys(photo).map(key => (
                <Col key={key} text={photo[key as keyof PhotoType]} />
            ))}
        </div>
    )
}
