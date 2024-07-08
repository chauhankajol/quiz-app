import React, { useState,useRef } from 'react'
import'./App.css'
import { data } from './data'

const App = () => {
  let[index,setIndex]=useState(0)
  let[question,setQuestion]=useState(data[index])
  let [lock,setLock]=useState(false)
  let [score,setScore]=useState(0)
  let[result,setResult]=useState(0)


  let option1=useRef(null)
  let option2=useRef(null)
  let option3=useRef(null)
  let option4=useRef(null)

  let option_array = [option1,option2,option3,option4]


  const options=(e,ans)=>{
    if(lock==false){
      if(question.ans === ans){
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev=>prev+1)
         }
       else{
         e.target.classList.add("wrongs")
         setLock(true)
         option_array[question.ans-1].current.classList.add("correct")
       }

    }
    
  }

  const nextpage=(e)=>{
    if(index===data.length-1){
      setResult(true)
      return 0
    }
    if(lock===true){
      setIndex(++index)
      setQuestion(data[index])
      setLock(false)
      option_array.map((option)=>{
        option.current.classList.remove("wrongs")
        option.current.classList.remove("correct")
        return  null;
      })
    }
      
  }
  const reset=()=>{
   setIndex(0)
   setQuestion(data[0])
   setLock(false)
   setResult(false)


  }

  return (
    <div>
   <div className="containerr">
 <h1>Quiz App</h1>
 <hr />
 {result?<></>: <>
  <h3>{index+1}.{question.question}</h3>
 <ul>
  <li ref={option1} onClick={(e)=>{options(e,1)}}>{question.option1}</li>
 <li  ref={option2}  onClick={(e)=>{options(e,2)}} >{question.option2}</li>
 <li  ref={option3}  onClick={(e)=>{options(e,3)}}>{question.option3}</li>
  <li  ref={option4}  onClick={(e)=>{options(e,4)}}>{question.option4}</li>
 </ul>

<button onClick={nextpage}>Next</button>

<p> {index+1} of {data.length} question</p>

 
 
 
 </>}
 {result?<><p>you {score} out of {data.length}</p>
 <button onClick={reset}>Reset</button></>:<></>}



</div>


 
 


    </div>
  )
}

export default App