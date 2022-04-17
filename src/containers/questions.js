import { connect } from 'react-redux';
import {useState} from 'react';
import { Card, List, Radio , Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css';

const gridStyle = {
  width: '100%',
};

const cardStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "95em",
  marginTop:"10px"
};

const buttonStyle={
  borderRadius: "18px"
}

const spaceStyle={
  float: "right"
}


const Questions = ({ dispatch, questions }) => {

  const history = useNavigate();
  
  const [voteData, setVoteData] = useState(null)

  const selectChoice = (e) => {
    const voteBody ={
       url: e.target.id,
       votes: 1,
       choice: e.target.value
    }
    setVoteData(voteBody)
  };

  const vote = () => {
    dispatch({type:"VOTE",data: voteData})
  };

  const detail = (e) => {
    dispatch({type:"DETAIL",data: e.target.offsetParent.id })
    const splitUrl = e.target.offsetParent.id.split("/");
    const questionId = splitUrl[splitUrl.length-1]
    history(`/detail-question/${questionId}`);
  };

  const routeCreateQuestion = () => {
    history('/create-question');
  };

  return (
    <Card style={cardStyle}>
      <Card.Grid style={gridStyle}>
        <Button onClick={routeCreateQuestion} type={"primary"} style={buttonStyle}> + Create Question</Button>
        <br></br>
        <br></br>
        <List  dataSource={questions.questions} renderItem={item => (
          <List.Item>
            {item.question}
            <br></br>
            <br></br>
            <Radio.Group onChange={selectChoice }>
            {item.choices.map(function(item){
               return (<Radio key={item.url} value={item.choice} id={item.url}>{item.choice}</Radio>)
            })}
            </Radio.Group>
            <Space style={spaceStyle}>
               <Button danger onClick={vote} type={"primary"} style={buttonStyle}>Vote</Button>
               <Button id={item.url} onClick={detail} type={"primary"} style={buttonStyle}>Detail</Button>
            </Space>
          </List.Item>
        )}
        />
      </Card.Grid>
    </Card>
  )
}

const mapStateToProps = (state, dispatch) => ({
  questions: state.questions,
  dispatch: dispatch,
})

export default connect(mapStateToProps)(Questions)