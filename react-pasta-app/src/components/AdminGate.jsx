import { useState } from "react";

export default function AdminGate({ children }) {
    const [input, setInput] = useState("");
    const [authorized, setAuthorized] = useState(false);

    const REAL_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    function handleLogin(e) {
        e.preventDefault();
        if (input === REAL_PASSWORD) {
            setAuthorized(true);
        } else {
            alert("Грешна парола");
        }
    }

    if (!authorized) {
        return (
            <div
                style={{
                    maxWidth: "400px",
                    margin: "5rem auto",
                    padding: "2rem",
                    background: "rgba(0,0,0,0.7)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "16px",
                    textAlign: "center",
                    color: "#f7f1d9",
                    border: "1px solid #EDDEA4",
                }}
            >
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input
                        type="password"
                        placeholder="Парола"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                            padding: "0.7rem",
                            borderRadius: "8px",
                            border: "1px solid #EDDEA4",
                            background: "rgba(255,255,255,0.1)",
                            color: "#fff",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "0.7rem",
                            background: "#ebaf2f",
                            border: "none",
                            borderRadius: "8px",
                            color: "#0F3649",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Вход
                    </button>
                </form>
            </div>
        );
    }

    return children;
}
