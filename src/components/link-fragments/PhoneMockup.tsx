import {
  memo,
  useMemo,
  useContext,
  useState,
  useRef,
  useEffect,
  FC,
} from 'react'
import { Context } from '@/hooks/context'
import { storage, db } from '@/firebase/Configuration'
import { ref, getDownloadURL } from 'firebase/storage'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import PhoneLinkBox from '../PhoneLinkBox'
import Image from 'next/image'
import { DragDropContext, Droppable, Draggable, DropResult, DroppableStateSnapshot, DraggableStateSnapshot, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '@/components/StrictModeDroppable'

const PhoneMockup: FC = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('PhoneMockup must be used within a Context.Provider')
  }

  const { usersLinks, uid, dispatch } = context
  const profileDocRef = doc(db, `${uid}/profileDetails`)
  const [profileDetails, loadingProfile] = useDocumentData(profileDocRef)
  const avatarRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (loadingProfile) return

    const reference = ref(storage, `/${uid}/usersAvatar`)
    getDownloadURL(reference)
      .then((url) => {
        if (avatarRef.current) {
          avatarRef.current.src = url
        }
      })
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
          className="w-80 h-auto object-contain"
        />
        {loadingProfile ? null : (
          <Image
            src={''}
            className="border-[4px] border-dl-purple w-[96px] h-[96px] rounded-full absolute left-0 right-0 mx-auto top-[63.5px]"
            ref={avatarRef}
            style={profileDetails?.avatar ? {} : { visibility: 'hidden' }}
            alt="User Avatar"
          />
        )}
        {loadingProfile
          ? null
          : profileDetails?.firstName && (
              <h1 className="text-dl-black-gray font-instrument text-[1.125rem] font-semibold leading-[150%] w-[80%] text-center bg-white absolute left-0 right-0 mx-auto top-[176px]">
                {profileDetails.firstName}&nbsp;{profileDetails.lastName}
              </h1>
            )}
        {loadingProfile
          ? null
          : profileDetails?.email && (
              <h2 className="text-dl-dark-gray font-instrument text-sm font-normal leading-[150%] w-[80%] text-center bg-white absolute left-0 right-0 mx-auto top-[206px]">
                {profileDetails.email}
              </h2>
            )}
        <div
          className={`bg-dl-white w-[245px] h-[320px] absolute bottom-[57px] left-0 right-0 mx-auto ${usersLinks.length > 0 ? '' : 'animate-pulse'}`}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
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
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
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
        </div>
      </div>
    </section>
  )
}

export default memo(PhoneMockup)
