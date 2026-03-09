import type { QuestionObject } from "../../types/McqTypes";

    interface CalculateFunctionProps{
        mcqQuestions:QuestionObject[],
        selectedAnswer:number[],
        setCorrectAnswer:React.Dispatch<React.SetStateAction<number>>,
        setIncorrectAnswer:React.Dispatch<React.SetStateAction<number>>
    }
    
    export const calculateAnswer = ({mcqQuestions,selectedAnswer,setCorrectAnswer,setIncorrectAnswer}:CalculateFunctionProps) => {
        mcqQuestions.forEach((item, index:number) => {
            const selectedOption=selectedAnswer[index]
            if (selectedOption && item.options[selectedOption] === item.correctAnswer) {
                setCorrectAnswer(prev => prev + 1);
            } else {
                setIncorrectAnswer(prev => prev + 1);
            }
        })
    }