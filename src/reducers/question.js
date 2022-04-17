const initialState = { 
    questions: [],
    questionDetail: [],
}

const items = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_QUESTIONS':
            return {
                ...state,
                questions:action.questions
            }
        case 'FETCH_QUESTION_DETAIL':
            return {
                ...state,
                questionDetail:action.questionDetail
            }
        default:
            return state
    }
}

export default items;