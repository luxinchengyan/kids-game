import React, { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js'; // Assuming Matter.js is available

import { angryBirdsReducer, AngryBirdsActionType, AngryBirdsState, GameObject, Level, EXAMPLE_LEVEL_1 } from './AngryBirdsEngine';
// import type { TetrisCell, TetrisGrid } from './SudokuEngine'; // Incorrect import, should be from AngryBirdsEngine
import BirdComponent from './BirdComponent';
import PigComponent from './PigComponent';
import BlockComponent from './BlockComponent';
import GroundComponent from './GroundComponent';
import SlingshotComponent from './SlingshotComponent';
import './AngryBirds.css'; // Import the CSS file

// --- Game Constants ---
// These should ideally be defined in AngryBirdsEngine.ts or a shared constants file.
const WORLD_WIDTH = 1200; // Example world dimensions for rendering context
const WORLD_HEIGHT = 800;
const CELL_SIZE = 30; // Pixels per grid unit for rendering

// --- Main Game Field Component ---
const initialAngryBirdsState: AngryBirdsState = {
  engine: null,
  world: null,
  level: null,
  birds: [],
  pigs: [],
  blocks: [],
  slingshot: null,
  activeBird: null,
  birdsRemaining: 0,
  pigsRemaining: 0,
  isAiming: false,
  isBirdFlying: false,
  isLevelComplete: false,
  isGameOver: false,
  score: 0,
};

const AngryBirdsGameField: React.FC = () => {
  const [state, dispatch] = useReducer(angryBirdsReducer, initialAngryBirdsState);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastUpdate = useRef<number>(0);

  // Initialize level and physics engine
  useEffect(() => {
    const levelData = EXAMPLE_LEVEL_1; // Load level data
    dispatch({ type: AngryBirdsActionType.INIT_LEVEL, payload: { level: levelData } });
  }, []); // Run only once on mount

  // Game loop for physics updates and game state checks
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!state.engine || !state.world || state.isGameOver || state.isLevelComplete) {
        // Stop animation if game is over or level complete
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
      }

      const deltaTime = currentTime - lastUpdate.current;
      lastUpdate.current = currentTime;

      // Update physics world
      Matter.Engine.update(state.engine, deltaTime);

      // --- Game State Checks & Updates ---
      // Check if bird has landed or is out of bounds
      if (state.activeBird && state.isBirdFlying) {
        const birdBody = state.activeBird.body;
        // Check if bird stopped moving (velocity near zero) or went out of bounds
        if (Math.abs(birdBody.velocity.x) < 0.1 && Math.abs(birdBody.velocity.y) < 0.1 || birdBody.position.y > WORLD_HEIGHT + 100) {
          dispatch({ type: AngryBirdsActionType.BIRD_LANDED, payload: { bird: state.activeBird } });
        }
      }

      // Check for pigs destroyed (e.g., by monitoring pig bodies and their removal from world)
      // This is complex and might require listening to Matter.js events (collision, body removal)
      // For now, assuming pigs are destroyed when their bodies are no longer in the world or have health = 0.
      // This check needs to be more robust.
      const remainingPigsInWorld = state.world?.bodies.filter(body => body.label === 'pig').length || 0;
      if (remainingPigsInWorld < state.pigsRemaining) {
          // Dispatch PIG_DESTROYED action with the number of pigs destroyed
          dispatch({ type: AngryBirdsActionType.PIG_DESTROYED, payload: { pigsDestroyed: state.pigsRemaining - remainingPigsInWorld } });
      }
      
      // Check for level completion or game over
      if (state.pigsRemaining <= 0) {
        dispatch({ type: AngryBirdsActionType.LEVEL_COMPLETE });
      } else if (state.birdsRemaining <= 0 && !state.isBirdFlying) {
        dispatch({ type: AngryBirdsActionType.GAME_OVER });
      }

      // Request next frame
      requestRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    lastUpdate.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      // Cleanup animation frame and physics engine
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (state.engine) Matter.Engine.stop(state.engine);
    };
  }, [state.engine, state.world, state.isGameOver, state.isLevelComplete, state.activeBird, state.isBirdFlying, state.pigsRemaining, state.birdsRemaining, state.gameSpeed]); // Dependencies

  // Handle keyboard input for controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // currentPiece is from Tetris, need to check activeBird or similar for AB controls
      if (state.isGameOver || !state.activeBird) return; 

      // Implement Angry Birds specific controls here (e.g., slingshot dragging, bird ability tap)
      // For now, this input handling is Tetris-like and needs to be adapted.
      // Example: If player clicks/drags on slingshot or bird
      // console.log("Key pressed:", e.key); // For debugging
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.activeBird, state.isGameOver]); // Adapted dependencies

  // --- Rendering Logic ---
  // This needs to map physics bodies to rendered elements.
  // The current state.birds, .pigs, .blocks etc. would hold references to their bodies.
  const renderAllObjects = () => {
    const objectsToRender: GameObject[] = [
      ...(state.birds || []),
      ...(state.pigs || []),
      ...(state.blocks || []),
      ...(state.slingshot ? [state.slingshot] : []),
      // Ground is usually static and might be rendered differently or as part of background
    ];

    return objectsToRender.map((obj) => {
      // Use specific components based on object type
      switch (obj.type) {
        case 'bird': return <BirdComponent key={obj.id} bird={obj} />;
        case 'pig': return <PigComponent key={obj.id} pig={obj} />;
        case 'block': return <BlockComponent key={obj.id} block={obj} />;
        case 'ground': return <GroundComponent key={obj.id} ground={obj} />;
        case 'slingshot': return <SlingshotComponent key={obj.id} slingshot={obj} />;
        default: return null; // Should not happen
      }
    });
  };

  return (
    <div className="angrybirds-game-container" ref={gameContainerRef}>
      {/* Game Info Overlay (Score, Birds Left) */}
      <div className="angrybirds-game-info">
        <div>Birds Left: {state.birdsRemaining}</div>
        <div>Score: {state.score}</div>
        <div>Level: {state.level?.name}</div>
        <button onClick={() => dispatch({ type: AngryBirdsActionType.RESET_LEVEL })}>Reset</button>
      </div>

      {/* Game World Viewport */}
      <div className="angrybirds-game-world" style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}>
        {renderAllObjects()}
        {/* Slingshot might need special rendering/interaction logic */}
      </div>

      {/* Slingshot aiming interaction - would typically be on mousedown/touchstart on slingshot */}
      {/* Needs more sophisticated implementation for drag, force calculation, trajectory prediction */}
      {state.isAiming && state.activeBird && (
        <div className="slingshot-controls">
          {/* Aiming UI elements */}
        </div>
      )}
    </div>
  );
};

export default AngryBirdsGameField;
