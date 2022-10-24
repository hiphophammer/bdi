import styles from '../../styles/Home.module.css'

const StringInputForm = ( props:any ) => {
    return (
        <div className={styles.inputForm}>
            <label className={styles.labels}>String</label>
            <input 
                className={styles.inputBox}
                ref={props.stringRef}
            ></input>
        </div>
    );
}

const ImageInputForm = () => {
    return (
        <div className={styles.inputForm}>
            <label className={styles.labels}>Image</label>
            <div className={styles.imageName}></div>
            <button className={styles.OKbutton}>Upload</button>
        </div>
    );
}

const TableContentBox = ( props:any ) => {
    return (
        <div className={styles.resultAreaBox}>
            {
                props.tableContents.map( row => {
                    return (
                        <div className={styles.rowDiv}>
                            {`${row.number}\t${row.timestamp}\t\t${(row.string==='' ? '(Empty string)' : row.string)}`}
                        </div>
                    )
                })
            }
        </div>
    );
}


export { StringInputForm, ImageInputForm, TableContentBox }