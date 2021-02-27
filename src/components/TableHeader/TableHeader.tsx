import React from 'react'
import classes from './tableHeader.module.scss'

type Props = {
    text: string
}

export const TableHeader: React.FC<Props> = ({ text }) => {
    return (
        <div className={classes.header}>
            <p className={classes.title}>{text}</p>
        </div>
    )
}
