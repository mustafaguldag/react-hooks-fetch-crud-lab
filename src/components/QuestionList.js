import React from "react";
import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response ) => response.json())
      .then((data) => {
        console.log("data QList: ", data)
        setQuestions(data);
      });
  }, []);
  
  function handleDeleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
    .then(resp => resp.json())
    .then(() => setQuestions(questions.filter(item => item.id !== id)));
  }
  
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(data => 
        <QuestionItem key={data.id} question={data} onDelete={handleDeleteQuestion} />
       )}
       </ul>
    </section>
  );
}

export default QuestionList;
