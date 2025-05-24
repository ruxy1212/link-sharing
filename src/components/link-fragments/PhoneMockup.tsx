import {
  memo,
  useContext,
  useEffect,
  FC,
  useState,
} from 'react'
import { Context } from '@/hooks/context'
import { storage, db } from '@/firebase/Configuration'
import { ref, getDownloadURL } from 'firebase/storage'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import PhoneLinkBox from '../PhoneLinkBox'
import Image from 'next/image'
import {
  DragDropContext,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from 'react-beautiful-dnd'
import { StrictModeDroppable } from '@/components/StrictModeDroppable'

const PhoneMockup: FC = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('PhoneMockup must be used within a Context.Provider')
  }

  const { usersLinks, uid, dispatch } = context
  const profileDocRef = doc(db, `${uid}/profileDetails`)
  const [profileDetails, loadingProfile] = useDocumentData(profileDocRef)
  const [avatarSrc, setAvatarSrc] = useState('/images/placeholder-image.png');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (loadingProfile) return

    const reference = ref(storage, `/${uid}/usersAvatar`)
    getDownloadURL(reference)
      .then((url) => {setAvatarSrc(url)})
      .catch(() => {
        console.log('no avatar available')
      })
  }, [profileDetails, loadingProfile, uid])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const [removed] = usersLinks.splice(result.source.index, 1)
    dispatch({
      type: 're-order links',
      indices: { removed: removed, index: result.destination.index },
    })
  }

  return (
    <section className="w-full p-6 bg-dl-white rounded-xl flex justify-center items-center">
      <div className="relative">
        <Image
          src={'/images/illustration-phone-mockup.svg'}
          width={0}
          height={0}
          alt="phone mockup"
          priority
          className="w-80 h-auto object-contain inline dark:hidden"
        />
        <Image
          src={'/images/illustration-phone-mockup-dark.svg'}
          width={0}
          height={0}
          alt="phone mockup"
          priority
          className="w-80 h-auto object-contain hidden dark:inline"
        />
        
        {loadingProfile ? null : (
          <>
            <Image
              src={avatarSrc}
              className="border-[4px] border-dl-purple w-[96px] h-[96px] rounded-full absolute left-0 right-0 mx-auto top-[63.5px]"
              style={profileDetails?.avatar ? {} : { visibility: 'hidden' }}
              alt="User Avatar"
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(false)}
              height={96}
              width={96}
            />
            <div className={`opacity-50 w-[96px] h-[96px] rounded-full absolute left-0 right-0 mx-auto top-[63.5px] ${isLoaded?'hidden':''}`}>
              <div className="animate-pulse h-full w-full rounded-full bg-dl-light-gray opacity-75" />
            </div>
          </>
        )}
        {!loadingProfile && profileDetails?.firstName && profileDetails?.lastName
          ? ( 
            <h2 className="text-dl-black-gray font-instrument text-[1.125rem] font-semibold leading-[150%] w-[80%] text-center bg-dl-white dark:bg-transparent absolute left-0 right-0 mx-auto top-[176px] select-none">
              {profileDetails.firstName}&nbsp;{profileDetails.lastName}
            </h2>
          ) : <div className="w-full opacity-50"><div className="animate-pulse rounded-xl bg-dl-light-gray w-[180px] h-6 absolute left-0 right-0 mx-auto top-[176px] opacity-75" /></div>
        }
        {!loadingProfile && profileDetails?.email
          ? ( 
            <h2 className="text-dl-dark-gray font-instrument text-sm font-normal leading-[150%] w-[80%] text-center bg-dl-white dark:bg-transparent absolute left-0 right-0 mx-auto top-[206px] select-none">
              {profileDetails.email}
            </h2>
          ) : <div className="w-full opacity-50"><div className="animate-pulse rounded-xl bg-dl-light-gray w-[100px] h-4 absolute left-0 right-0 mx-auto top-[206px] opacity-75" /></div>
        }
        <div
          className={`w-[245px] h-[320px] absolute bottom-[57px] left-0 right-0 mx-auto ${usersLinks.length > 0 ? 'bg-dl-white dark:bg-transparent' : ''}`}
        >
          {usersLinks.length>0?(
            <DragDropContext onDragEnd={onDragEnd}>
              <StrictModeDroppable droppableId="droppable">
                {(
                  provided: DroppableProvided,
                ) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-5"
                  >
                    {usersLinks.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(
                          provided: DraggableProvided,
                        ) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PhoneLinkBox link={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          ):(
            <div className="flex flex-col gap-4 opacity-60">
              {Array.from({length: 4}).map((_,i) => (
                <div key={i} className="animate-pulse rounded-xl bg-dl-light-gray w-full h-8 opacity-75" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(PhoneMockup)
