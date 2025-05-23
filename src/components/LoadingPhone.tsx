import Image from 'next/image'

export default function LoadingPhoneMockup() {
  return (
    <section className="w-full p-6 bg-dl-white rounded-xl flex justify-center items-center">
      <div className="relative">
        <Image
          className="w-80 h-auto object-contain inline dark:hidden"
          width={0}
          height={0}
          alt="mockup"
          src={'/images/illustration-phone-mockup-empty.svg'}
        />
        <Image
          className="w-80 h-auto object-contain hidden dark:inline"
          width={0}
          height={0}
          alt="mockup"
          src={'/images/illustration-phone-mockup-empty-dark.svg'}
        />
      </div>
    </section>
  )
}
