import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { AppProps } from 'next/dist/shared/lib/router/router'

const Home: NextPage = () => {
  const [inputNumber, setInputNumber] = useState(0);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Interview Page</title>
        <meta name="description" content="Backend dev. interview task by Jeongwook Oh" />
        <link rel="icon" href="/playbook.ico" />
      </Head>
      <div className={styles.navBar}>
          <h1> Backend Engineer - Jeongwook </h1>
      </div>
      <div className={styles.mainBody}>
        <StringInputForm />
        <hr />
        <TimeInputForm />
        <hr />
        <ImageInputForm />
        <hr />
        <IntInputForm inputNumber={inputNumber} setInputNumber={setInputNumber}/>
        <hr />
        <div className={styles.submitArea}>
          <button className={styles.OKbutton}>Submit</button>
        </div>
      </div>
    </div>
  )
}


const StringInputForm = () => {
  return (
    <div className={styles.inputForm}>
      <label className={styles.labels}>String</label>
      <input className={styles.inputBox}></input>
      <button className={styles.OKbutton}>OK</button>
    </div>
  );
}

const TimeInputForm = () => {
  return (
    <div className={styles.inputForm}>
      <label className={styles.labels}>Time</label>
      <input className={styles.inputBox}></input>
      <button className={styles.OKbutton}>OK</button>
      <button className={styles.OKbutton}>Now</button>
    </div>
  );
}

const ImageInputForm = () => {
  return (
    <div className={styles.inputForm}>
      <label className={styles.labels}>String</label>
      <input className={styles.inputBox}></input>
      <button className={styles.OKbutton}>OK</button>
    </div>
  );
}

const IntInputForm = ( props:any ) => {
  return (
    <div className={styles.inputForm}>
      <label className={styles.labels}>Int</label>
      <span>{props.inputNumber}</span>
      <button className={styles.OKbutton} onClick={()=>{
        props.setInputNumber(props.inputNumber-1);
      }}>-</button>
      <button className={styles.OKbutton} onClick={()=>{
        props.setInputNumber(props.inputNumber+1);
      }}>+</button>
    </div>
  );
}

export default Home
