
export const fetchQuestions = questions => ({
    type: 'FETCH_QUESTIONS',
    questions
});

export const fetchQuestionDetail = questionDetail => ({
    type: 'FETCH_QUESTION_DETAIL',
    questionDetail
});
