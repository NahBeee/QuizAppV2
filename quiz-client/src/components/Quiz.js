import React, { useContext, useEffect, useState } from 'react'
import useStateContext, { stateContext } from '../customhooks/useStateContext'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import {Card, CardContent, ListItemButton, Typography,List, CardHeader, Box, LinearProgress} from '@mui/material';
import { getFormatedTime } from '../helper';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setquestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] =useState(0);
  const {context, setContext} = useStateContext();
  let timer;
  

  const startTimer = () =>{
    timer = setInterval(()=>{
      setTimeTaken(previousvalue => previousvalue +1)
    },[1000])
  }
  const updateAnswer = (questionId, optionIndex) =>{
    const temp = [...context.selectedOptions]
    temp.push({
      questionId,
      selected:optionIndex
    })

    if(questionIndex<4){
      setContext({selectedOptions:[...temp]})
      setquestionIndex(questionIndex+1)
    }
    else{
      setContext({selectedOptions:[...temp], timeTaken})
    }
  }
  useEffect(()=>{
    createAPIEndpoint(ENDPOINTS.question)
    .fetch()
    .then(res => {
      setQuestions(res.data)
      startTimer()
    })
    .catch(error => {console.log(error)})
    return ()=>{clearInterval(timer)}
  },[])
  return (
    questions.length !=0 ?
      <Card sx ={{maxWidth: 640, mx:'auto', mt:5,'& .MuiCardHeader-action':{m:0, alignSelf:'center'}}}>
        <CardHeader title={'Question ' + (questionIndex + 1) + ' of 5'  }
          action= {<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
        <Box>
          <LinearProgress variant='determinate' value={(questionIndex +1)*100 /5} />
        </Box>
        <CardContent>
          <Typography variant ="h6">
              {questions[questionIndex].questionInWords}
          </Typography>
          <List>
            {questions[questionIndex].options.map((item,index)=>
              <ListItemButton key={index} onClick={() => updateAnswer(questions[questionIndex].questionId, index)}>
                <div>{String.fromCharCode(65 +index)+ " . "}  {item}</div>
              </ListItemButton>
            )}
          </List>
        </CardContent>
      </Card>
      : null
  )
}
