"use client";

import { useRef, useContext } from 'react';
import { Context } from "@/hooks/context";
import { useDrop, useDrag, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import PlaformSelectBox from './PlatformSelectBox';
import LinkInput from './LinkInput';

interface Link {
    id: string;
    order: number;
    platform: string;
    link: string;
}

interface HoverLink {
  id: string;
  index: number,
  itemCameFromOtherComponent: string
}

interface CustomizeLinkProps {
    link: Link;
    index: number;
}

const CustomizeLink: React.FC<CustomizeLinkProps> = ({ link, index }) => {
    const linkRef = useRef<HTMLFieldSetElement>(null);
    const context = useContext(Context);

    if (!context) {
        throw new Error('CustomizeLink must be used within a Context.Provider');
    }

    const { dispatch } = context;

    const removeLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const linkID = e.currentTarget.id;
        dispatch({ type: 'remove link', linkId: linkID });
    }

    // const [{ handlerId }, drop] = useDrop({
    //     accept: 'link',
    //     collect: (monitor) => ({
    //         handlerId: monitor.getHandlerId()
    //     }),
    //     hover: (hoverLink: HoverLink) => {
    //       // hover: (hoverLink: HoverLink, monitor: DropTargetMonitor) => {
    //         if (hoverLink.id === link.id) return;
          
    //         const hoverLinkIndex = hoverLink.index;
    //         const dropLinkIndex = index;
          
    //         if (hoverLinkIndex !== dropLinkIndex) {
    //           dispatch({ type: 're-order links', indices: { hoverLink: hoverLinkIndex, dropLink: dropLinkIndex } });
    //           hoverLink.index = dropLinkIndex;
    //         }
    //       // },
          
    //         // console.log('i am hovering-'+hoverLink.index+'::'+index);
    //         // console.log(link, hoverLink, index);
    //         // if (hoverLink.id === link.id) return;

    //         // const hoverLinkIndex = hoverLink.index;
    //         // const dropLinkIndex = index;

    //         // dispatch({ type: 're-order links', indices: { hoverLink: hoverLinkIndex, dropLink: dropLinkIndex } });
    //         // hoverLink.index = index;
    //     },
    // });

    // const [{handlerId}, drop] = useDrop({      
    //   accept: 'link',                         
    //   collect: (monitor) => ({               
    //       handlerId: monitor.getHandlerId()  
    //   }),
    //   hover: (hoverLink) => {        
    //       if(hoverLink.id === link.id) return;
     
    //       const hoverLinkIndex = hoverLink.index;
    // //       const dropLinkIndex = index;

    // //       dispatch({type: 're-order links', indices: {hoverLink: hoverLinkIndex, dropLink: dropLinkIndex}})
    // //       hoverLink.index = index;
    // //   },
    // // })

    // const [{ isDragging }, drag] = useDrag({ 
    //     type: 'link',
    //     item: () => {
    //         return { id: link.id, index: index, itemCameFromOtherComponent: 'CustomizeLinkComponent' };
    //     },
    //     isDragging: (monitor: DragSourceMonitor) => {
    //         return link.id === (monitor.getItem() as { id: string }).id;
    //     },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging()
    //     })
    // });

    // drag(drop(linkRef));

    return (
        <fieldset className="p-5 flex flex-col gap-3 bg-[#FAFAFA] rounded-xl relative"
            key={link.id}
            name='linkContainer'
            id={link.id}
            ref={linkRef}
            // data-handler-id={handlerId}
            // style={isDragging ? { opacity: 0.5 } : { opacity: 1 }}
            >
            <h1 className="text-[#737373] font-[var(--font)] text-[1rem] font-bold leading-[150%]">
                {`= Link #${index + 1}`}
            </h1>
            <button type='button' className="absolute top-[20px] right-[20px] bg-transparent text-[#737373] font-[var(--font)] text-[1rem] font-normal leading-[150%] cursor-pointer hover:text-dl-red" onClick={removeLink} id={link.id}>
                Remove
            </button>
            <PlaformSelectBox initialState={link.platform} zIndex={100 - index} linkId={link.id} />
            <LinkInput initialState={link.link} linkId={link.id} />
        </fieldset>
    );
}

export default CustomizeLink;
