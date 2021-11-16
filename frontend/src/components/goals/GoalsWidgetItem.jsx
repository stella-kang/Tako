import React from 'react'

const GoalsWidgetItem = ({goal, handleButtonClick, openEditForm}) => {
  return (
    <div key={goal._id}>
      <p>{goal.title}</p>
      <section>{goal.description}</section>
      <button onClick={handleButtonClick}>Done?</button>
      <button onClick={() => openEditForm(goal)}>Edit</button>
    </div>
  )
}

export default GoalsWidgetItem
