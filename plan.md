# Tic Tac Toe App Enhancement Plan

The goal is to enhance the existing Tic Tac Toe application with better UI/UX, animations, score tracking, and visual feedback (winning line highlighting).

## Scope Summary
- **UI/UX Enhancement:** Add score tracking for Player X and Player O.
- **Animations:** Integrate `framer-motion` for smooth cell transitions and `canvas-confetti` for victory celebrations.
- **Visual Feedback:** Highlight the winning combination on the board.
- **State Management:** Update `useTicTacToe` hook to include score state and winning line detection.

## Assumptions and Open Questions
- **Score Persistence:** Scores will be kept in memory for the current session.
- **Winning Line:** The win detection logic will now return the indices of the winning combination to allow highlighting.

## Affected Areas
- **Frontend:**
  - `src/hooks/use-tic-tac-toe.ts`: Update logic for win detection and scores.
  - `src/components/tic-tac-toe/TicTacToe.tsx`: Update UI with framer-motion, confetti, and score display.
  - `src/App.tsx`: (Verify existing integration).

## Ordered Phases

### Phase 1: Logic Enhancement
- Update `use-tic-tac-toe.ts` to track scores and identify the winning line (indices).
- **Owner:** `frontend_engineer`

### Phase 2: UI & Animation Integration
- Add `framer-motion` animations to the board and cells.
- Integrate `canvas-confetti` trigger on win.
- Add score board UI elements.
- **Owner:** `frontend_engineer`

### Phase 3: Final Polish
- Refine colors and layout for the enhanced components.
- **Owner:** `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Enhance hook logic and implement UI animations/features.
2. quick_fix_engineer — Fine-tune styling and text.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1 & 2
- **Scope:** 
  - Modify `src/hooks/use-tic-tac-toe.ts`:
    - Add `scores` state: `{ X: 0, O: 0 }`.
    - Update `checkWinner` to return `{ winner, line }` where `line` is the array of 3 indices.
    - Increment scores when a winner is found.
  - Modify `src/components/tic-tac-toe/TicTacToe.tsx`:
    - Use `AnimatePresence` and `motion` from `framer-motion` for cell symbols.
    - Add a `ScoreBoard` component at the top.
    - Implement a `confetti` trigger using `canvas-confetti` on win.
    - Highlight winning cells (e.g., gold background or pulse effect).
- **Files:** `src/hooks/use-tic-tac-toe.ts`, `src/components/tic-tac-toe/TicTacToe.tsx`
- **Depends on:** none
- **Acceptance criteria:** Scores update correctly, winning line is visually distinct, and confetti fires on win.

### 2. quick_fix_engineer
- **Phases:** 3
- **Scope:** 
  - Ensure the score board is responsive and well-aligned.
  - Adjust the intensity of the winning cell highlight.
- **Files:** `src/components/tic-tac-toe/TicTacToe.tsx`
- **Depends on:** Phase 2
- **Acceptance criteria:** UI feels polished and cohesive.

**Do not dispatch:** supabase_engineer
