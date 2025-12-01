import { useEffect, useState, useMemo } from "react";
import questions from "../assets/questions.json";
import "../CSS/AdminPage.css"

const API_URL = import.meta.env.VITE_API_URL || "https://pasta-api-xnkp.onrender.com";

export default function AdminPage() {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/api/responses`);
                if (!res.ok) throw new Error("Failed to fetch responses");
                const data = await res.json();
                setResponses(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // basic статистики
    const stats = useMemo(() => {
        const result = [];

        questions.forEach((q) => {
            if (q.type !== "multiple") return;

            const counts = {};
            responses.forEach((r) => {
                const ans = r.data?.[q.id]; // в базата е {"1": "...", "2": "..."}
                if (!ans) return;
                counts[ans] = (counts[ans] || 0) + 1;
            });

            result.push({
                id: q.id,
                question: q.question,
                counts,
            });
        });

        return result;
    }, [responses]);

    const openAnswers = useMemo(() => {
        const result = [];

        questions.forEach((q) => {
            if (q.type !== "text") return;

            const answersForQuestion = [];

            responses.forEach((r) => {
                const ans = r.data?.[String(q.id)];
                if (!ans) return;
                answersForQuestion.push(ans);
            });

            result.push({
                id: q.id,
                question: q.question,
                answers: answersForQuestion,
            });
        });

        return result;
    }, [responses]);

    if (loading) return <div className="admin-page">Зареждане...</div>;
    if (error) return <div className="admin-page">Грешка: {error}</div>;

    return (
        <div className="admin-page-wrapper">
            <div className="admin-page">
                <h1>Админ – резултати</h1>

                <section className="admin-summary">
                    <div className="admin-card">
                        <h2>Общ брой попълвания</h2>
                        <p className="admin-number">{responses.length}</p>
                    </div>
                </section>

                {/* Статистика по multiple въпроси */}
                <section className="admin-stats">
                    <h2>Статистика по въпроси</h2>
                    {stats.map((s) => (
                        <div key={s.id} className="admin-stat-card">
                            <h3>{s.question}</h3>
                            <ul>
                                {Object.entries(s.counts).map(([answer, count]) => (
                                    <li key={answer}>
                                        <span className="answer">{answer}</span>
                                        <span className="count">{count}</span>
                                    </li>
                                ))}
                                {Object.keys(s.counts).length === 0 && (
                                    <li className="muted">Няма още отговори</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* НОВО: Отворени въпроси */}
                <section className="admin-open">
                    <h2>Отворени отговори</h2>
                    {openAnswers.map((q) => (
                        <div key={q.id} className="admin-open-card">
                            <h3>{q.question}</h3>
                            {q.answers.length === 0 ? (
                                <p className="muted">Няма още отговори</p>
                            ) : (
                                <ul>
                                    {q.answers.map((ans, idx) => (
                                        <li key={idx}>{ans}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>


            </div>
        </div>
    );
}