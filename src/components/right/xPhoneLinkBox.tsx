// import styles from '../../../styles/account/PhoneLinkBox.module.css';

interface PhoneLinkBoxProps {
    platform: string;
}

const PhoneLinkBox: React.FC<PhoneLinkBoxProps> = ({ platform }) => {
    const platformTitle = platform.toLowerCase().replace(' ', '').replace('.', '');

    return (
        <div className={`w-full h-[44px] rounded-[8px] flex items-center px-[16px] gap-[8px] text-white font-sans text-[0.75rem] font-normal leading-[150%] relative cursor-grab no-underline bg-dl-${platformTitle}`} style={{ cursor: 'initial' }}>
            <img src={`/icons/icon-link-boxes/icon-${platformTitle}-link-box.svg`} className="w-[16px] object-contain" alt={`${platform} icon`} />
            {platform}
            <img
                src={platformTitle === 'frontendmentor' ? '/icons/icon-arrow-right-dark.svg' : '/icons/icon-arrow-right.svg'}
                className="absolute top-0 bottom-0 right-[16px] m-auto w-[16px] object-contain"
                alt="Arrow icon"
            />
        </div>
    );
}

export default PhoneLinkBox;
