import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from "react-dnd";
import { useContext, useEffect, useRef, FC } from 'react';
import { Context } from "@/hooks/context";

interface Link {
    id: string;
    platform: string;
    link: string;
}

interface PhoneLinkBoxProps {
    link: Link;
}

const PhoneLinkBox: FC<PhoneLinkBoxProps> = ({ link }) => {
    
  const context = useContext(Context);

    if (!context) {
        throw new Error('PhoneLinkBox must be used within a Context.Provider');
    }

    const { dispatch } = context;
    const linkRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLImageElement>(null);
    const platform = link.platform.toLowerCase().replace(' ', '').replace('.', '');
    const platformTitle = link.platform;

    useEffect(() => {
        if (arrowRef.current) {
            arrowRef.current.src = platformTitle === 'Frontend Mentor' ? '/icons/icon-arrow-right-dark.svg' : '/icons/icon-arrow-right.svg';
        }
    }, [link]);

    return (
        <div
            className={`w-full h-[44px] rounded-[8px] flex items-center px-[16px] gap-[8px] font-sans text-[0.75rem] font-normal leading-[150%] relative cursor-grab no-underline ${'bg-dl-'+platform} ${platformTitle === 'Frontend Mentor'?'text-dl-black-gray border border-dl-dark-gray':'text-dl-white border-dl-'+platform}`}
            ref={linkRef}
            // data-handler-id={handlerId}
            // style={isDragging ? { opacity: 0 } : { opacity: 1 }}
        >
            <img className="w-[16px] object-contain" src={`/icons/icon-link-boxes/icon-${platform}-link-box.svg`} alt={`${platformTitle} icon`} />
            {platformTitle}
            <img className="absolute top-0 bottom-0 right-[16px] m-auto w-[16px] object-contain" ref={arrowRef} alt="arrow icon" />
        </div>
    );
};

export default PhoneLinkBox;
