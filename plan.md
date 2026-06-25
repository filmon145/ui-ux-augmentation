# Tic Tac Toe UI Modernization & Final Polish

The user wants to finish the project and specifically mentioned they don't like the current background color. They want to make it the "best app to play". This plan focuses on replacing the hardcoded background image with a modern aesthetic and polishing the overall UI/UX.

## Scope Summary
- **Background Refresh:** Remove the hardcoded Google Storage background image and replace it with a high-quality CSS gradient or abstract aesthetic.
- **UI/UX Polishing:** Refine the game board, scoreboard, and "How to Play" section for a premium feel.
- **Visual Feedback:** Ensure winning highlights and animations (confetti, framer-motion) are perfectly integrated with the new theme.
- **Deployment Info:** Prepare to provide deployment guidance (Vercel/Netlify/GitHub Pages).

## Auth & RLS model
**Auth in scope:** no
**Model:** no_auth_public_read
**RLS strategy:** Not applicable (no database required).
**Frontend implication:** All game state and scores are local to the session.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Affected Areas
- **Frontend:**
  - `src/App.tsx`: Background styling and container layout.
  - `src/components/tic-tac-toe/TicTacToe.tsx`: Component styling and theme colors.
  - `src/index.css`: Theme variables (if needed).

## Ordered Phases

### Phase 1: Background & Theme Modernization
- Replace the `backgroundImage` in `src/App.tsx` with a modern, high-contrast CSS gradient (e.g., deep slate to indigo).
- Update the backdrop blur and container to feel more "glassmorphic".
- **Owner:** `frontend_engineer`

### Phase 2: Game Board & UI Polish
- Update `TicTacToe.tsx` to use more professional colors for symbols (X/O) and winning highlights.
- Refine the ScoreBoard layout for better visibility and modern typography.
- Ensure "How to Play" text is concise and well-placed.
- **Owner:** `frontend_engineer`

### Phase 3: Final Consistency & Accessibility
- Check mobile responsiveness and touch targets.
- Final CSS cleanup and typo checks.
- **Owner:** `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Modernize background and polish game UI components.
2. quick_fix_engineer — Final responsiveness and CSS consistency check.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1 & 2
- **Scope:** 
  - Modify `src/App.tsx`: Remove the external URL background image. Use a `bg-gradient-to-br from-slate-900 via-indigo-950 to-black` (or similar premium dark theme).
  - Modify `src/components/tic-tac-toe/TicTacToe.tsx`:
    - Update symbols: X (cyan-400), O (rose-400).
    - Update winning line highlight: subtle glowing cyan or gold border.
    - Polish the ScoreBoard with semi-transparent backgrounds and clear contrast.
- **Files:** `src/App.tsx`, `src/components/tic-tac-toe/TicTacToe.tsx`
- **Depends on:** none
- **Acceptance criteria:** No more external background images; app looks high-end and modern.

### 2. quick_fix_engineer
- **Phases:** 3
- **Scope:** 
  - Ensure centered alignment on all screen sizes.
  - Check that the "How to Play" instructions don't clutter the main game view.
- **Files:** `src/components/tic-tac-toe/TicTacToe.tsx`
- **Depends on:** Phase 2
- **Acceptance criteria:** Responsive and visually consistent across devices.

**Do not dispatch:** supabase_engineer
