// Original code by Homer Chen
// https://github.com/homerchen19/use-undo

// Same as original but using useState instead of useReducer

import { useState, useCallback } from 'react';

const initialState = {
  past: [],
  present: null,
  future: [],
};

function undoAction(state) {
  const { past, present, future } = state;
  const previous = past[past.length - 1];
  const newPast = past.slice(0, past.length - 1);

  return {
    past: newPast,
    present: previous,
    future: [present, ...future],
  };
}

function redoAction(state) {
  const { past, present, future } = state;
  const next = future[0];
  const newFuture = future.slice(1);

  return {
    past: [...past, present],
    present: next,
    future: newFuture,
  };
}

function setAction(state, { newPresent }) {
  const { past, present } = state;

  if (newPresent === present) {
    return state;
  }
  return {
    past: [...past, present],
    present: newPresent,
    future: [],
  };
}

function resetAction({ newPresent }) {
  return {
    past: [],
    present: newPresent,
    future: [],
  };
}

const useUndo = initialPresent => {
  const [state, setState] = useState({
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) {
      setState(state => undoAction(state));
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setState(state => redoAction(state));
    }
  }, [canRedo]);

  const set = useCallback(
    newPresent =>
      setState(currentState => setAction(currentState, { newPresent })),
    []
  );

  const reset = useCallback(
    newPresent => setState(() => resetAction({ newPresent })),
    []
  );

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};

export default useUndo;
