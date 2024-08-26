'use client'

import {
  useMemo,
  useState,
  useContext,
  useEffect,
  useRef,
  FormEvent,
} from 'react'
import { Context } from '@/hooks/context'
import { v4 as uuid } from 'uuid'
import CustomizeLink from './link-fragments/CustomizeLink'
import { db } from '@/firebase/Configuration'
import { doc, updateDoc } from 'firebase/firestore'
import { CircularProgress } from '@mui/material'
import {
  DragDropContext,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd'
import { StrictModeDroppable } from '@/components/StrictModeDroppable'
import Image from 'next/image'

interface Link {
  id: string
  platform: string
  link: string
  order: number
}

const CustomizeLinks: React.FC = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('CustomizeLinks must be used within a Context.Provider')
  }

  const {
    uid,
    usersLinks,
    dispatch,
    setOpenSaveChangesMessage,
    setCustomPopupMessage,
    setOpenCustomPopup,
  } = context
  const [loading, setLoading] = useState(false)
  const addLinkButton = useRef<HTMLButtonElement>(null)

  const addLink = async () => {
    const newLink: Link = {
      id: uuid(),
      platform: 'Github',
      link: '',
      order: usersLinks.length + 1,
    }
    dispatch({ type: 'add link', link: newLink })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const temp: string[] = []
    const hasDuplicate = usersLinks.every((link) => {
      if (!temp.includes(link.platform)) {
        temp.push(link.platform)
        return true
      } else return false
    })
    if (!hasDuplicate) {
      // alert('You cannot have duplicate platform links');
      setCustomPopupMessage('You cannot have duplicate platform links')
      setOpenCustomPopup(true)
      return
    }

    setLoading(true)
    const linkDoc = doc(db, `${uid}/userLinks`)
    await updateDoc(linkDoc, { links: usersLinks })
    setOpenSaveChangesMessage(true)
    setLoading(false)
  }

  const showLinks = useMemo(() => {
    return usersLinks.map((link, i) => {
      return <CustomizeLink link={link} index={i} key={link.id} />
    })
  }, [usersLinks])

  useEffect(() => {
    if (addLinkButton.current) {
      addLinkButton.current.disabled = usersLinks.length >= 5
    }
  }, [usersLinks])

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
    <form className="w-full bg-white rounded-xl" onSubmit={handleSubmit}>
      <div className="p-6 md:p-10 flex gap-10 flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="text-dl-black-gray font-instrument text-3xl font-bold leading-[150%]">
            Customize your links
          </h1>
          <p className="text-dl-dark-gray font-instrument text-base font-normal leading-[150%]">
            Add/edit/remove links below and then share all your profiles with
            the world
          </p>
        </div>
        <fieldset className="flex flex-col gap-6">
          <button
            type="button"
            className="block w-full rounded-lg bg-transparent border border-dl-purple text-dl-purple font-instrument text-base font-semibold leading-[150%] mx-auto py-3 px-7 cursor-pointer hover:bg-dl-light-purple disabled:bg-dl-light-gray disabled:text-dl-dark-gray disabled:border disabled:border-transparent disabled:cursor-not-allowed"
            onClick={addLink}
            ref={addLinkButton}
          >
            + Add new link
          </button>
          {showLinks.length ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <StrictModeDroppable droppableId="droppable">
                {(
                  provided: DroppableProvided,
                ) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
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
                            <CustomizeLink link={item} index={index} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          ) : (
            <div className="w-full px-5 py-10 rounded-xl bg-dl-white-gray flex flex-col items-center justify-center gap-6">
              <Image
                src={'/images/illustration-empty.svg'}
                alt="add link"
                className="w-[249px] object-contain"
                height={0}
                width={0}
              />
              <h1 className="text-dl-black-gray text-center font-instrument text-3xl font-bold leading-[150%]">
                Let&apos;s get you started
              </h1>
              <p className="text-dl-dark-gray text-center font-instrument text-base font-normal leading-[150%]">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          )}
        </fieldset>
      </div>
      <div
        className="w-full p-4 md:py-6 border-t bg-dl-white border-dl-light-gray md:px-10 flex justify-end items-center bottom-0 rounded-b-xl"
        style={{ zIndex: '9999' }}
      >
        <button
          className="w-[91px] h-[46px] rounded-[8px] bg-dl-purple text-white font-instrument text-base font-semibold leading-[150%] cursor-pointer flex justify-center items-center hover:bg-dl-mid-purple hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
          type="submit"
        >
          {loading ? (
            <CircularProgress
              className="text-dl-light-purple"
              color="secondary"
              size="33px"
            />
          ) : (
            'Save'
          )}
        </button>
      </div>
    </form>
  )
}

export default CustomizeLinks
