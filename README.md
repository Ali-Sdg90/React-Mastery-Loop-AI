# React-Mastery-Loop-AI

## Overview

`React-Mastery-Loop-AI` is a personalized AI-driven React learning system designed for Ali to improve React skills through continuous feedback loops.

Instead of following a fixed curriculum, the system adapts to real performance, mistakes, and progress.

It behaves like a personal AI mentor that:

- Generates React challenges
- Evaluates solutions deeply
- Detects weak areas and patterns
- Adapts future challenges dynamically

## Core Idea

This is not a course, tutorial, or checklist.

It is a **feedback-driven learning loop**:

> Learn React by building, breaking, and improving through iteration.

## How It Works

### 1. Challenge Generation

AI reads `challenges_so_far.md`, analyzes:

- Past challenges
- Mistake patterns
- Weak and strong areas

Then it generates a new challenge:

challenge-XX-name/
README.md
requirements.md
hints.md
starter-notes.md

### 2. Implementation

You:

- Build the React challenge
- Focus on UI, logic, and state handling
- Solve problems through real implementation

### 3. Evaluation

AI reviews:

- React fundamentals
- State management
- Component design
- Hooks usage
- API integration
- Code quality

Then provides structured scores and feedback.

### 4. Learning Memory Update

`challenges_so_far.md` is updated with:

- Summary of challenge
- Scores
- Strengths
- Weaknesses
- Key lessons learned

### 5. Next Challenge

The next challenge is generated adaptively based on your performance.

Difficulty evolves dynamically — not fixed, not linear.

## Tech Scope

This system focuses on real-world React development using:

### Core React

- Functional components

### Hooks

- useState
- useEffect
- useMemo
- useCallback
- custom hooks

### Component Design

- Composition patterns
- State lifting
- Controlled components

### API Handling Libraries

- fetch
- axios

### Common Libraries

- React Router
- React Query (for data fetching patterns)
- Zustand (lightweight state management)
- etc.

## Rules

- No TypeScript
- No backend development
- No Next.js or external frameworks
- No Redux (unless later introduced by AI)
- No unnecessary libraries or overengineering

## Goal

To build strong, real-world React skills through:

- Iterative practice
- Continuous feedback
- Progressive challenge design
- Real implementation experience

## Philosophy

> Skill is built through feedback loops, not passive learning.

build → break → fix → improve → repeat

## Personal Note

This system is designed specifically for **Ali**.

However, if someone else wants to use it, they can:

- Use `1-challenge-generator-prompt.md` → for challenge generation
- Use `2-challenge-evaluator-prompt.md` → for evaluation and feedback

These two prompts power the entire system loop.

Good luck Ali!

and anyone else who wants to use this system!
