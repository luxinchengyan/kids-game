// src/games/hiddenobjects/HiddenObjectsEngine.ts

// --- Interfaces ---
export interface Point { x: number; y: number; }

export interface GameObject {
  id: string;
  type: string; // e.g., 'key', 'book', 'apple'
  name?: string; // User-friendly name for the object
  position: Point; // Top-left corner of the object's bounding box in grid units
  size: { width: number; height: number }; // Size in grid units
  color?: string; // Background color if no image
  imageUrl?: string; // Path to the object's image sprite
  isTarget: boolean; // Whether this object is currently being sought
  isFound: boolean; // Whether the object has been found
  // Could add properties for bounding box definition, rotation, etc.
}

export interface Scene {
  id: string;
  name: string;
  imageUrl: string; // Background image for the scene
  width: number; // Scene width in pixels
  height: number; // Scene height in pixels
  objects: GameObject[]; // Objects within the scene
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface HiddenObjectsState {
  scene: Scene | null;
  sceneObjects: GameObject[]; // All objects in the current scene
  itemsToFind: GameObject[]; // List of objects the player needs to find
  foundObjects: string[]; // IDs of objects that have been found
  selectedObjectId: string | null;
  score: number;
  timer: number; // in seconds
  isGameActive: boolean;
  isPuzzleComplete: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  // Other states like hints available, etc.
}

export enum HiddenObjectsActionType {
  INIT_GAME = 'INIT_GAME',
  TAP_OBJECT = 'TAP_OBJECT',
  UPDATE_TIMER = 'UPDATE_TIMER',
  RESET_GAME = 'RESET_GAME',
  // Add actions for checking completion, hints, etc.
  START_GAME = 'START_GAME',
}

// --- Game Constants ---
// These could be configurable or loaded from settings
const SCENE_WIDTH_PX = 1200; // Example scene dimensions in pixels
const SCENE_HEIGHT_PX = 800;
const GRID_CELL_SIZE_UNITS = 30; // Assume a unit grid for object placement, convert to pixels later

// --- Helper Functions ---

// Placeholder for scene and object data
// In a real game, this would be loaded from assets or a data file.
const SCENES = {
  'forest': {
    name: 'Enchanted Forest',
    imageUrl: '/path/to/forest_scene.jpg',
    width: SCENE_WIDTH_PX,
    height: SCENE_HEIGHT_PX,
    difficulty: 'medium',
    objects: [
      { id: 'obj-1', type: 'key', name: 'Golden Key', position: { x: 5, y: 8 }, size: { width: 1, height: 1 }, color: '#ffd700', isTarget: true, isFound: false },
      { id: 'obj-2', type: 'book', name: 'Ancient Tome', position: { x: 15, y: 12 }, size: { width: 2, height: 2 }, imageUrl: '/path/to/book.png', isTarget: true, isFound: false },
      { id: 'obj-3', type: 'apple', name: 'Red Apple', position: { x: 25, y: 18 }, size: { width: 1, height: 1 }, color: '#ff0000', isTarget: true, isFound: false },
      { id: 'obj-4', type: 'rock', name: 'Smooth Stone', position: { x: 30, y: 15 }, size: { width: 1.5, height: 1.5 }, color: '#808080', isTarget: false, isFound: false },
      { id: 'obj-5', type: 'feather', name: 'Blue Feather', position: { x: 10, y: 15 }, size: { width: 0.8, height: 0.8 }, imageUrl: '/path/to/feather.png', isTarget: true, isFound: false },
    ],
    targetObjectIds: ['obj-1', 'obj-2', 'obj-3', 'obj-5'],
  },
  // Add more scenes for different difficulties/themes
};

// Function to initialize game state for a scene
function initializeScene(sceneId: string, difficulty: 'easy' | 'medium' | 'hard'): Scene {
  const sceneData = SCENES[sceneId] || SCENES['forest']; // Default to forest
  // Adjust object list or difficulty based on difficulty parameter if needed
  return {
    ...sceneData,
    difficulty: difficulty,
    objects: sceneData.objects.map(obj => ({ ...obj, isFound: false })) // Reset found status
  };
}

// --- Reducer function to manage Hidden Objects game state ---
export function hiddenObjectsReducer(state: HiddenObjectsState, action: { type: HiddenObjectsActionType; payload?: any }): HiddenObjectsState {
  switch (action.type) {
    case HiddenObjectsActionType.INIT_GAME: {
      const { scene = 'forest', difficulty = 'medium' } = action.payload;
      const sceneData = initializeScene(scene, difficulty);
      // Filter items to find based on targetObjectIds and initial found status
      const itemsToFind = sceneData.objects.filter(obj => sceneData.targetObjectIds.includes(obj.id));

      return {
        ...state,
        scene: sceneData,
        sceneObjects: sceneData.objects,
        itemsToFind: itemsToFind,
        foundObjects: [],
        selectedObjectId: null,
        score: 0,
        timer: 0,
        isGameActive: false, // Game starts inactive until first interaction
        isPuzzleComplete: false,
      };
    }
    case HiddenObjectsActionType.TAP_OBJECT: {
      const { objectId } = action.payload;
      if (!state.scene || state.isPuzzleComplete || state.isGameActive === false) return state; // Do nothing if game not active or complete

      const objectIndex = state.sceneObjects.findIndex(obj => obj.id === objectId);
      if (objectIndex === -1) return state;

      const tappedObject = state.sceneObjects[objectIndex];
      
      // If it's a target object and not found, mark as found
      if (tappedObject.isTarget && !tappedObject.isFound) {
        const newSceneObjects = state.sceneObjects.map((obj, index) =>
          index === objectIndex ? { ...obj, isFound: true } : obj
        );
        const newFoundObjects = [...state.foundObjects, objectId];
        const itemsRemaining = newFoundObjects.length;
        const isPuzzleComplete = itemsRemaining === state.scene.targetObjectIds.length;

        return {
          ...state,
          sceneObjects: newSceneObjects,
          foundObjects: newFoundObjects,
          score: state.score + 100, // Add score for finding an item
          isPuzzleComplete: isPuzzleComplete,
        };
      }
      // If it's not a target object or already found, do nothing or provide feedback
      return state;
    }
    case HiddenObjectsActionType.START_GAME: {
        // Activate game, start timer, etc. on first valid interaction
        return { ...state, isGameActive: true };
    }
    case HiddenObjectsActionType.UPDATE_TIMER: {
      // Timer tick
      return { ...state, timer: action.payload };
    }
    case HiddenObjectsActionType.RESET_GAME: {
      // Reset game state, potentially with new difficulty or scene
      const sceneId = state.scene?.id || 'forest';
      const difficulty = state.difficulty || 'medium';
      const resetSceneData = initializeScene(sceneId, difficulty);
      return {
        ...initialHiddenObjectsState, // Reset to initial structure
        scene: resetSceneData,
        sceneObjects: resetSceneData.objects,
        itemsToFind: resetSceneData.objects.filter(obj => resetSceneData.targetObjectIds.includes(obj.id)),
        difficulty: difficulty,
        sceneWidth: resetSceneData.width,
        sceneHeight: resetSceneData.height,
      };
    }
    default:
      return state;
  }
}

// --- Initialization ---
export function getInitialHiddenObjectsState(): HiddenObjectsState {
  const scene = initializeScene('forest', 'medium');
  const itemsToFind = scene.objects.filter(obj => scene.targetObjectIds.includes(obj.id));

  return {
    scene: scene,
    sceneObjects: scene.objects,
    itemsToFind: itemsToFind,
    foundObjects: [],
    selectedObjectId: null,
    score: 0,
    timer: 0,
    isGameActive: false,
    isPuzzleComplete: false,
    difficulty: 'medium',
    sceneWidth: scene.width,
    sceneHeight: scene.height,
  };
}
