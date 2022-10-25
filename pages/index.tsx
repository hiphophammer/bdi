import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRef, useState } from 'react'

import { ImageInputForm, StringInputForm, TableContentBox } from '../components/forms'
import { FetchInt, FetchTable, InsertInput } from '../components/db-access'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Home: NextPage = () => {
  const stringRef = useRef<HTMLInputElement>(null);
  const rowLimitRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const [imageUploadHook, setImageUploadHook] = useState<File | null>(null);
  const [useUpload, setUseUpload] = useState<boolean>(true);
  const [tableContents, setTableContents] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const supabase = useSupabaseClient();

  interface inputObject {
    string:string|undefined;
    image:{upload:boolean; imageDesc:File|string|null|undefined }
  }

  const GetInputs = ( str: string|undefined, useUpload:boolean, image:File|string|null|undefined ):inputObject => {
    return {
      string: str,
      image: {
        upload: useUpload, 
        imageDesc: image
      }
    };
  }

  const SubmitHandler = async (
    inputs: inputObject,
    nRowsStr: string | undefined,
  ) => {
    // reset warning
    setShowWarning(false);
    if (inputs.string === '' && (!inputs.image.imageDesc) ) { setShowWarning(true); return; }
    const nRows = Number(nRowsStr);
    if (isNaN(nRows) || nRows < 0) { alert('Not a valid entry for number of rows!'); return; }
    if (nRows > 1000) { alert('Number of rows cannot exceed 1000!'); return; }
    // get the largest entry # from the table
    const int = await FetchInt(supabase);
    if (int === null) return;
    // insert entry to the table
    await InsertInput(supabase, int, inputs);
    // wait to fetch table
    const data = await FetchTable(supabase, nRows);
    if (data === null) { alert(`Error fetching table!`); return; }
    // then update the content for display box
    await PopulateContent(data);
  }

  const PopulateContent = async( data:any[] ) => {
    let contents = [];
    for (const rowContent of data) {
      contents.push(rowContent);
    }
    // contents will be an array of objects
    console.log( contents );
    setTableContents( contents );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Interview Page</title>
        <meta name="description" content="Backend dev. interview task by Jeongwook Oh" />
        <link rel="icon" href="/playbook.ico" />
      </Head>
      <div className={styles.navBar}>
          <h1> Backend </h1>
      </div>
      <div className={styles.mainBody}>
        <StringInputForm stringRef={stringRef}/>
        <hr />
        <ImageInputForm imageUploadHook={imageUploadHook} setImageUploadHook={setImageUploadHook} imageUrlRef={imageUrlRef} useUpload={useUpload} setUseUpload={setUseUpload} />
        <hr />
        <div className={styles.submitArea}>
          <div>Maximum rows to display:</div>
          <input className={styles.queryInputBox} ref={rowLimitRef} defaultValue={10}></input>
          <button 
            className={styles.OKbutton} 
            onClick={
              (e) => {
                const input:inputObject = GetInputs( stringRef.current?.value, useUpload, (useUpload ? imageUploadHook : imageUrlRef.current?.value) );
                SubmitHandler(input, rowLimitRef.current?.value);
                setShowTable(true);
            }}
          >
            Submit
          </button>
          <div 
            className={styles.warning} 
            style={{display: (showWarning ? 'block' : 'none')}}>
              A string or image is required!
          </div>
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

export default Home
