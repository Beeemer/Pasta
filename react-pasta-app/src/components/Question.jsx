import React, {useState} from 'react';

function Question({ data, value, onChange }) {
    return (
        <div className="question-block">
            <h3>{data.question}</h3>

            {data.type === "multiple" && (
                <div className="options">
                    {data.options.map((opt, idx) => (
                        <label key={idx} className="option">
                            <input
                                type="radio"
                                name={`q_${data.id}`}
                                value={opt}
                                checked={value === opt}
                                onChange={() => onChange(opt)}
                            />
                            <span>{opt}</span>
                        </label>
                    ))}
                </div>
            )}

            {data.type === "text" && (
                <textarea
                    className="text-input"
                    name={`q_${data.id}`}
                    value={value || ""}
                    placeholder={data.placeholder || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
}

export default Question;