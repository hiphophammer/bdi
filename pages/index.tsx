import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRef, useState } from 'react'

import { ImageInputForm, StringInputForm } from './components/forms'
import { FetchInt, InsertInput } from './components/db-access'


import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'

const Home: NextPage = () => {
  const stringRef = useRef<HTMLInputElement>(null);
  const [tableContents, setTableContents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const supabase = useSupabaseClient();
  
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
        <StringInputForm stringRef={stringRef}/>
        <hr />
        <ImageInputForm />
        <hr />
        <div className={styles.submitArea}>
          <button 
            className={styles.OKbutton} 
            onClick={
              (e:any) => {
                Submit(supabase, GetInputs((stringRef.current?.value), undefined));
                ()=>{ setShowTable(true) };
            }}
          >
            Submit
          </button>
          <div className={styles.warning}>A string or image is required.</div>
        </div>
        <div className={styles.resultArea}>
          {
            showTable === true ? <TableContentBox /> : null
          }
        </div>
      </div>
    </div>
  )
}

const TableContentBox = () => {
  return (
    <div className={styles.resultAreaBox}>
      
    </div>
  );
}

const GetInputs = (str: string|undefined, image:any):{} => {
  return {string: str, image: image};
}

const Submit = async ( supabase: SupabaseClient, inputs:any ) => {
  const int = await FetchInt( supabase );
  if (int === null) return;
  await InsertInput( supabase, int, inputs );
}

export default Home
