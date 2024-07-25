import { useState, useRef, useEffect, useContext, useMemo, FC, MouseEvent } from 'react';
import { Context } from "@/hooks/context";
import platforms from '@/data';
// import styles from '../../../styles/account/links-tab/PlatformSelectBox.module.css';

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
            const platformIcon = platform.toLowerCase().replace(' ', '').replace('.', '');

            return (
                <div className={`platformMask popup_option text-[#333] py-3 font-[var(--font)] text-[1rem] font-normal leading-[150%] flex items-center gap-[12px] cursor-pointer hover:text-[#633CFF] ${i==platforms.length-1?'':'border-b border-b-dl-dark-gray'}`} data-option={platform} key={platform}>
                    <span className="w-[16px] h-[16px] mask-size-[16px_16px] -webkit-mask-size-[16px_16px] mask-repeat-no-repeat -webkit-mask-repeat-no-repeat bg-[#737373]" style={{
                        WebkitMaskImage: `url('/icons/select-icons/icon-${platformIcon}.svg')`,
                        maskImage: `url('/icons/select-icons/icon-${platformIcon}.svg')`
                    }}>
                    </span>
                    {platform}
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
            <label className="text-[#333] font-[var(--font)] text-[0.75rem] font-normal leading-[150%]">
                Platform
            </label>

            <div className="flex items-center gap-[12px] px-4 w-full h-12 rounded-lg bg-white border border-[#D9D9D9] text-[#333] font-[var(--font)] text-base font-normal leading-[150%] cursor-pointer relative hover:border-[#633CFF] hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]" onClick={handlePopup} ref={selectRef} style={{ zIndex }}>
                <img src={platformIcon} className="w-4 h-4" />
                {platform}
                {open ? 
                    <img src={'/icons/icon-chevron-up.svg'} className= "w-4 object-contain absolute top-0 bottom-0 my-auto right-[16px]" /> : 
                    <img src={'/icons/icon-chevron-down.svg'} className= "w-4 object-contain absolute top-0 bottom-0 my-auto right-[16px]" />}
                <div className="hidden w-full h-[245px] overflow-y-auto px-[16px] py-[12px] bg-white border border-[#D9D9D9] shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] rounded-xl absolute top-[64px] left-0" onClick={handleOption} ref={popupRef}>
                    {allPlatforms}
                </div>
            </div>
        </fieldset>
    )
}

export default PlaformSelectBox;
