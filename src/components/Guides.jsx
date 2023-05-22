import { Button } from '@/components/Button'
import Image from 'next/image'
import imageInitMesh from '@/images/meshai/initmesh.png'
import imageAskquestion from '@/images/meshai/askquestion.png'
import imageTrain from '@/images/meshai/train.png'
import imageFineTune from '@/images/meshai/fine-tune.png'
import imageReplyuser from '@/images/meshai/replyuser.png'

export default function Guides() {
  return (
    <section id="guides" className="relative overflow-hidden bg-slate-50">
      <div className="relative isolate overflow-hidden bg-white py-24">
        <div
          className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)',
            }}
          />
        </div>
        <div className="px-6 py-32 lg:px-8">
          <GetStarted />
          <AskQuestions />
          <FineTune />
        </div>
      </div>
    </section>
  )
}

function GetStarted() {
  return (
    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Get Started
      </h1>

      <div className="mt-10 max-w-2xl">
        <p className="my-4">
          To get started, invite Mesh AI to your Discord server:
        </p>

        <Button href="https://discord.com/api/oauth2/authorize?client_id=1091605083621441606&permissions=85056&scope=applications.commands%20bot">
          Invite Mesh AI
        </Button>

        <p className="my-4">
          After you've invited Mesh AI to your server, you'll need to initialize
          the bot. To do this, run the following command in a channel that Mesh
          AI has access to in your Discord server:
        </p>

        <p className="my-4">
          <code>!initmesh</code>
        </p>

        <p className="my-4">
          Mesh AI will respond with a welcome message! You can now start using
          Mesh AI in your Discord server.
        </p>

        <Image
          className="rounded-lg bg-gray-50 object-cover"
          src={imageInitMesh}
          width={768}
          height={512}
          alt=""
        />
      </div>
    </div>
  )
}

function AskQuestions() {
  return (
    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Ask any questions
      </h1>

      <p className="my-4">To ask any question, just type the command:</p>

      <p className="my-4">
        <code>/ask</code>
      </p>

      <p className="my-4">
        Users might have to type <code>/</code> and then select the{' '}
        <code>/ask</code> command from the list of auto-suggested commands.
      </p>

      <p className="my-4">
        Mesh AI will respond with Embedded message containing the question.
        After a few moments, Mesh AI will respond with an answer to the
        question.
      </p>

      <Image
        className="rounded-lg bg-gray-50 object-cover"
        src={imageAskquestion}
        width={768}
        height={512}
        alt=""
      />
    </div>
  )
}
function FineTune() {
  return (
    <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Fine-tune knowledge base
      </h1>
      <p className="mt-2 text-xl leading-8">
        Mesh AI learns from your community and answers questions in real time.
      </p>
      <div className="mt-10 max-w-2xl">
        <p className="my-4">
          There are 3 ways to fine-tune the knowledge base about your community.
        </p>

        <h2 className="my-4 text-2xl font-bold tracking-tight text-gray-900">
          1. Provide training data
        </h2>

        <p className="my-4">
          You can provide training data to Mesh AI to help it learn about your
          community. To do this, run the following command in a channel that
          Mesh AI has access to in your Discord server:
        </p>

        <p className="my-4">
          <code>/train</code>
        </p>

        <p className="my-4">
          Mesh AI will respond with a message asking for the question and the
          answer. Providing both will create a question and answer pair in the
          knowledge base.
        </p>

        <Image
          className="rounded-lg bg-gray-50 object-cover"
          src={imageTrain}
          width={768}
          height={512}
          alt=""
        />

        <h2 className="my-4 text-2xl font-bold tracking-tight text-gray-900">
          2. Reply to Mesh AI's message and react to it
        </h2>

        <p className="my-4">
          First, you reply to Mesh AI's message with the correct answer.
        </p>

        <p className="my-4">
          Then, Mesh AI will add a 👍 reaction to your reply.
        </p>

        <p className="my-4">
          If you react with one of the following (positive) emojis on your
          reply:
        </p>

        <p className="my-4">👍 ✅ 💯 🔥 ❤️ 🙌 💪 🙏 👏 👌</p>

        <p className="my-4">
          Mesh AI will add your reply into the knowledge base.
        </p>

        <Image
          className="rounded-lg bg-gray-50 object-cover"
          src={imageFineTune}
          width={768}
          height={512}
          alt=""
        />

        <h2 className="my-4 text-2xl font-bold tracking-tight text-gray-900">
          3. React to a user's message that replied to another user's message
        </h2>

        <p className="my-4">
          If you want to add a user's reply into the knowledge base, you can
          react to the user's reply with one of the following (positive) emojis:
        </p>

        <p className="my-4">👍 ✅ 💯 🔥 ❤️ 🙌 💪 🙏 👏 👌</p>

        <p className="my-4">
          Mesh AI then will add a 👍 reaction and add the reply into the
          knowledge base.
        </p>

        <Image
          className="rounded-lg bg-gray-50 object-cover"
          src={imageReplyuser}
          width={768}
          height={512}
          alt=""
        />

        <p className="my-4">
          Note that, these are a list of negative emojis that you can use to
          indicate that a response is bad:
        </p>

        <p className="my-4">👎 🥶 😱 😵‍💫 😵 😡 🤬 🤮 🤢 👿</p>
      </div>
    </div>
  )
}
