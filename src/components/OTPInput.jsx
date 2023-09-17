import React, { useMemo } from 'react';
import { RE_DIGIT } from '../constants';

export default function OtpInput({ value, valueLength, onChange }) {
  const valueItems = useMemo(() => {
    const valueArray = value.match(/.{1,2}/g) || [];
    const items = new Array(valueLength).fill('');

    for (let i = 0; i < valueArray.length; i++) {
      const char = valueArray[i];
      if (RE_DIGIT.test(char)) {
        items[i] = char;
      }
    }

    return items;
  }, [value, valueLength]);

  const inputOnChange = (e, idx) => {
    const target = e.target;
    let targetValue = target.value;
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const newValue = value.substring(0, idx * 2) + targetValue.padEnd(2, ' ') + value.substring(idx * 2 + 2);
    onChange(newValue.trim());
    setTimeout(() => {
        const nextElementSibling = target.nextElementSibling;
        if (nextElementSibling) {
          nextElementSibling.focus();
        }
      }, 0);
      
    const nextElementSibling = target.nextElementSibling;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const inputOnKeyDown = (e) => {
    const target = e.target;
    if (e.key === 'Backspace' && target.value === '') {
      const previousElementSibling = target.previousElementSibling;
      if (previousElementSibling) {
        previousElementSibling.focus();
      }
    }
  };

  return (
    <div className="otp-group">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1,2}"
          maxLength={2}
          className="otp-input"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
        />
      ))}
    </div>
  );
}