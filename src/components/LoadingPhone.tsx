import Image from "next/image";

export default function LoadingPhoneMockup() {
    return(
        <section className="w-full p-6 bg-dl-white rounded-xl flex justify-center items-center">
            <Image className="w-full" width={0} height={0} alt="mockup" src={'/images/illustration-phone-mockup.svg'}/>
        </section>
    )
}