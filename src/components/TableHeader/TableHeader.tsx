import React from 'react'
import classes from './tableHeader.module.scss'

type Props = {
    text: string
    icon: string | null
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const TableHeader: React.FC<Props> = ({ text, icon, onClick }) => {
    return (
        <div onClick={onClick} data-title={text} className={classes.header}>
            <p className={classes.title}>
                {text}{' '}
                {icon ? (
                    icon === 'asc' ? (
                        <span className={classes.icon}>&#9650;</span>
                    ) : (
                        <span className={classes.icon}>&#9660;</span>
                    )
                ) : null}
            </p>
        </div>
    )
}
