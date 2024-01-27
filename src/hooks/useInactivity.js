import { useState, useEffect } from 'react';

export default function useInactivity(inactiveTime, callback1, callback2) {
    const [active, setActive] = useState('Active');
    const [timeLeft, setTimeLeft] = useState(inactiveTime);
    let longInactiveTime = inactiveTime * 2;
    
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1000 : 0);
        }, 1000);
    
      return () => clearInterval(countdown);
    }, [timeLeft]);
  
    useEffect(() => {
        if (timeLeft === 0) {
            callback1();
            
            const timeout = setTimeout(() => {
                callback2();
            }, longInactiveTime);
        
          return () => clearTimeout(timeout);
        }
    }, [timeLeft]);
  
    const resetTimer = () => {
        setTimeLeft(inactiveTime);
        setActive('Active');
        console.log('reset timer')
    };
  
    const formatTimeLeft = () => {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = (timeLeft / 1000) % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return { active, setActive, resetTimer, formatTimeLeft };
}
