    export const calculateAnswer = (mcqQuestions,selectedAnswer,setCorrectAnswer,setIncorrectAnswer) => {
        mcqQuestions.forEach((item, index) => {
            if (item.options[selectedAnswer[index]] === item.correctAnswer) {
                setCorrectAnswer(prev => prev + 1);
            } else {
                setIncorrectAnswer(prev => prev + 1);
            }
        })
    }