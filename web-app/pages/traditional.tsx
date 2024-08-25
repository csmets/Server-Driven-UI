/*
  Example showcasing a typical/traditional react web app.

  This is used to show the difference between your typical app
  versus a server-driven UI app.

  This feed page is suppose to look and feel like the SDUI feed
  page found in `index.tsx`.

  All of the traditional methods are kept with the `./traditional`
  directory.
*/
import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link'

import { TraditionalFeedView } from "./traditional/index";
import styles from '../styles/Home.module.css';

export default function Traditional() {
  return (
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <div>
              <TraditionalFeedView />
              <p>
                Read{' '}
                <Link href="/about">about page!</Link>
              </p>
              <p>
                <Link href="/hacker-news">Hacker News top stories</Link>
              </p>
              <p>
                <Link href="/kitchen-sink">Kitchen sink</Link>
              </p>
            </div>
          </main>

          <footer className={styles.footer}>
            <p>Example SDUI application</p>
          </footer>
        </div>
  )
}