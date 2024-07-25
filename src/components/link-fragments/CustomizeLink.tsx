"use client";

import { useRef, useContext } from 'react';
import { Context } from "@/hooks/context";
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

    return (
        <fieldset className="p-5 flex flex-col gap-3 bg-dl-white-gray rounded-xl relative"
            key={link.id}
            name='linkContainer'
            id={link.id}
            ref={linkRef}
            >
            <h1 className="text-dl-dark-gray font-instrument text-base font-bold leading-[150%]">
                {`= Link #${index + 1}`}
            </h1>
            <button type='button' className="absolute top-5 right-[20px] bg-transparent text-dl-dark-gray font-instrument text-base font-normal leading-[150%] cursor-pointer hover:text-dl-red" onClick={removeLink} id={link.id}>
                Remove
            </button>
            <PlaformSelectBox initialState={link.platform} zIndex={100 - index} linkId={link.id} />
            <LinkInput initialState={link.link} linkId={link.id} platform={link.platform} />
        </fieldset>
    );
}

export default CustomizeLink;
