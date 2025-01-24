import React, { useState } from 'react'

export default function ToDoFilters({getData}) {
  let [status,setStatus] = useState("all")
  let getDataHandler = (currentStatus) =>{
    setStatus(currentStatus)
    getData (currentStatus)
  }
  return (
    <div>
        <button className={`button filter-button ${status =="all" ? 'filter-button-active' : ''}`} onClick={() => getDataHandler("all")}>
            All
        </button>
        <button className={`button filter-button ${status =="active" ? 'filter-button-active' : ''}`} onClick={() => getDataHandler("active")}>Active</button>
        <button className={`button filter-button ${status =="completed" ? 'filter-button-active' : ''}`} onClick={() => getDataHandler("completed")}>Completed</button>
    </div>
  )
}
