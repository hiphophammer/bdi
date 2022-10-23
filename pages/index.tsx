import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { AppProps } from 'next/dist/shared/lib/router/router'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'

const Home: NextPage = () => {
  const stringRef = useRef<HTMLInputElement>(null);
  const [tableContents, setTableContents] = useState([]);

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
            onClick={(e:any) => Submit(supabase, GetInputs((stringRef.current?.value), undefined))}
          >
            Submit
          </button>
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

const GetInputs = (str: string|undefined, image:any):{} => {
  return {string: str, image: image};
}

const Submit = async ( supabase: SupabaseClient, inputs:any ) => {
  const int = await FetchInt( supabase );
  if (int === null) return;
  await InsertInput( supabase, int, inputs );
}

// get the most recent Int from the table
// run this query and return value if not null
// SELECT number FROM dummy ORDER BY number DESC LIMIT 1;
const FetchInt = async ( supabase: SupabaseClient ) => {
  const t0 = performance.now();
  let { data, error } = await supabase
    .from( 'dummy' )
    .select( 'number' )
    .order( 'number', { ascending: false } )
    .limit( 1 );
  const t1 = performance.now();
  console.log(`Fetched Int from the table. Time elapsed: ${(t1-t0)} ms`);
  if ( error !== null ) { alert(`Error ${error.code}: ${error.message}`); return null; }
  if ( data !== null ) return ( data.length === 0 ? 0 : data[0].number );
  else return null;
}

const InsertInput = async ( supabase: SupabaseClient, int: number, inputs: any ) => {
  const t0 = performance.now();
  let { error } = await supabase
    .from( 'dummy' )
    .insert([{
      timestamp: formatDate(new Date()), 
      string: inputs.string,
      number: int + 1
    }]);
  const t1 = performance.now();
  console.log(`Inserted input to the table. Time elapsed: ${(t1-t0)} ms`);
  if ( error !== null ) { alert(`Error ${error.code}: ${error.message}`); return null; }
  else alert('Stored on the server!');
}


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

// output date format example: '2022-10-23 16:12:38' (SQL format)
const formatDate = ( raw:Date ):string => {
  return raw.toISOString().slice(0, 19).replace('T', ' ')
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
export default Home
