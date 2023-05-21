import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { Tasks } from '@/components/Tasks'
import Guides from '@/components/Guides'

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
        {/* <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing /> */}

        {/* <Faqs /> */}
      </main>
      <Footer />
    </>
  )
}
