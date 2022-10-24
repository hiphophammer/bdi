import styles from '../../styles/Home.module.css'
import { useState } from 'react'

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

const ImageInputForm = ( props:any ) => {
    const [imgSrcTest, changeSrcImgTest] = useState('');

    return (
        <div className={styles.inputForm}>
            <label className={styles.labels}>Image</label>
            <div className={styles.imageName}></div>
            <input 
                type='file' 
                accept="image/*"
                ref={props.imageUploadRef}
                style={{display: (props.useUpload ? 'block' : 'none'), marginBottom: '15px'}}>
            </input>
            <div style={{display: (props.useUpload ? 'none' : 'block'), marginBottom: '5px'}}> URL:</div>
            <input 
                className={styles.inputBox}
                style={{display: (props.useUpload ? 'none' : 'block')}}
                ref={props.imageUrlRef}
            ></input>
            <button 
                className={styles.OKbutton} 
                onClick={()=>{ props.setUseUpload(!props.useUpload) }}
                style={{display: 'block', marginTop: '5px'}}>
                {(props.useUpload ? 'URL' : 'Upload')}
            </button>
            <button
                onClick={()=>{ changeSrcImgTest(props.imageUrlRef.current.value) }}
                style={{marginTop: '10px'}}
            >
                ㅇㅅㅇ
            </button>
            <img 
                src={imgSrcTest}
                style={{display: ( props.imgUrlRef === '' ? 'none' : 'block' )}}
            >
            </img>
        </div>
    );
}

const TableContentBox = ( props:any ) => {
    return (
        <div className={styles.resultAreaBox}>
            {
                props.tableContents.map( (row: { number: number; timestamp: string; string: string; image: {}; }) => {
                    return (
                        <div className={styles.rowDiv}>
                            <div>
                                {`${row.number}\t${row.timestamp.replace('T', ' ')}\t\t${(row.string==='' ? '(Empty string)' : row.string)}`}
                            </div>
                            <div>
                                <span
                                    className={styles.imageDescriptor}
                                    OnClick={()=>{}}
                                >
                                    {row.image === null ? 'No image' : 'Image: click to expand'}
                                </span>
                            </div>
                            <div>
                                <img />
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    );
}


export { StringInputForm, ImageInputForm, TableContentBox }