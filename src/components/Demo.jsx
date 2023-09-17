import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

const Demo = () => {
  const [otp, setOtp] = useState('');
  const [lotteryNumber, setLotteryNumber] = useState('');
  const [getResult, setGetResult] = useState('');
  const onChange = (e) => {
    setLotteryNumber(e.target.value)
  }



  const handleClick = async () => {
    const response = await axios.get('http://localhost:8000/check_probability/14,29,31,41,43,56,42');
    console.log(response.data.probability);
    setGetResult(response.data.probability)
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

  return (
    <section className="mt-16 w-full max-w-xl">
      
      <div className="flex flex-col w-full gap-2">
      <pre className='font-bold text-lg'>Enter your decided lottery number (Only Numbers): </pre>
        <form onSubmit={handleSubmit} className="relative flex justify-center items center">
          <input className='url_input peer' value={lotteryNumber} placeholder='Lottery number goes here...' onChange={onChange} required pattern="\d*"/>
          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'><p>↵</p></button>
        </form>

      <div className="my-10 max-w-full flex justify-center items-center">
        <div className='flex flex-col gap-3'>
            <div className="my-10 max-w-full flex justify-center items-center">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">Your <span className='blue_gradient'>Result</span></h2>
            </div>
            <div className="summary_box">
              {getResult>50?
              <p className='font-inter font-medium text-lg text-green-700'>
                Your Chosen Numbers are Strong. Good luck on draw day !
                </p>
                :
                getResult ===''
                ?
                <p className='font-inter font-medium text-lg text-gray-700'>
                Submit your number first!
                </p>
                :
                <div className='justify-center items-center'>
                <p className='font-inter font-medium text-lg text-red-700'>
                Your Chosen Numbers are Weak !
                </p>
                <p className='font-inter font-medium text-sm text-red-700'>
                Please Try Different Numbers.
                </p>
                </div>
              }
                
            </div>
        </div>
      </div>
      
       


      </div>
    </section>
  )
}

export default Demo