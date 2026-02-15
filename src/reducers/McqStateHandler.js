export const McqStateHandler = (state, action) => {
    if (action.type === 'startTest') {
        return {
            ...state,
            mainMcqPage: true,
            testGeneratorPopup: false,
            questionData: action.payload.questionData,
            testDuration: action.payload.testDuration,
            testName: action.payload.testName,

        }
    } else if (action.type === 'handlePopup') {
        return {
            ...state,
            testGeneratorPopup: action.payload.isOpen
        }
    }
    else if (action.type === 'endTest') {
        return {
            mainMcqPage: false,
            questionData: [],
            testDuration: null,
            testName: null,
            testGeneratorPopup: false
        };
    } else {
        return state;
    }

}