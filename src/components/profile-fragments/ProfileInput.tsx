"use client";

import { useState, useRef, useEffect, InputHTMLAttributes, FC, ChangeEvent } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
    label: string;
    name: string;
    placeholder?: string;
    type: string;
}

interface InputRef {
    state: string;
}

const Input: FC<InputProps> = ({ type, label, name, placeholder, ...rest }) => {
    const [text, setText] = useState('');
    const errorMessageRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('');
        setText(e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const isValid = e.target.checkValidity();
      
      if (!isValid) {
          if (inputRef.current) {
              inputRef.current.style.border = '1px solid #FF3939';
              inputRef.current.style.boxShadow = 'none';
              inputRef.current.style.paddingRight = '100px';
          }
          if (errorMessageRef.current) {
              errorMessageRef.current.style.display = 'block';
          }
      }     
  }

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
      e.target.setCustomValidity(' ');
      if (inputRef.current) {
          inputRef.current.style.border = '1px solid #FF3939';
          inputRef.current.style.boxShadow = 'none';
          inputRef.current.style.paddingRight = '100px';
      }
      if (errorMessageRef.current) {
          errorMessageRef.current.style.display = 'block';
      }
  }

    useEffect(() => {
      if (inputRef.current) {
          inputRef.current.style.border = '';
          inputRef.current.style.paddingRight = '';
          inputRef.current.style.boxShadow = '';
      }
      if (errorMessageRef.current) {
          errorMessageRef.current.style.display = '';
      }
  }, [text]);

    return (
      <fieldset className="w-full flex justify-between items-center flex-wrap">
          <label className="text-dl-dark-gray font-instrument text-xs md:text-base font-normal leading-[150%] w-full md:w-1/2 lg:w-5/12" htmlFor={label}>
              {label}
          </label>
          <div className="w-full md:w-1/2 lg:w-7/12 relative">
              <input
                  type={type}
                  value={text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onInvalid={handleInvalid}
                  className="w-full h-[48px] bg-white px-4 rounded-[8px] font-instrument text-base text-dl-black-gray border border-dl-light-gray leading-[150%] outline-none focus:border-dl-purple focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
                  placeholder={placeholder}
                  id={label}
                  ref={inputRef}
                  name={name}
                  {...rest}
              />
              <div className="hidden absolute h-[15px] top-0 bottom-0 my-auto right-4 text-dl-red text-xs font-instrument font-normal leading-[150%]" ref={errorMessageRef}>
                  Can&apos;t be empty
              </div>
          </div>
      </fieldset>
    );
};

export default Input;
