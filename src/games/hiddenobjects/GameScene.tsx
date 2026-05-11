import React, { useReducer, useEffect, useRef, useState } from 'react';
import InteractiveObjectComponent from './InteractiveObjectComponent';
import { hiddenObjectsReducer, getInitialHiddenObjectsState, HiddenObjectsState, HiddenObjectsActionType } from './HiddenObjectsEngine';
import type { GameObject } from './HiddenObjectsEngine';
import './HiddenObjects.css'; // Import the CSS file

// Placeholder for GameInfo component
const GameInfo: React.FC<{ score: number; itemsToFind: number; timer: number; resetGame: () => void }> = ({ score, itemsToFind, timer, resetGame }) => (
  <div className="hidden-objects-game-info">
    <div>Score: {score}</div>
    <div>Items Left: {itemsToFind}</div>
    <div>Time: {timer}s</div>
    <button onClick={resetGame}>Reset</button>
  </div>
);

// Placeholder for ObjectList component
const ObjectList: React.FC<{ itemsToFind: GameObject[] }> = ({ itemsToFind }) => (
  <div className="object-list">
    <h3>Find these items:</h3>
    <ul>
      {itemsToFind.map(item => (
        <li key={item.id} className={item.isFound ? 'found' : ''}>
          {item.name || item.type} {/* Display name or type */}
        </li>
      ))}
    </ul>
  </div>
);

const initialHiddenObjectsState = getInitialHiddenObjectsState(); // Default state

const GameScene: React.FC = () => {
  const [state, dispatch] = useReducer(hiddenObjectsReducer, initialHiddenObjectsState);
  const gameWorldRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastUpdate = useRef<number>(0);

  // Initialize game on mount
  useEffect(() => {
    dispatch({ type: HiddenObjectsActionType.INIT_GAME, payload: { scene: 'forest', difficulty: 'medium' } }); // Example initialization
  }, []);

  // Game loop for updates (e.g., timer, object animations)
  useEffect(() => {
    const gameLoop = (currentTime: number) => {
      if (!state.isGameActive || state.isPuzzleComplete) {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
      }

      const deltaTime = currentTime - lastUpdate.current;
      lastUpdate.current = currentTime;

      // Update timer
      dispatch({ type: HiddenObjectsActionType.UPDATE_TIMER, payload: state.timer + 1 });

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    lastUpdate.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state.isGameActive, state.isPuzzleComplete, state.timer]); // Dependencies

  const handleObjectTap = (objectId: string) => {
    dispatch({ type: HiddenObjectsActionType.TAP_OBJECT, payload: { objectId } });
  };

  const resetGame = () => {
    dispatch({ type: HiddenObjectsActionType.RESET_GAME });
  };

  // Render all interactive objects
  const renderObjects = () => {
    return state.sceneObjects.map(obj => (
      <InteractiveObjectComponent
        key={obj.id}
        object={obj}
        cellSize={30} // Example cell size, should match engine/rendering logic
        isFound={obj.isFound || false}
        onClick={handleObjectTap}
      />
    ));
  };

  // Render items to find in the list
  const itemsToFind = state.sceneObjects.filter(obj => !obj.isFound);

  return (
    <div className="hidden-objects-game-container" ref={gameWorldRef}>
      <GameInfo score={state.score} itemsToFind={itemsToFind.length} timer={state.timer} resetGame={resetGame} />
      
      <div className="hidden-objects-scene" style={{ width: state.sceneWidth, height: state.sceneHeight }}>
        {renderObjects()}
      </div>
      
      <ObjectList itemsToFind={itemsToFind} />
    </div>
  );
};

export default GameScene;
