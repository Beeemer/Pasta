import React, { useState } from "react";
import questions from "../assets/questions.json";
import Question from "./Question";
import Header from "./Header.jsx";
import ProgressIndicator from "./ProgressIndicator.jsx";

export default function Questionnaire() {
    const [answers, setAnswers] = useState({});

    const handleAnswer = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const answeredCount = Object.values(answers).filter(
        (v) => v !== null && v !== "" && v !== undefined
    ).length;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Отговори:", answers);
    };

    return (
        <>
            <Header />

            <ProgressIndicator
                answered={answeredCount}
                total={questions.length}
            />

            <form onSubmit={handleSubmit} className="questionnaire">
                {questions.map((q) => (
                    <Question
                        key={q.id}
                        data={q}
                        value={answers[q.id]}
                        onChange={(val) => handleAnswer(q.id, val)}
                    />
                ))}

                <button type="submit">Изпрати</button>
            </form>
        </>
    );
}
