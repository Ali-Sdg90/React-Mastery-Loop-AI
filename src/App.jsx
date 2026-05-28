import { useMemo, useState } from "react";
import challenges from "./data/challenges";
import MarkdownView from "./components/MarkdownView";
import "./App.css";
import challengesSoFar from "../challenges_so_far.md?raw";

const App = () => {
    const [selectedId, setSelectedId] = useState(challenges[0]?.id || "");

    const selectedChallenge = useMemo(
        () =>
            challenges.find((item) => item.id === selectedId) || challenges[0],
        [selectedId],
    );

    return (
        <div className="app-shell">
            <header className="app-header">
                <div>
                    <p className="eyebrow">react mastery loop ai</p>
                    <h1>First challenge dashboard</h1>
                    <p className="subtext">
                        This interface connects the React app to challenge
                        content and the learner memory file.
                    </p>
                </div>
                <div className="status-pill">Ready for challenge 01</div>
            </header>

            <div className="app-grid">
                <aside className="challenge-sidebar">
                    <h2>Challenges</h2>
                    <div className="challenge-list">
                        {challenges.map((challenge) => (
                            <button
                                key={challenge.id}
                                className={
                                    challenge.id === selectedId
                                        ? "challenge-item active"
                                        : "challenge-item"
                                }
                                onClick={() => setSelectedId(challenge.id)}
                            >
                                <span>{challenge.title}</span>
                                <small>{challenge.folder}</small>
                            </button>
                        ))}
                    </div>
                </aside>

                <main className="challenge-view">
                    <section className="panel hero-panel">
                        <div>
                            <p className="panel-label">Current challenge</p>
                            <h2>{selectedChallenge.title}</h2>
                            <p>{selectedChallenge.description}</p>
                        </div>
                    </section>

                    <section className="panel">
                        <h3>Challenge brief</h3>
                        <MarkdownView content={selectedChallenge.readme} />
                    </section>

                    <section className="panel split-panel">
                        <div>
                            <h3>Requirements</h3>
                            <MarkdownView
                                content={selectedChallenge.requirements}
                            />
                        </div>
                        <div>
                            <h3>Hints</h3>
                            <MarkdownView content={selectedChallenge.hints} />
                        </div>
                    </section>

                    <section className="panel">
                        <h3>Starter notes</h3>
                        <MarkdownView
                            content={selectedChallenge.starterNotes}
                        />
                    </section>

                    <section className="panel">
                        <h3>Learning memory</h3>
                        <MarkdownView content={challengesSoFar} />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default App;
