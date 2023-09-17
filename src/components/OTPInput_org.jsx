import React from 'react'
import './OtpInput.css';
import axios from 'axios';

import { useMemo,useState } from 'react';
import { RE_DIGIT } from '../constants';


  
  export default function OtpInput({ value, placeholder,valueLength }) {
    const [lotteryNumber, setLotteryNumber] = useState('');
    const [getResult, setGetResult] = useState('');
    const onChange = (e) => {
      setLotteryNumber(e.target.value)
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formattedLotteryNumber = lotteryNumber.match(/.{1,2}/g).join(',');
      console.log(formattedLotteryNumber);
      const response = await axios.get(`http://localhost:8000/check_probability/${formattedLotteryNumber}`);
      console.log(response.data.probability);
      setGetResult(response.data.probability)
      // 10242732425237 - strong
      // 10242732425236 - weak
    }
    
    // const valueItems = useMemo(() => {
    //     // const valueArray = value.split('');
    //     const valueArray = value.match(/.{1,2}/g) || []; // Split value into chunks of 2
    //     const items = [];
    
    //     for (let i = 0; i < valueLength; i++) {
    //       const char = valueArray[i];
    
    //       if (RE_DIGIT.test(char)) {
    //         items.push(char);
    //       } else {
    //         items.push('');
    //       }
    //     }
    
    //     return items;
    //   }, [value, valueLength]);

   
    // const inputOnChange = (e, idx) => 
    // {
    //     const target = e.target;
    //     let targetValue = target.value;
    //     const isTargetValueDigit = RE_DIGIT.test(targetValue);

    //     if (!isTargetValueDigit && targetValue !== '') {
    //     return;
    //     }

    //     const nextInputEl = target.nextElementSibling  | null;

    //     // only delete digit if next input element has no value
    //     if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
    //     return;
    //     }
    //     targetValue = isTargetValueDigit ? targetValue : ' ';
        
    //     const targetValueLength = targetValue.length;
    //     if (targetValueLength === 1) {
    //     const newValue =
    //     value.substring(0, idx) + targetValue + value.substring(idx + 1);

    //     onChange(newValue);

    //     if (!isTargetValueDigit) {
    //     return;
    //     }
        
    //     const nextElementSibling =
    //     target?.nextElementSibling | null;

    //     if (nextElementSibling) {
    //         nextElementSibling.focus();
    //         }
        
    //     } else if (targetValueLength === valueLength) {
    //     onChange(targetValue);
  
    //     target.blur();
    //   }

    //     if (!RE_DIGIT.test(targetValue)) {
    //         return;
    //     }

        
    
    // };

    // const inputOnKeyDown = (e) => {
    //     const target = e.target ;
    //     const targetValue = target.value;

    //     // keep the selection range position
    //     // if the same digit was typed
    //     target.setSelectionRange(0, targetValue.length);
    
    //     if (e.key !== 'Backspace' || target.value !== '') {
    //       return;
    //     }
    
    //     const previousElementSibling =
    //       target.previousElementSibling | null;
    
    //     if (previousElementSibling) {
    //       previousElementSibling.focus();
    //     }
    //   };
    
    // const inputOnFocus = (e) => {
    //     const { target } = e;
    //     // keep focusing back until previous input
    //     // element has value
    //     const prevInputEl =
    //     target.previousElementSibling| null;

    //     if (prevInputEl && prevInputEl.value === '') {
    //         return prevInputEl.focus();
    //     }

    //     target.setSelectionRange(0, target.value.length);
    //     };
      
    return (
      <div className="otp-group">
        {/* {valueItems.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{2}"
            maxLength={valueLength}
            className="otp-input"
            value={digit}
            onChange={(e) => inputOnChange(e, idx)}
            onKeyDown={inputOnKeyDown}
            onFocus={inputOnFocus}
          />
        ))} */}
        <form onSubmit={handleSubmit} className="relative flex justify-center items center">
        <input className='url_input peer' value={lotteryNumber} placeholder={placeholder} onChange={onChange} required pattern="\d*"/>
        <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'><p>↵</p></button>
        </form>
      </div>
    );
  }