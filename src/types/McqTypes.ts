import type React from "react"

export type QuestionObject={
    correctAnswer:string,
    options:string[],
    question:string
}

export type McqTestState={
    mainMcqPage: boolean,
    questionData: QuestionObject[] | null,
    testDuration: number | null,
    testName: string | null,
    testGeneratorPopup: boolean
}


export type McqTestAction={type:'startTest',payload:{questionData:QuestionObject[],testDuration:number,testName:string}} | {type:'handlePopup',payload:{isOpen:boolean}} | {type:'endTest'}

export interface McqTestInterface{
    state:McqTestState,
    dispatch:React.Dispatch<McqTestAction>
}