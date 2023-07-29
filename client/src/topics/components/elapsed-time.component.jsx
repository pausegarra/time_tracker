import React from 'react';
import { topicService } from '../services/topics.service';

const ElapsedTime = ({ startDate }) => {
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const { minutes, hours, days, seconds } = topicService.calculateElapsedTime(elapsedTime)

  React.useEffect(() => {
    function calculate () {
      const currentTime = new Date().getTime();
      const difference = currentTime - startDate.getTime();
      setElapsedTime(difference);
    }
    calculate()
    const interval = setInterval(calculate, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startDate]);

  return <div>{days}d {hours}h {minutes}m {seconds}s</div>;
};

export default ElapsedTime;
