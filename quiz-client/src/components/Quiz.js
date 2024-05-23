import React, { useContext, useEffect, useState } from 'react'
import useStateContext, { stateContext } from '../customhooks/useStateContext'
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from '../api'
import {Card, CardContent, ListItemButton, Typography,List, CardHeader, Box, LinearProgress, CardMedia} from '@mui/material';
import { getFormatedTime } from '../helper';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setquestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] =useState(0);
  const {context, setContext} = useStateContext();
  let timer;
  const navigate = useNavigate();
  

  const startTimer = () =>{
    timer = setInterval(()=>{
      setTimeTaken(previousvalue => previousvalue +1)
    },[1000])
  }
  
  useEffect(()=>{
    setContext({
      timeTaken:0,
      selectedOptions:[]
    })
    createAPIEndpoint(ENDPOINTS.question)
    .fetch()
    .then(res => {
      setQuestions(res.data)
      startTimer()
    })
    .catch(error => {console.log(error)})
    return ()=>{clearInterval(timer)}
  },[])

  const updateAnswer = (qnId, optionIndex) =>{
    const temp = [...context.selectedOptions]
    console.log(temp)
    temp.push({
      questionId: qnId,
      selected:optionIndex
    })

    if(questionIndex<questions.length - 1){
      setContext({selectedOptions:[...temp]})
      setquestionIndex(questionIndex+1)
    }
    else{
      setContext({selectedOptions:[...temp], timeTaken})
      navigate("/result")
    }
  }

  
  return (
    questions.length !=0 ?
      <Card sx ={{maxWidth: 640, mx:'auto', mt:5,'& .MuiCardHeader-action':{m:0, alignSelf:'center'}}}>
        <CardHeader title={'Question ' + (questionIndex + 1) + ' of 5'  }
          action= {<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
        <Box>
          <LinearProgress variant='determinate' value={(questionIndex +1)*100 /5} />
        </Box>
        {questions[questionIndex].imageName !== null
          ? <CardMedia component="img" image={BASE_URL + 'images/' + questions[questionIndex].imageName } sx={{width:'auto', m:'10px auto'}}/>
        : null}
        <CardContent>
          <Typography variant ="h6">
              {questions[questionIndex].questionInWords}
          </Typography>
          <List>
            {questions[questionIndex].options.map((item,index)=>
              <ListItemButton disableRipple key={index} onClick={() => updateAnswer(questions[questionIndex].questionId, index)}>
                <div>{String.fromCharCode(65 +index)+ " . "}  {item}</div>
              </ListItemButton>
            )}
          </List>
        </CardContent>
      </Card>
      : null
  )
}
