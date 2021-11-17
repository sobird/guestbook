import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <h1>First Post</h1>
      <h2><Link href="/"><a className="back-to-home">Back to home</a></Link></h2>
    </Layout>
  )
}