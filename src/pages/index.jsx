import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Tasks } from '@/components/Tasks'
import Guides from '@/components/Guides'
import Funded from '@/components/Funded'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mesh AI - Knowledge made accessible on Cardano</title>
        <meta
          name="description"
          content="Get the Discord intergrated AI to learn knowledge in your community"
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Guides />
        <Tasks />
        <Funded />
      </main>
      <Footer />
    </>
  )
}
