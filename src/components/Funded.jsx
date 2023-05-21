import Image from 'next/image'
import imageDeepFunding from '@/images/logos/DeepFunding.png'
import imageSwarm from '@/images/logos/Swarm.png'

export default function Funded() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-white">
          Supported By
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={imageDeepFunding}
            width={443}
            height={100}
            alt=""
          />

          <div className="flex">
            <Image
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={imageSwarm}
              width={128}
              height={128}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
