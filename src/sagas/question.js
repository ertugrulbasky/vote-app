import {put,call,takeEvery,all} from 'redux-saga/effects';
import axios  from '../service/axios'
import { fetchQuestions,fetchQuestionDetail} from '../actions/question';
import { message} from 'antd';


const generalSuccess = () => {
    message.success('Successfully !');
};

const generalError = () => {
    message.error('An error was encountered');
};

export function* fetchQuestion() {
    try {
        const data = yield call(axios.request, {url: `/questions`});
        yield put(fetchQuestions(data))
    }catch (e) {
        generalError();
    }
}

export function* createQuestion(action) {
    try {
        yield call(axios.request, {method:"POST",url: `/questions`,data:action.data});
        yield fetchQuestions()
        generalSuccess()
    }catch (e) {
        generalError();
    }
}

export function* voteQuestion(action) {
    try {
        yield call(axios.request, {method:"POST",url: `${action.data.url}`,data:action.data});
        yield fetchQuestions()
        generalSuccess()
    }catch (e) {
        generalError();
    }
}

export function* detailQuestion(action) {
    try {
        const data = yield call(axios.request, {method:"GET",url: `${action.data}`});
        yield put(fetchQuestionDetail(data))
    }catch (e) {
        generalError();
    }
}

function* watchQuestionAction() {
    yield takeEvery('CREATE', createQuestion);
    yield takeEvery('VOTE', voteQuestion);
    yield takeEvery('DETAIL', detailQuestion);
    
}

export default function* rootSaga() {
    yield all([
     fetchQuestion(),
     watchQuestionAction(),
    ])
}





