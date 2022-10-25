import styles from '../../styles/Home.module.css'
import { useCallback, useState } from 'react'
import Image from 'next/image'

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
    const purgeInput = () => {
        props.setUseUpload(!props.useUpload);
        props.setImageUploadHook(null);
        props.imageUrlRef.current.value = '';
    }

    const handleUpload = useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        props.setImageUploadHook(e.target.files[0]);
    },[]);

    return (
        <div className={styles.inputForm}>
            <label className={styles.labels}>Image</label>
            <div className={styles.imageName}></div>
            <input 
                type='file' 
                accept="image/*"
                onChange={handleUpload}
                style={{display: (props.useUpload ? 'block' : 'none'), marginBottom: '15px'}}>
            </input>
            <div style={{display: (props.useUpload ? 'none' : 'block'), marginBottom: '5px'}}> URL:</div>
            <input 
                className={styles.inputBox}
                style={{display: (props.useUpload ? 'none' : 'block')}}
                ref={props.imageUrlRef}
            ></input>
            <Image 
                alt='Preview image'
                src={(!props.imageUploadHook ? '' : URL.createObjectURL(props.imageUploadHook))}
            />
            <button 
                className={styles.OKbutton} 
                onClick={()=>{ purgeInput() }}
                style={{display: 'block', marginTop: '5px'}}>
                {(props.useUpload ? 'URL' : 'Upload')}
            </button>
        </div>
    );
}

const TableContentBox = ( props:any ) => {
    const showImage = true;
    return (
        <div className={styles.resultAreaBox}>
        {
            props.tableContents.map( (row: { number: number; timestamp: string; string: string; image:any ; }) => {
            return (
            <div className={styles.rowDiv} key={row.number}>
                <div>
                    {`${row.number} ${row.timestamp.replace('T', ' ')}  ${(row.string==='' ? '(No string)' : row.string)}`}
                </div>
                <TableRow row={row} />
            </div>
            )})
        }
        </div>
    );
}

const TableRow = ( props:any ) => {
    const [showImage, setShowImage] = useState<boolean>(false);
    return (
    <div>
        <div>
            <span
                className={ showImage ? styles.plainText :styles.imageDescriptor }
                onClick={ ()=>{ setShowImage(!showImage) } }
            >
                {props.row.image === '' ? 'No image' : ( showImage ? 'Click to hide' : 'Image: click to expand')}
            </span>
        </div>
        <div>
            <Image 
                src={ props.row.image === '' ? '' : props.row.image }
                alt='image'
                style={{display: ( !showImage ? 'none' : 'block' )}}
            />
        </div>
    </div>


    );
}


export { StringInputForm, ImageInputForm, TableContentBox }