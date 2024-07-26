import { useState, useRef, ChangeEvent } from 'react'

export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [set, isSet] = useState<boolean>(false)
  const messageRef = useRef<HTMLParagraphElement>(null)

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files?.[0]
    if (!uploadedImage) return

    const url = URL.createObjectURL(uploadedImage)
    let imageWidth = 0
    let imageHeight = 0

    const image: HTMLImageElement = new Image()
    image.onload = () => {
      imageWidth = image.width
      imageHeight = image.height

      if (imageWidth > 1024 || imageHeight > 1024) {
        if (messageRef.current) {
          messageRef.current.style.color = '#FF3939'
        }
        return
      } else {
        if (messageRef.current) {
          messageRef.current.style.color = ''
        }
      }

      setImageUrl(url)
      isSet(true)
    }
    image.src = url
  }

  return (
    <section className="w-full bg-dl-white-gray rounded-[12px] p-5 flex justify-between items-center gap-4 flex-wrap md:flex-nowrap">
      <h1 className="whitespace-nowrap text-dl-dark-gray font-instrument text-base font-normal leading-[150%] w-full md:w-1/2 lg:w-5/12">
        Profile picture
      </h1>
      <div className="flex gap-6 flex-wrap md:flex-nowrap w-full md:w-1/2 lg:w-7/12 items-center">
        <label
          className={`${set ? 'text-dl-white' : 'text-dl-purple'} flex-shrink-0 gap-2 w-[193px] h-[193px] bg-dl-light-purple rounded-[12px] cursor-pointer flex flex-col justify-center items-center font-instrument text-base font-semibold leading-[150%] bg-cover bg-center bg-no-repeat md:max-w-[65%]`}
          htmlFor="inputFile"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <input
            id="inputFile"
            type="file"
            onChange={handleImage}
            accept="image/png, image/jpeg"
            name="profileAvatar"
            className="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 40 40"
          >
            <path
              fill="currentColor"
              d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
            />
          </svg>
          + Upload Image
        </label>
        <p
          className=" w-full md:w-auto text-dl-dark-gray font-instrument text-xs font-normal leading-[150%]"
          ref={messageRef}
        >
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </section>
  )
}
