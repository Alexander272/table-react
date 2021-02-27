import React, { ReactText } from 'react'
import classes from './col.module.scss'

type Props = {
    text: ReactText
}

export const Col: React.FC<Props> = ({ text }) => {
    return <p className={classes.col}>{text}</p>
}
