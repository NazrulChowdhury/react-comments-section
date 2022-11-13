import React from 'react'
import styles from '../Style.scss'
const Spinner = () => {
    return (
        <div className={styles["pos-center"]}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Spinner;