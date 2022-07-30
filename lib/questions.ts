export interface IQuestionInner {text: string, probImpact: number}
export interface IQuestion { favors: string; question: IQuestionInner }
export interface IQuestions { [key: string]: IQuestion[] }

let questions: IQuestions = {}

const addCondition = (obj: IQuestions, name: string, questions: IQuestionInner[]) => {
  let questionList: IQuestion[] = []
  for (const q of questions) {
    questionList.push({ favors: name, question: q })
  }
  obj[name] = questionList
}

const a: IQuestionInner = { text: "Does it itch?", probImpact: 0.02 }
const b: IQuestionInner = { text: "Do you feel numbness in the area?", probImpact: 0.05 }
const c: IQuestionInner = { text: "Does the area feel cold?", probImpact: 0.1 }

addCondition(questions, "eczema", [a])
addCondition(questions, "gangrene", [b,c])

export default questions
