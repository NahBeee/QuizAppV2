import React, { useEffect, useState } from 'react'
import useStateContext from '../customhooks/useStateContext'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { getFormatedTime } from '../helper';
import { useNavigate } from 'react-router-dom';

export default function Result() {
  const {context, setContext} = useStateContext()
  const [score, setScore] = useState(0);
  const [qnAns, setQnAns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map(x=>x.questionID)
    createAPIEndpoint(ENDPOINTS.getAnswers)
    .post(ids)
    .then(res => 
      {
        const qna = context.selectedOptions.map(
          x=> ({
            ...x,
            ...(res.data.find(y => y.questionID === x.questionID))
          }))
          console.log(qna)
          setQnAns(qna);
          calculateScore(qna)
      })
    .catch(err=> console.log(err))
  }, [])
  

  const calculateScore = qna => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0)
    setScore(tempScore)
  }


  return (
    <Card sx ={{mt:5, display:'flex', width:'100%', maxWidth:640, mx:'auto'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
        <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">
              YOUR SCORE
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" >
                {score}
              </Typography>/5
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + ' mins'}
            </Typography>
            <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}>
              Submit
            </Button>
            <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}>
              Re-try
            </Button>
        </CardContent>
      </Box>
      <CardMedia
          component="img"
          sx={{ width: 220 }}
          image="./result.png"
        />
    </Card>
  )
}