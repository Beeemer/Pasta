import React, { useState } from "react";
import questions from "../assets/questions.json";
import Question from "./Question";
import Header from "./Header.jsx";
import ProgressIndicator from "./ProgressIndicator.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Questionnaire() {
    const [answers, setAnswers] = useState({});

    const handleAnswer = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const answeredCount = Object.values(answers).filter(
        (v) => v !== null && v !== "" && v !== undefined
    ).length;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            answers,
        };

        try {
            const res = await fetch(`${API_URL}/api/responses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Failed to submit");
            }

            // по желание – може да изчистиш отговорите или да покажеш съобщение
            alert("Благодарим! Формата е изпратена 🍝");
            // setAnswers({}); // ако искаш да се нулират
        } catch (err) {
            console.error(err);
            alert("Стана грешка при изпращане :(");
        }
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
