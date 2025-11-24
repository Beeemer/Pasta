import React from "react";
import "../CSS/ProgressIndicator.css";

export default function ProgressIndicator({ answered, total }) {
    const progress = total === 0 ? 0 : (answered / total) * 100;

    return (
        <div className="progress-floating">
            <div className="progress-circle">
                <svg viewBox="0 0 36 36">
                    <path
                        className="progress-bg"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    <path
                        className="progress-bar"
                        strokeDasharray={`${progress}, 100`}
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>

                <div className="progress-text">
                    {answered}/{total}
                </div>
            </div>
        </div>
    );
}