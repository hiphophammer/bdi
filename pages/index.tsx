import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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
        <div className={styles.inputForm}>
          <label className={styles.labels}>String</label>
          <input className={styles.inputBox}></input>
          <button className={styles.OKbutton}>OK</button>
        </div>
        <hr />
      </div>
    </div>
  )
}


const Form = () => {

}

export default Home
