"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle, ChangeEvent, FocusEvent, InvalidEvent } from 'react';
import Image from 'next/image';

interface InputProps {
    label: string;
    type: string;
    icon: string;
    error: string;
    placeholder: string;
}

interface InputRef {
    state: string;
}

const Input = forwardRef<InputRef, InputProps>(({ label, type, icon, error, placeholder }, ref) => {
    const [text, setText] = useState('');
    const errorMessageRef = useRef<HTMLSpanElement>(null);
    const emptyMessageRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('');
        setText(e.target.value);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const isEmpty = e.target.validity.valueMissing;
        const isTypeInvalid = e.target.validity.typeMismatch;

        if (isEmpty && inputRef.current && emptyMessageRef.current && labelRef.current) {
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.boxShadow = 'none';
            inputRef.current.style.paddingRight = '100px';
            emptyMessageRef.current.style.display = 'block';
            labelRef.current.style.color = '#FF3939';
        } else if (isTypeInvalid && inputRef.current && errorMessageRef.current && labelRef.current) {
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.boxShadow = 'none';
            inputRef.current.style.paddingRight = '100px';
            errorMessageRef.current.style.display = 'block';
            labelRef.current.style.color = '#FF3939';
        }
    };

    const handleInvalid = (e: InvalidEvent<HTMLInputElement>) => {
        e.target.setCustomValidity(' ');
        const isEmpty = e.target.validity.valueMissing;
        if (inputRef.current && labelRef.current) {
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.boxShadow = 'none';
            inputRef.current.style.paddingRight = '100px';
            labelRef.current.style.color = '#FF3939';
            if (isEmpty && emptyMessageRef.current) {
                emptyMessageRef.current.style.display = 'block';
            } else if (errorMessageRef.current) {
                errorMessageRef.current.style.display = 'block';
            }
        }
    };

    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        }
    }));

    useEffect(() => {
        if (inputRef.current && emptyMessageRef.current && errorMessageRef.current && labelRef.current) {
            inputRef.current.style.border = '';
            inputRef.current.style.boxShadow = '';
            inputRef.current.style.paddingRight = '';
            emptyMessageRef.current.style.display = '';
            errorMessageRef.current.style.display = '';
            labelRef.current.style.color = '';
        }
    }, [text]);

    return (
        <fieldset className="flex flex-col gap-1 w-full">
            <label className="text-dl-black-gray text-sm font-instrument font-normal leading-[150%] sm:text-xs" ref={labelRef}>
                {label}
            </label>
            <div className="relative">
                <input type={type}
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    placeholder={placeholder}
                    className="w-full h-12 rounded-lg border border-dl-light-gray bg-dl-white text-dl-black-gray px-12 text-base font-instrument font-normal leading-[150%] focus:border-dl-purple focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] focus:outline-none"
                    ref={inputRef}
                    required
                />
                <Image src={icon}
                    width='0' height='0'
                    alt=''
                    className="icon absolute top-0 bottom-0 m-auto left-4 w-4 object-contain" />
                <span className="hidden h-[18px] text-dl-red text-right text-sm font-sans font-normal leading-[150%] absolute top-0 bottom-0 m-auto right-4" ref={errorMessageRef}>
                    {error}
                </span>
                <span className="hidden h-[18px] text-dl-red text-right text-sm font-sans font-normal leading-[150%] absolute top-0 bottom-0 m-auto right-4" ref={emptyMessageRef}>
                    Can&apos;t be empty
                </span>
            </div>
        </fieldset>
    );
});

Input.displayName = 'Input';

export default Input;
