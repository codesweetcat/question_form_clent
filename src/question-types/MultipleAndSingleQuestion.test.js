import { render, screen } from "@testing-library/react";
import MultipleAndSingleQuestion from "./MultipleAndSingleQuestion";
import {clickNoneBox} from "../utils/utils";

test("test a describtion", () => {
    const mockAnswers = [
        {
            "answers": [
                {
                    "sort_code": "0",
                    "answer_title": "Abdominal pain"
                },
                {
                    "sort_code": "1",
                    "answer_title": "Facial pain"
                },
                {
                    "sort_code": "2",
                    "answer_title": "Cancer-related pain"
                },
                {
                    "sort_code": "3",
                    "answer_title": "Headache"
                },
                {
                    "sort_code": "4",
                    "answer_title": "Multiple sclerosis"
                },
                {
                    "sort_code": "5",
                    "answer_title": "Back and neck pain"
                },
                {
                    "sort_code": "6",
                    "answer_title": "None"
                }
            ],
            "describtion": "Do you have one of the following conditions that you are hoping to discuss Medical Cannabis treatment for?"
        },
        {
            "answers": [
                {
                    "sort_code": "0",
                    "answer_title": "Yes"
                },
                {
                    "sort_code": "1",
                    "answer_title": "No"
                }
            ],
            "describtion": "Have you ever had an episode of schizophrenia and/or psychosis?"
        }
    ];
  render(<MultipleAndSingleQuestion 
            questionSetId = {0}
            choiceAnswers = {mockAnswers}
  />);
  const describtionElement = screen.getByText(/Do you have one of the following conditions that you are hoping to discuss Medical Cannabis treatment for?/i);
  expect(describtionElement).toBeInTheDocument();
});

describe("checking none checkbox -logic", () => {
    test("click none box false->true, should flap up others", ()=>{
        const currentCheckBoxState = [true, true, false];
        const outPut = clickNoneBox(currentCheckBoxState, 2);
        expect(outPut).toEqual([false, false, true]);
    });

    test("click none box true->false, keep others", ()=>{
        const currentCheckBoxState = [false, false, true];
        const outPut = clickNoneBox(currentCheckBoxState, 2);
        expect(outPut).toEqual([false, false, false]);
    });

    test("click others and none box selected, none box update", ()=>{
        const currentCheckBoxState = [false, false, true];
        const outPut = clickNoneBox(currentCheckBoxState, 0);
        expect(outPut).toEqual([true, false, false]);
    });

});

