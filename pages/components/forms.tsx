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
        <span className={styles.imageName}></span>
        <button className={styles.OKbutton}>OK</button>
        </div>
    );
}

export { StringInputForm, ImageInputForm }