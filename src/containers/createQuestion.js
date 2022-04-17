import { connect } from 'react-redux';
import { Card, Form, Input, Button, } from 'antd';
import 'antd/dist/antd.css';

const gridStyle = {
    width: '100%',
};

const cardStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "70em",
    marginTop:"10px"
};

const buttonStyle={
    borderRadius: "16px"
  }

const { TextArea } = Input;

const CreateQuestion = ({ dispatch }) => {

    const create = (values) => {
      const createBody = {
        question: values.question,
        choices: values.choices.split(" ,")
      }

      dispatch({type:"CREATE",data: createBody});
    };
    return (
        <Card style={cardStyle}>
            <Card.Grid style={gridStyle}>
                <Form name="basic" labelCol={{span: 4}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={create} autoComplete="off">
                  <Form.Item label="Question" name="question" rules={[{required: true,message: 'Please input your question!'}]}><TextArea rows={4}/></Form.Item>
                  <Form.Item label="Choices" name="choices" rules={[{required: true,message: 'Please input your choices!'}]}><TextArea rows={4}/></Form.Item>
                  <Form.Item wrapperCol={{offset: 4,span: 12}}>
                    <Button style={buttonStyle} type="primary" htmlType="submit">Create</Button>
                  </Form.Item>
                </Form>
            </Card.Grid>
        </Card>
    )
}

const mapStateToProps = (dispatch) => ({
    dispatch: dispatch,
})

export default connect(mapStateToProps)(CreateQuestion)