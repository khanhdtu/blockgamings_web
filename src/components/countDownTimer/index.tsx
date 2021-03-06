import { useRef, useState, useEffect } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

type Props = {
  duration: number
  onComplete: () => void
}

const renderTime = ({ remainingTime }: any) => {
  const currentTime = useRef(remainingTime)
  const prevTime = useRef(null)
  const isNewTimeFirstTick = useRef(false)
  const [, setOneLastRerender] = useState(0)

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true
    prevTime.current = currentTime.current
    currentTime.current = remainingTime
  } else {
    isNewTimeFirstTick.current = false
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender(val => val + 1)
    }, 20)
  }

  const isTimeUp = isNewTimeFirstTick.current

  return (
    <div className='time-wrapper'>
      <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div key={prevTime.current} className={`time ${!isTimeUp ? 'down' : ''}`}>
          {prevTime.current}
        </div>
      )}
    </div>
  )
}

export const CountDownTimer = (props: Props): JSX.Element => {
  const [isDone, setDone] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (isDone) setDone(false)
    }, 100)
  }, [isDone])

  if (isDone) return <></>
  return (
    <div id='countdown-timer'>
      <CountdownCircleTimer
        isPlaying
        size={80}
        duration={props.duration}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
        onComplete={() => {
          setDone(true)
          props.onComplete()
        }}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  )
}

export default CountDownTimer
