import { useState, useRef, useEffect, useContext, useMemo, FC, MouseEvent } from 'react';
import { Context } from "@/hooks/context";
import platforms from '@/data';
import Image from 'next/image';

// Define prop types
interface PlatformSelectBoxProps {
    initialState?: string;
    zIndex: number;
    linkId: string;
}

const PlaformSelectBox: FC<PlatformSelectBoxProps> = ({ initialState, zIndex, linkId }) => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('Popup must be used within a Context.Provider');
    }
    const initialPlatform = initialState ? initialState.toLowerCase().replace(' ', '').replace('.', '') : 'github';
    const { dispatch } = context;
    const [platform, setPlatform] = useState<string>(initialState || 'Github');
    const [platformIcon, setPlatformIcon] = useState<string>(`/icons/select-icons/icon-${initialPlatform}.svg`);
    const [open, setOpen] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleOption = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (!target.matches('.popup_option')) return;

        let dataOption = target.getAttribute('data-option') || '';
        setPlatform(dataOption);
        dataOption = dataOption.toLowerCase().replace(' ', '').replace('.', '');
        setPlatformIcon(`/icons/select-icons/icon-${dataOption}.svg`);
    }

    const handlePopup = () => {
        setOpen(!open);
    }

    const allPlatforms = useMemo(() => {
        return platforms.map((platform, i) => {
            const platformIcon = platform[0].toLowerCase().replace(' ', '').replace('.', '');

            return (
                <div className={`platformMask popup_option text-dl-black-gray py-3 font-instrument text-base font-normal leading-[150%] flex items-center gap-3 cursor-pointer hover:text-dl-purple ${i==platforms.length-1?'':'border-b border-b-dl-dark-gray'}`} data-option={platform[0]} key={platform[0]}>
                    <span className="w-4 h-4 mask-size-[16px_16px] -webkit-mask-size-[16px_16px] mask-repeat-no-repeat -webkit-mask-repeat-no-repeat bg-dl-dark-gray" style={{
                        WebkitMaskImage: `url('/icons/select-icons/icon-${platformIcon}.svg')`,
                        maskImage: `url('/icons/select-icons/icon-${platformIcon}.svg')`
                    }}>
                    </span>
                    {platform[0]}
                </div>
            )
        })
    }, [])

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.display = open ? 'block' : '';
        }
        const handleClickOutside = (event: any) => {
          if (selectRef.current && !selectRef.current.contains(event.target)) {
            setOpen(false);
          }
        };
        if (open) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open])

    useEffect(() => {
        dispatch({ type: 'update link', platform, linkId });
    }, [platform, linkId, dispatch])

    return (
        <fieldset className="flex flex-col gap-1" name={'platform'} data-platform={platform}>
            <label className="text-dl-black-gray font-instrument text-xs font-normal leading-[150%]">
                Platform
            </label>

            <div className="flex items-center gap-3 px-4 w-full h-12 rounded-lg bg-white border border-dl-light-gray text-dl-black-gray font-instrument text-base font-normal leading-[150%] cursor-pointer relative hover:border-dl-purple hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]" onClick={handlePopup} ref={selectRef} style={{ zIndex }}>
                <Image height={20} width={20} alt="icon" src={platformIcon} className="w-4 h-4" />
                {platform}
                {open ? 
                    <Image  alt="down" src={'/icons/icon-chevron-up.svg'} height={20} width={20} className= "w-4 object-contain absolute top-0 bottom-0 my-auto right-4" /> : 
                    <Image  alt="up" src={'/icons/icon-chevron-down.svg'} height={20} width={20} className= "w-4 object-contain absolute top-0 bottom-0 my-auto right-4" />}
                <div className="hidden w-full h-[245px] overflow-y-auto px-4 py-[12px] bg-white border border-dl-light-gray shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] rounded-xl absolute top-[64px] left-0" onClick={handleOption} ref={popupRef}>
                    {allPlatforms}
                </div>
            </div>
        </fieldset>
    )
}

export default PlaformSelectBox;
