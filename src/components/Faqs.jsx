import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Is Mesh AI reading Discord messages?',
      answer:
        'Yes. Mesh AI is reading messages in your Discord server where you have allow it to be to learn from the conversation.',
    },
    {
      question: 'Can I train the knowledge base?',
      answer:
        'Absolutely! All replies, thumbs up and thumbs down (a total of 20 emojis) are used to train the knowledge base. Just use Discord how you used to!',
    },
    //   {
    //     question: 'How do I apply for a job at TaxPal?',
    //     answer:
    //       'We only hire our customers, so subscribe for a minimum of 6 months and then let’s talk.',
    //   },
    // ],
    // [
    //   {
    //     question: 'What was that testimonial about tax fraud all about?',
    //     answer:
    //       'TaxPal is just a software application, ultimately your books are your responsibility.',
    //   },
    //   {
    //     question:
    //       'TaxPal sounds horrible but why do I still feel compelled to purchase?',
    //     answer:
    //       'This is the power of excellent visual design. You just can’t resist it, no matter how poorly it actually functions.',
    //   },
    //   {
    //     question:
    //       'I found other companies called TaxPal, are you sure you can use this name?',
    //     answer:
    //       'Honestly not sure at all. We haven’t actually incorporated or anything, we just thought it sounded cool and made this website.',
    //   },
    // ],
    // [
    //   {
    //     question: 'How do you generate reports?',
    //     answer:
    //       'You just tell us what data you need a report for, and we get our kids to create beautiful charts for you using only the finest crayons.',
    //   },
    //   {
    //     question: 'Can we expect more inventory features?',
    //     answer: 'In life it’s really better to never expect anything at all.',
    //   },
    //   {
    //     question: 'I lost my password, how do I get into my account?',
    //     answer:
    //       'Send us an email and we will send you a copy of our latest password spreadsheet so you can find your information.',
    //   },
  ],
  [
    {
      question: 'How this project is developed?',
      answer: (
        <>
          This project is developed by{' '}
          <a href="https://jingles.dev/" rel="noreferrer" target="_blank">
            Jingles
          </a>{' '}
          from{' '}
          <a href="https://meshjs.dev/" rel="noreferrer" target="_blank">
            Mesh SDK
          </a>{' '}
          and supported by Felix Weber from Catayst Swarm.
        </>
      ),
    },
    {
      question: 'How this project is funded?',
      answer: (
        <>
          This project is funded by Deep Funding, you can check the{' '}
          <a
            href="https://deepfunding.ai/proposal/gpt-for-snet-cardano/"
            rel="noreferrer"
            target="_blank"
          >
            proposal here
          </a>
          .
        </>
      ),
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          {/* <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p> */}
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
