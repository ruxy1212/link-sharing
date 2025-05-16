import Image from 'next/image'

export default function LoadingPhoneMockup() {
  return (
    <section className="w-full p-6 bg-dl-white rounded-xl flex justify-center items-center">
      <Image
        className="w-full inline dark:hidden"
        width={0}
        height={0}
        alt="mockup"
        src={'/images/illustration-phone-mockup-empty.svg'}
      />
      <Image
        className="w-full hidden dark:inline"
        width={0}
        height={0}
        alt="mockup"
        src={'/images/illustration-phone-mockup-empty-dark.svg'}
      />
    </section>
  )
}
