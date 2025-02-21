import { useState } from 'react'

const Display = props => <h1>{props.value}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
    </tbody>
    </table>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good + props.bad + props.neutral) / 3
  const positivePercentage = total === 0 ? 0 : (props.good / total) * 100

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <StatisticLine name="good" value={props.good} />
      <StatisticLine name="neutral" value={props.neutral} />
      <StatisticLine name="bad" value={props.bad} />
      <StatisticLine name="total" value={total} />
      <StatisticLine name="average" value={average} />
      <StatisticLine name="positive" value={`${positivePercentage} %`} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display value={'give feedback'} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Display value={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App