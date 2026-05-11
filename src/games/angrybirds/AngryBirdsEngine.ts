// src/games/angrybirds/AngryBirdsEngine.ts

// import Matter from 'matter-js'; // Assuming Matter.js is available for physics
// For the purpose of this file creation, we will mock Matter.js interfaces if not available globally.
// In a real environment, 'matter-js' would be installed as a dependency.

// Mock interfaces if Matter.js is not globally available
interface MockMatterBody {
  id: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  angle: number;
  // Add other properties as needed for physics simulation
  isStatic: boolean;
  isSensor: boolean;
  label: string; // For identifying object types
  restitution: number;
  friction: number;
  // ... other Matter.js Body properties
}

interface MockMatterEngine {
  world: MockMatterWorld;
  // ... other Engine properties
}

interface MockMatterWorld {
  bodies: MockMatterBody[];
  gravity: { scale: number };
  // ... other World properties
}

const MockMatter = {
  Bodies: {
    rectangle: (x: number, y: number, w: number, h: number, options?: any) => ({
      id: Math.random(), position: { x, y }, velocity: { x: 0, y: 0 }, angle: 0, isStatic: options?.isStatic || false, isSensor: options?.isSensor || false, label: options?.label || 'body', restitution: options?.restitution || 0.2, friction: options?.friction || 0.3, width: w, height: h, shape: 'rectangle'
    }),
    circle: (x: number, y: number, radius: number, options?: any) => ({
      id: Math.random(), position: { x, y }, velocity: { x: 0, y: 0 }, angle: 0, isStatic: options?.isStatic || false, isSensor: options?.isSensor || false, label: options?.label || 'body', radius: radius, restitution: options?.restitution || 0.2, friction: options?.friction || 0.3, shape: 'circle'
    }),
    // polygon omitted for brevity unless strictly needed
  },
  World: {
    add: (world: MockMatterWorld, body: MockMatterBody) => world.bodies.push(body),
    clear: (world: MockMatterWorld, keepStatic: boolean, clearFlags: boolean) => {
      if (keepStatic) {
        world.bodies = world.bodies.filter(b => b.isStatic);
      } else {
        world.bodies = [];
      }
    },
    run: (engine: MockMatterEngine) => { /* Mock run */ },
  },
  Engine: {
    create: (options?: any) => {
      const world: MockMatterWorld = { bodies: [], gravity: { scale: options?.gravity?.scale || 0.001 } };
      return { world };
    },
    stop: (engine: MockMatterEngine) => { /* Mock stop */ },
  }
};
// Use mock if Matter is not globally defined
const Matter = (typeof window !== 'undefined' && (window as any).Matter) || MockMatter;


// --- Game Constants ---
const GRAVITY_SCALE = 0.001; // Adjust gravity for game feel
const WORLD_WIDTH = 1200; // Example world dimensions for physics
const WORLD_HEIGHT = 800;

// --- Interfaces ---
export interface GameObject {
  id: string;
  type: 'bird' | 'pig' | 'block' | 'ground' | 'slingshot';
  body: MockMatterBody; // Physics body from Matter.js or mock
  color?: string; // For rendering
  initialColor?: string; // To reset color
  initialPosition: Point; // To reset position
  shape?: 'rectangle' | 'circle' | 'polygon'; // For rendering
  initialState?: any; // For reset/level reload
}

export interface Level {
  id: string;
  name: string;
  description: string;
  objects: GameObject[]; // Initial physics objects configuration
  targetPigIds: string[]; // IDs of pigs to defeat
  birdsAvailable: number;
  camera: { x: number; y: number }; // Initial camera position
}

export interface AngryBirdsState {
  engine: MockMatterEngine | null;
  world: MockMatterWorld | null;
  level: Level | null;
  birds: GameObject[];
  pigs: GameObject[];
  blocks: GameObject[];
  slingshot: GameObject | null;
  activeBird: GameObject | null; // The bird currently being aimed or flying
  birdsRemaining: number;
  pigsRemaining: number;
  isAiming: boolean; // True when player is pulling the slingshot
  isBirdFlying: boolean;
  isLevelComplete: boolean;
  isGameOver: boolean;
  score: number;
  // Other states like timer, trajectory prediction, etc.
}

export enum AngryBirdsActionType {
  INIT_LEVEL = 'INIT_LEVEL',
  AIM_SLINGSHOT = 'AIM_SLINGSHOT', // Player starts pulling the slingshot
  LAUNCH_BIRD = 'LAUNCH_BIRD',     // Player releases the slingshot
  BIRD_FLYING = 'BIRD_FLYING',     // Bird is in motion
  BIRD_LANDED = 'BIRD_LANDED',     // Bird has stopped moving
  PIG_DESTROYED = 'PIG_DESTROYED',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  GAME_OVER = 'GAME_OVER',
  RESET_LEVEL = 'RESET_LEVEL',
}

// --- Game Logic Functions ---

// Initializes the physics engine and world
function createPhysicsEngine(): { engine: MockMatterEngine; world: MockMatterWorld } {
  const engine = MockMatter.Engine.create({
    gravity: { scale: GRAVITY_SCALE },
    enableSleeping: true,
  });
  const world = engine.world;
  return { engine, world };
}

// Creates game objects from level data
function createLevelObjects(levelData: Level, world: MockMatterWorld): GameObject[] {
  const objects: GameObject[] = [];

  // Create ground
  const groundBody = MockMatter.Bodies.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT, WORLD_WIDTH, 50, { isStatic: true, label: 'ground' });
  Matter.World.add(world, groundBody);
  objects.push({ id: 'ground', type: 'ground', body: groundBody, initialState: { position: { ...groundBody.position }, isStatic: groundBody.isStatic } });

  // Create other level objects (blocks, pigs, birds, slingshot) from levelData
  levelData.objects.forEach(objDef => {
    let body: MockMatterBody;
    const options = { 
      label: objDef.type, 
      isStatic: objDef.body.isStatic || false,
      isSensor: objDef.body.isSensor || false,
      restitution: objDef.body.restitution || 0.3,
      friction: objDef.body.friction || 0.1,
    };

    switch (objDef.shape) {
      case 'rectangle':
        body = MockMatter.Bodies.rectangle(objDef.body.position.x, objDef.body.position.y, objDef.body.width, objDef.body.height, options);
        break;
      case 'circle':
        body = MockMatter.Bodies.circle(objDef.body.position.x, objDef.body.position.y, objDef.body.radius, options);
        break;
      default: // Default to rectangle if shape is not specified or unknown
        body = MockMatter.Bodies.rectangle(objDef.body.position.x, objDef.body.position.y, objDef.body.width || 50, objDef.body.height || 50, { ...options, label: objDef.type });
        break;
    }
    
    // Store initial position for reset
    const initialState = { position: { ...body.position }, isStatic: body.isStatic, restitution: body.restitution, friction: body.friction };

    Matter.World.add(world, body);
    objects.push({ ...objDef, body, initialState });
  });

  return objects;
}

// Finds objects by type or ID
function findObjects(allObjects: GameObject[], type: GameObject['type'] | string, id?: string): GameObject[] {
    return allObjects.filter(obj => obj.type === type || (id && obj.id === id));
}

// Resets game objects to their initial state
function resetObjects(level: Level, world: MockMatterWorld): GameObject[] {
    // Clear existing objects from world (except static ground)
    world.bodies.forEach(body => {
        if (!body.isStatic) {
            Matter.World.remove(world, body);
        }
    });

    const objects: GameObject[] = [];
    // Re-add ground if it's static
    const ground = level.objects.find(obj => obj.type === 'ground');
    if(ground && ground.body.isStatic) {
        Matter.World.add(world, ground.body);
        objects.push(ground); // Keep ground in our object list too
    }

    // Re-create other objects from their initial states
    level.objects.forEach(objDef => {
        if (objDef.type === 'ground') return; // Skip ground as it's handled

        let body: MockMatterBody;
        const options = { 
            label: objDef.type, 
            isStatic: objDef.body.isStatic || false, // Should be false for resettable objects
            isSensor: objDef.body.isSensor || false,
            restitution: objDef.initialState.restitution || 0.3,
            friction: objDef.initialState.friction || 0.1,
        };

        switch (objDef.shape) {
            case 'rectangle':
                body = MockMatter.Bodies.rectangle(objDef.initialState.position.x, objDef.initialState.position.y, objDef.body.width, objDef.body.height, options);
                break;
            case 'circle':
                body = MockMatter.Bodies.circle(objDef.initialState.position.x, objDef.initialState.position.y, objDef.body.radius, options);
                break;
            default: continue;
        }
        Matter.World.add(world, body);
        objects.push({ ...objDef, body }); // Use original def but new body
    });
    return objects;
}


// --- Reducer function to manage Angry Birds game state ---
export function angryBirdsReducer(state: AngryBirdsState, action: { type: AngryBirdsActionType; payload?: any }): AngryBirdsState {
  let engine: MockMatterEngine;
  let world: MockMatterWorld;
  let objects: GameObject[];
  let updatedBirds: GameObject[];
  let updatedPigs: GameObject[];
  let updatedBlocks: GameObject[];
  let updatedSlingshot: GameObject | null = null;
  let activeBird: GameObject | null = null;
  let birdsRemaining: number;
  let pigsRemaining: number;
  let isGameOver = state.isGameOver;
  let isLevelComplete = state.isLevelComplete;

  switch (action.type) {
    case AngryBirdsActionType.INIT_LEVEL: {
      // Ensure physics engine is created only once or reset if needed
      if (state.engine && state.world) {
        Matter.Engine.stop(state.engine); // Stop existing engine if any
        Matter.World.clear(state.world, false, true); // Clear world, keep static bodies
        Matter.Engine.run(state.engine); // Restart engine
        world = state.world;
      } else {
        ({ engine, world } = createPhysicsEngine());
      }
      
      const levelData = action.payload.level; // Assuming level data is passed
      const levelObjects = createLevelObjects(levelData, world);
      
      const birds = findObjects(levelObjects, 'bird');
      const pigs = findObjects(levelObjects, 'pig');
      const blocks = findObjects(levelObjects, 'block');
      const slingshot = findObjects(levelObjects, 'slingshot')[0] || null;

      // Set initial birds remaining
      birdsRemaining = levelData.birdsAvailable || birds.length;
      pigsRemaining = levelData.targetPigIds.length > 0 ? levelData.targetPigIds.length : pigs.length; // Default to total pigs if not specified

      return {
        ...state,
        engine: engine,
        world: world,
        level: levelData,
        birds: birds,
        pigs: pigs,
        blocks: blocks,
        slingshot: slingshot,
        activeBird: null, // No active bird initially
        birdsRemaining: birdsRemaining,
        pigsRemaining: pigsRemaining,
        isAiming: false,
        isBirdFlying: false,
        isLevelComplete: false,
        isGameOver: false,
        score: 0,
      };
    }

    case AngryBirdsActionType.AIM_SLINGSHOT: {
      // Player starts aiming, maybe activate slingshot physics/visuals
      return { ...state, isAiming: true };
    }

    case AngryBirdsActionType.LAUNCH_BIRD: {
      // Player releases slingshot, bird becomes active and physics takes over
      const { bird, force } = action.payload; // Bird to launch, force vector from slingshot
      if (!bird || !force || !state.world) return state;

      // Apply force to the bird's body
      Matter.Body.applyForce(bird.body, bird.body.position, force);
      return {
        ...state,
        activeBird: bird,
        isAiming: false,
        isBirdFlying: true,
        birdsRemaining: state.birdsRemaining > 0 ? state.birdsRemaining - 1 : 0, // Decrement bird count
      };
    }

    case AngryBirdsActionType.BIRD_FLYING: {
      // Bird is in motion, update activeBird's state if needed
      // This might be handled by rendering loop observing physics state
      return state;
    }

    case AngryBirdsActionType.BIRD_LANDED: {
      // Bird has stopped moving, reset activeBird and check for game state change
      const landedBird = action.payload.bird;
      // Check if all pigs are gone (level complete) or if no birds left (game over)
      // This check might be better in a main game loop that monitors physics events.
      
      return { ...state, activeBird: null, isBirdFlying: false };
    }

    case AngryBirdsActionType.PIG_DESTROYED: {
      // A pig was destroyed, update pigs remaining and score
      pigsRemaining = state.pigsRemaining > 0 ? state.pigsRemaining - 1 : 0;
      updatedScore = state.score + 100; // Example score for destroying a pig
      
      // Check for level completion
      if (pigsRemaining <= 0) {
          isLevelComplete = true;
      }
      return { ...state, pigsRemaining: pigsRemaining, score: updatedScore, isLevelComplete: isLevelComplete };
    }

    case AngryBirdsActionType.LEVEL_COMPLETE: {
      // Handle level completion, transition to next level or victory screen
      return { ...state, isLevelComplete: true };
    }

    case AngryBirdsActionType.GAME_OVER: {
      // Handle game over condition (e.g., ran out of birds, no pigs left but level not won)
      if (state.engine) Matter.Engine.stop(state.engine); // Stop physics engine
      return { ...state, isGameOver: true, activeBird: null, birdsRemaining: 0 };
    }

    case AngryBirdsActionType.RESET_LEVEL: {
      if (!state.level || !state.engine || !state.world) return state; // Cannot reset if no level or engine/world
      
      // Reset physics world and objects
      Matter.World.clear(state.world, false, true); // Clear all bodies except static ones
      Matter.Engine.run(state.engine); // Re-run engine

      const resetLevelData = resetLevelState(state.level); // Level data itself might not change
      const levelObjects = createLevelObjects(resetLevelData, state.world);
      
      const birds = findObjects(levelObjects, 'bird');
      const pigs = findObjects(levelObjects, 'pig');
      const blocks = findObjects(levelObjects, 'block');
      const slingshot = findObjects(levelObjects, 'slingshot')[0] || null;

      birdsRemaining = resetLevelData.birdsAvailable || birds.length;
      pigsRemaining = resetLevelData.targetPigIds.length > 0 ? resetLevelData.targetPigIds.length : pigs.length;

      return {
          ...state,
          level: resetLevelData,
          birds: birds,
          pigs: pigs,
          blocks: blocks,
          slingshot: slingshot,
          activeBird: null,
          birdsRemaining: birdsRemaining,
          pigsRemaining: pigsRemaining,
          isAiming: false,
          isBirdFlying: false,
          isLevelComplete: false,
          isGameOver: false,
          score: 0, // Reset score too
      };
    }

    default:
      return state;
  }
}

// --- Initialization ---
// Placeholder for level data structure
export const EXAMPLE_LEVEL_1: Level = {
  id: 'level-1',
  name: 'First Flight',
  description: 'A gentle introduction to launching birds.',
  objects: [
    // Example ground (static)
    { id: 'ground', type: 'ground', body: { position: { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT - 25 }, width: WORLD_WIDTH, height: 50, isStatic: true, options: { label: 'ground' } } },
    // Example blocks (dynamic)
    { id: 'block-1', type: 'block', shape: 'rectangle', body: { position: { x: 700, y: WORLD_HEIGHT - 100 }, width: 50, height: 50, options: { restitution: 0.3, friction: 0.1, label: 'block' } }, initialState: { position: { x: 700, y: WORLD_HEIGHT - 100 }, restitution: 0.3, friction: 0.1 }, color: '#a0522d' }, // Brown
    { id: 'block-2', type: 'block', shape: 'rectangle', body: { position: { x: 700, y: WORLD_HEIGHT - 150 }, width: 50, height: 50, options: { restitution: 0.3, friction: 0.1, label: 'block' } }, initialState: { position: { x: 700, y: WORLD_HEIGHT - 150 }, restitution: 0.3, friction: 0.1 }, color: '#a0522d' },
    // Example pig
    { id: 'pig-1', type: 'pig', shape: 'circle', body: { position: { x: 750, y: WORLD_HEIGHT - 125 }, radius: 25, options: { restitution: 0.3, friction: 0.1, label: 'pig' } }, initialState: { position: { x: 750, y: WORLD_HEIGHT - 125 }, radius: 25, restitution: 0.3, friction: 0.1 }, color: '#ffa500' }, // Orange
    // Example bird (initial position for aiming)
    { id: 'bird-1', type: 'bird', shape: 'circle', body: { position: { x: 300, y: WORLD_HEIGHT - 150 }, radius: 20, options: { restitution: 0.5, label: 'bird' } }, initialState: { position: { x: 300, y: WORLD_HEIGHT - 150 }, radius: 20, restitution: 0.5 }, color: '#ff0000' }, // Red
    // Example slingshot base (static sensor)
    { id: 'slingshot-base', type: 'slingshot', body: { position: { x: 300, y: WORLD_HEIGHT - 150 }, width: 10, height: 100, isStatic: true, isSensor: true, options: { label: 'slingshot' } } },
  ],
  targetPigIds: ['pig-1'],
  birdsAvailable: 3,
  camera: { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 },
};

export function getInitialAngryBirdsState(): AngryBirdsState {
  const { engine, world } = createPhysicsEngine();
  const objects = createLevelObjects(EXAMPLE_LEVEL_1, world);
  const birds = findObjects(objects, 'bird');
  const pigs = findObjects(objects, 'pig');
  const blocks = findObjects(objects, 'block');
  const slingshot = findObjects(objects, 'slingshot')[0] || null;

  return {
    engine,
    world,
    level: EXAMPLE_LEVEL_1,
    birds: birds,
    pigs: pigs,
    blocks: blocks,
    slingshot: slingshot,
    activeBird: null,
    birdsRemaining: EXAMPLE_LEVEL_1.birdsAvailable || birds.length,
    pigsRemaining: EXAMPLE_LEVEL_1.targetPigIds.length > 0 ? EXAMPLE_LEVEL_1.targetPigIds.length : pigs.length,
    isAiming: false,
    isBirdFlying: false,
    isLevelComplete: false,
    isGameOver: false,
    score: 0,
  };
}
