import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Card, Descriptions} from 'antd';
import { useLocation } from 'react-router-dom'
import 'antd/dist/antd.css';

const gridStyle = {
  width: '100%',
};

const cardStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "50em",
  marginTop:"10px"
};

const DetailQuestion = ({ dispatch, questionDetail }) => {

  const location = useLocation();

  const splitQuestionUrl = location.pathname.split("/");
  const questionId = splitQuestionUrl[splitQuestionUrl.length-1]

  useEffect(() => {
    dispatch({type:"DETAIL",data: `questions/${questionId}`})
  }, []);

  if(questionDetail.questionDetail && questionDetail.questionDetail.choices) {
    return (
      <Card style={cardStyle}>
        <Card.Grid style={gridStyle}>
          <br></br>
          <br></br>
          <Descriptions title="Question Detail" layout="vertical" bordered>
            <Descriptions.Item label="Question">{questionDetail.questionDetail.question}</Descriptions.Item>
            <Descriptions.Item label="Published At">{questionDetail.questionDetail.published_at.split("T")[0]}</Descriptions.Item>
            <Descriptions.Item label="Choices">
               {questionDetail.questionDetail.choices.map(function(item){
                 return (<h4>{item.choice} {`:`} {item.votes} </h4>)
            })}</Descriptions.Item>
          </Descriptions>
        </Card.Grid>
      </Card>
    )
  } else { 
    return false
  }

}

const mapStateToProps = (state, dispatch) => ({
  questionDetail: state.questions,
  dispatch: dispatch,
})

export default connect(mapStateToProps)(DetailQuestion )