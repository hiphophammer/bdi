import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRef, useState } from 'react'

import { ImageInputForm, StringInputForm, TableContentBox } from './components/forms'
import { FetchInt, FetchTable, InsertInput } from './components/db-access'


import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'

const Home: NextPage = () => {
  const stringRef = useRef<HTMLInputElement>(null);
  const queryLimitRef = useRef<HTMLInputElement>(null);
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
          <div>Number of rows to display:</div>
          <input className={styles.queryInputBox} ref={queryLimitRef} defaultValue={5}></input>
          <button 
            className={styles.OKbutton} 
            onClick={
              (e:any) => {
                SubmitHandler(supabase, GetInputs(stringRef.current?.value, undefined), queryLimitRef.current?.value, setTableContents);
                setShowTable(true);
            }}
          >
            Submit
          </button>
          <div className={styles.warning}>A string or image is required!</div>
        </div>
        <div className={styles.resultArea}>
          {
            showTable === true ? <TableContentBox tableContents={tableContents} /> : null
          }
        </div>
      </div>
    </div>
  )
}

const GetInputs = ( str: string|undefined, image:any ):{} => {
  return {string: str, image: image};
}

const SubmitHandler = async (
      supabase:SupabaseClient, 
      inputs:any, 
      nRowsStr:string|undefined, 
      setTableContents
  ) => {
  const nRows = Number( nRowsStr );
  if ( isNaN( nRows ) || nRows < 0 ) { alert('Not a valid entry for number of rows!'); return; }
  if ( nRows > 1000 ) { alert('Number of rows cannot exceed 1000!'); return; }
  // get the largest entry # from the table
  const int = await FetchInt( supabase );
  if (int === null) return;
  // insert entry to the table
  await InsertInput( supabase, int, inputs );
  // wait to fetch table
  const data = await FetchTable( supabase, nRows );
  if (data === null) { alert( `Error fetching table!` ); return; }
  // then update the content for display box
  await PopulateContent( data, setTableContents );
}

const PopulateContent = async( data, setTableContents ) => {
  let contents = [];
  for (const rowContent of data) {
    contents.push(rowContent);
  }
  // contents will be an array of objects
  console.log(contents);
  setTableContents(contents);
}

export default Home
