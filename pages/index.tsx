import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { AppProps } from 'next/dist/shared/lib/router/router'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'

const Home: NextPage = () => {
  const [inputString, setInputString] = useState("");
  const [useNow, setUseNow] = useState(true);
  const [inputDate, setInputDate] = useState(new Date());
  const [inputNumber, setInputNumber] = useState(0);

  const supabase = useSupabaseClient()
  
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
        <TimeInputForm inputDate={inputDate} setInputDate={setInputDate} useNow={useNow} setUseNow={setUseNow}/>
        <hr />
        <ImageInputForm />
        <hr />
        <IntInputForm inputNumber={inputNumber} setInputNumber={setInputNumber}/>
        <hr />
        <div className={styles.submitArea}>
          <button className={styles.OKbutton} onClick={(e:any) => Submit(supabase, GetInputs(inputString, inputDate, undefined, inputNumber))}>Submit</button>
        </div>
        <hr />
        <div className={styles.resultArea}>
          <div className={styles.resultAreaBox}>

          </div>
        </div>
      </div>
    </div>
  )
}

const GetInputs = (str: String, date:Date, image:any, number:Number):{} => {
  return {string: str, timestamp: formatDate(date), image: image, number: number};
}

const Submit = async ( supabase: SupabaseClient, inputs:any ) => {
  await supabase
    .from('dummy')
    .insert([{ timestamp: inputs.timestamp, 
               string: inputs.string,
               number: inputs.number
               }])
    alert('Inserted!');
}


const StringInputForm = ( props:any ) => {
  return (
    <div className={styles.inputForm}>
      <label className={styles.labels}>String</label>
      <input className={styles.inputBox}></input>
    </div>
  );
}

// output date format example: '2022-10-23 16:12:38' (SQL format)
const formatDate = ( raw:Date ):string => {
  return raw.toISOString().slice(0, 19).replace('T', ' ')
}

const TimeInputForm = ( props:any ) => {
  return (
    <div className={styles.inputForm}>
      <label className={styles.labels}>Time (UTC)</label>
      <input className={styles.inputBox} placeholder={formatDate(props.inputDate)}/>
      <input className={styles.checkBox} 
             type='checkbox'
             onClick={()=>{
                props.setUseNow(!props.useNow);
             }} 
             checked={props.useNow}/><span> Use Date.now() as timestamp</span>
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
