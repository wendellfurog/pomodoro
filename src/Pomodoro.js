import React, { useState, useEffect } from 'react'


export default function Pomodoro() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() =>{
    if(start) {
    let interval = setInterval(() => {
      clearInterval(interval);

      if(seconds === 0) {
        if(minutes > 0) {
          setSeconds(59);
          setMinutes(minutes-1);
        } else {
          let minute = displayMessage ? minutes-1 : 4;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minute);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds-1);
      }
    
    }, 1000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, start]);

  const handleChange = e => {
    setMinutes(e.target.value);
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  console.log('minutes: ',minutes);
  console.log('seconds: ',seconds);

  return (
    <div className='pomodoro'>
      {!start && 
      <div>
        <div>
          <button className="button" onClick={() => setStart(!start)}>
            Start Pomodoro
          </button>
        </div>
        <div>
          <input className='duration' type='number' placeholder='Input duration' onChange={handleChange} />
        </div>
      </div>
      }
      {start && 
      <div>
        <div className='message'>
          {displayMessage && <div>Break time! New session starts in:</div>}
        </div>
        <div className='timer'>
          {timerMinutes}:{timerSeconds}
        </div>
      </div>
      }
    </div>
  )
}