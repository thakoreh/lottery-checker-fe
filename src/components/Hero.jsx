import React from 'react'



const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <h1 className="heading head_text ">Probability Calculator</h1>
        <button type='button' onClick={() => window.open('https://github.com/thakoreh')} className='black_btn'>GitHub</button>
      </nav>
      
      <h2 className="desc">
        Dare to test your luck? Enter your lotto numbers and let our advanced algorithm
        analyze their strength. We use probability and statistics of past lotto winning numbers.
        Will your numbers make the cut? Let's find out!
      </h2>
    </header>
  )
}

export default Hero