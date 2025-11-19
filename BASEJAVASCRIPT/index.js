/* ---------------------------
   Story Adventure — main JS
   Features:
   - Player name input
   - JSON story engine (id, text, choices[])
   - renderScene(sceneId), typeWriterEffect(text), showChoices()
   - audio support (optional)
   - restart and share scene
---------------------------- */

const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const demoBtn = document.getElementById('demoBtn');

const playerNameTag = document.getElementById('playerName');
const storyText = document.getElementById('storyText');
const choicesWrap = document.getElementById('choices');
const restartBtn = document.getElementById('restartBtn');
const restartTop = document.getElementById('restartTop');
const endActions = document.getElementById('endActions');
const shareBtn = document.getElementById('shareBtn');

const bgAudio = document.getElementById('bgAudio');
const clickAudio = document.getElementById('clickAudio');
const winAudio = document.getElementById('winAudio');

let playerName = '';
let currentScene = 'intro';
let typingTimer = null;

/* ---------------------------
   Story data: 14 scenes + endings
   Each scene: id, text (may include {name}), choices: [{text, next}]
---------------------------- */
const story = {
  "intro": {
    id: "intro",
    text: "You wake up on the cold floor of your school's old auditorium. The exit is locked. The lights breathe with an eerie glow. Your phone has no signal.\n\nWhat will you do?",
    choices: [
      { text: "Walk toward the classrooms", next: "classroom" },
      { text: "Head to the principal's office", next: "office" },
      { text: "Search the stage area", next: "stage" }
    ]
  },

  "classroom": {
    id: "classroom",
    text: "The classroom door creaks open. Desks are overturned and a message is scrawled on the blackboard: 'Find the key or stay forever.'\nYou hear a soft tapping from beneath the last bench.",
    choices: [
      { text: "Check under the bench", next: "keyFound" },
      { text: "Open the teacher's cupboard", next: "cupboard" },
      { text: "Return to auditorium", next: "intro" }
    ]
  },

  "office": {
    id: "office",
    text: "The principal's office is locked, but a light flickers inside. A shadow crosses behind the curtains.\nYou notice a cracked window at the side.",
    choices: [
      { text: "Knock loudly", next: "knock" },
      { text: "Peep through the window", next: "peep" },
      { text: "Break the lock", next: "forceLock" }
    ]
  },

  "stage": {
    id: "stage",
    text: "On the stage there is an old projector and a map pinned to the wall. A drawer is half-open with a torn piece of a map inside.",
    choices: [
      { text: "Take the map piece", next: "mapPiece" },
      { text: "Turn on the projector", next: "projector" },
      { text: "Search behind the curtains", next: "curtains" }
    ]
  },

  "keyFound": {
    id: "keyFound",
    text: "You reach under the bench and your fingers close around something cold — a small rusty key! It could open the exit… or maybe the trophy cabinet.",
    choices: [
      { text: "Try the key on the exit", next: "tryExit" },
      { text: "Check the trophy cabinet", next: "trophy" },
      { text: "Keep exploring", next: "stage" }
    ]
  },

  "cupboard": {
    id: "cupboard",
    text: "The cupboard is filled with old trophies and a locked box. Inside the box is a diary with scribbles about 'hidden rooms' and 'clock tower'.",
    choices: [
      { text: "Read more diary", next: "diary" },
      { text: "Leave quietly", next: "classroom" }
    ]
  },

  "knock": {
    id: "knock",
    text: "You knock. The footsteps stop. A scratchy voice asks 'Who's there?'\nYou can answer truthfully or lie.",
    choices: [
      { text: "Say your name", next: "honestAnswer" },
      { text: "Stay silent", next: "silent" },
      { text: "Run away", next: "intro" }
    ]
  },

  "peep": {
    id: "peep",
    text: "Through the cracked glass you see a silhouette hunched over maps. They look up and the silhouette freezes, then turns away. There's a small key on the desk.",
    choices: [
      { text: "Sneak in and grab the key", next: "sneakKey" },
      { text: "Call out to them", next: "callOut" }
    ]
  },

  "forceLock": {
    id: "forceLock",
    text: "You force the lock open but the noise triggers an alarm. A mechanical click echoes — the school slowly seals some doors. You are now on a timer.",
    choices: [
      { text: "Run to classroom", next: "classroom" },
      { text: "Hide in office", next: "hideOffice" }
    ]
  },

  "mapPiece": {
    id: "mapPiece",
    text: "The torn map piece shows a path to the clock tower and a red X near the sports room. A note reads: 'When the bell rings, the path opens.'",
    choices: [
      { text: "Head to the clock tower", next: "tower" },
      { text: "Go to the sports room", next: "sports" },
      { text: "Keep exploring stage", next: "stage" }
    ]
  },

  "projector": {
    id: "projector",
    text: "The projector flickers to life showing old footage of students playing — then a frame freezes and reveals a hidden code: 7-3-1.",
    choices: [
      { text: "Note the code and continue", next: "codeNoted" },
      { text: "Ignore and move on", next: "stage" }
    ]
  },

  "curtains": {
    id: "curtains",
    text: "Behind the curtains you find a small door leading to backstage corridors. A breeze blows from deeper inside.",
    choices: [
      { text: "Enter the corridor", next: "corridor" },
      { text: "Return to auditorium", next: "intro" }
    ]
  },

  "tryExit": {
    id: "tryExit",
    text: "You reach the main exit and try the rusty key. It turns... but the lock snaps and the handle breaks. The exit remains closed. A voice whispers: 'You almost had it.'",
    choices: [
      { text: "Smash the door", next: "smashDoor" },
      { text: "Search for another way", next: "corridor" }
    ]
  },

  "trophy": {
    id: "trophy",
    text: "The trophy cabinet contains a small golden whistle and a folded note: 'Blow to call help — but only when brave.'",
    choices: [
      { text: "Keep the whistle", next: "whistleTaken" },
      { text: "Blow it now", next: "blowNow" }
    ]
  },

  "diary": {
    id: "diary",
    text: "The diary mentions the 'safe room' in the clock tower and a riddle: 'When three become one, the way will open.'",
    choices: [
      { text: "Go to clock tower", next: "tower" },
      { text: "Search auditorium", next: "intro" }
    ]
  },

  "honestAnswer": {
    id: "honestAnswer",
    text: "You say your name. The voice replies softly: 'You must prove your courage.' The door opens a crack revealing a corridor.",
    choices: [
      { text: "Step inside", next: "corridor" },
      { text: "Refuse and run", next: "intro" }
    ]
  },

  "silent": {
    id: "silent",
    text: "Silence. The footsteps fade. The window slides open and a hand drops a small key with a tag: 'For those who listen.'",
    choices: [
      { text: "Pick the key", next: "sneakKey" },
      { text: "Throw it away", next: "intro" }
    ]
  },

  "sneakKey": {
    id: "sneakKey",
    text: "You sneak in and grab the key. It is ornate with three notches. A timer in your head ticks — something will happen when bells chime.",
    choices: [
      { text: "Open office door", next: "officeOpen" },
      { text: "Head to tower", next: "tower" }
    ]
  },

  "callOut": {
    id: "callOut",
    text: "You call out. The figure turns — it is an old janitor who smiles sadly. 'Some doors open only with courage,' he says, handing you a small token.",
    choices: [
      { text: "Ask about token", next: "askToken" },
      { text: "Thank and leave", next: "intro" }
    ]
  },

  "hideOffice": {
    id: "hideOffice",
    text: "You hide in a closet. Dust covers you as footsteps approach... A loud bell rings and something shifts in the building's bones.",
    choices: [
      { text: "Wait until calm", next: "calmWait" },
      { text: "Run into corridor", next: "corridor" }
    ]
  },

  "tower": {
    id: "tower",
    text: "Up in the clock tower, cogs creak. A locked chest sits between the gears. Carved on it: 'Three-notched key required.'",
    choices: [
      { text: "Use the 3-notched key", next: "goodEnding" },
      { text: "Search for another entrance", next: "mysteryPath" }
    ]
  },

  "sports": {
    id: "sports",
    text: "In the sports room you find a rope, a locker with code 731, and a broken window leading outside to the empty field.",
    choices: [
      { text: "Open locker (731)", next: "lockerOpen" },
      { text: "Climb out the broken window", next: "badEscape" }
    ]
  },

  "codeNoted": {
    id: "codeNoted",
    text: "You remember the code 7-3-1 from the projector. It may match a locker or box somewhere.",
    choices: [
      { text: "Look for a locker", next: "sports" },
      { text: "Go to the clock tower", next: "tower" }
    ]
  },

  "corridor": {
    id: "corridor",
    text: "The corridor is a maze of doors. One door has a bell icon, another has a sun sketch. Which will you try?",
    choices: [
      { text: "Bell door", next: "bellDoor" },
      { text: "Sun door", next: "sunDoor" }
    ]
  },

  "smashDoor": {
    id: "smashDoor",
    text: "You smash the door but the metal holds. The force triggers a trap and the room locks behind you. The lights go out. You are trapped.",
    choices: [
      { text: "Shout for help", next: "badEnding" },
      { text: "Search for vent", next: "ventEscape" }
    ]
  },

  "whistleTaken": {
    id: "whistleTaken",
    text: "You keep the whistle. It hums faintly in your hand — as if waiting.",
    choices: [
      { text: "Keep exploring", next: "stage" },
      { text: "Blow the whistle later", next: "saveForLater" }
    ]
  },

  "blowNow": {
    id: "blowNow",
    text: "You blow the whistle. A faraway bell rings and lights flash. The sound attracts something — a shadow moves closer.",
    choices: [
      { text: "Face the shadow", next: "heroEnding" },
      { text: "Run and hide", next: "badEnding" }
    ]
  },

  "askToken": {
    id: "askToken",
    text: "The janitor explains: 'This token opens only if three clues meet.' He points to the tower, the locker and the whistle.",
    choices: [
      { text: "Follow his hint to the locker", next: "sports" },
      { text: "Head to the tower", next: "tower" }
    ]
  },

  "calmWait": {
    id: "calmWait",
    text: "You wait. The alarms stop. A school bell rings. Something unlocks in the distance.",
    choices: [
      { text: "Go toward the sound", next: "tower" },
      { text: "Check the auditorium", next: "stage" }
    ]
  },

  "lockerOpen": {
    id: "lockerOpen",
    text: "You enter 731. Inside, there's a small ornate key with three notches — perfect for the chest in the tower.",
    choices: [
      { text: "Take key to tower", next: "tower" },
      { text: "Use rope to escape through window", next: "badEscape" }
    ]
  },

  "badEscape": {
    id: "badEscape",
    text: "You try to escape via the field but trip in the dark and injure yourself. While you try to crawl, shadows surround you. This is not the end you wanted.",
    choices: [
      { text: "Game Over", next: "badEnding" }
    ]
  },

  "ventEscape": {
    id: "ventEscape",
    text: "You pry open a vent and crawl through dusty ducts. They lead you to a maintenance hatch behind the main gates. You're close.",
    choices: [
      { text: "Open hatch and escape (possible success)", next: "goodEnding" },
      { text: "Go back to search for clues", next: "stage" }
    ]
  },

  "mysteryPath": {
    id: "mysteryPath",
    text: "You find a secret corridor and a room filled with old yearbooks and a locked letter marked 'To the brave'. You feel history watching.",
    choices: [
      { text: "Open the letter", next: "mysteryEnding" },
      { text: "Leave it closed", next: "tower" }
    ]
  },

  /* Endings */
  "goodEnding": {
    id: "goodEnding",
    text: "With the three-notched key the chest opens, revealing a mechanism. You set it, the clock tower bell rings and the main gate opens. Daylight floods in. You escaped!",
    choices: [
      { text: "Celebrate", next: "END" }
    ]
  },

  "heroEnding": {
    id: "heroEnding",
    text: "You face the shadow and blow the whistle. The shadow dissolves into a grateful memory. A trapped student appears and thanks you. Together you open the door and walk into daylight — a hero's ending.",
    choices: [
      { text: "End", next: "END" }
    ]
  },

  "mysteryEnding": {
    id: "mysteryEnding",
    text: "The letter contains a map to hidden school secrets and a promise: 'There is more — to be continued.' The mystery remains but you live to tell it. It's a curious ending.",
    choices: [
      { text: "End", next: "END" }
    ]
  },

  "badEnding": {
    id: "badEnding",
    text: "The darkness closes in. Your choices led to a trap and the doors locked. The lights go out. This is the bad ending.",
    choices: [
      { text: "End", next: "END" }
    ]
  },

  "END": {
    id:"END",
    text: "Thank you for playing. You can restart to explore other paths and discover all endings!",
    choices: [
      { text: "Restart", next: "restart" }
    ]
  }
};

/* ---------------------------
   Utility: play audio safely
---------------------------- */
function safePlay(audioEl) {
  if (!audioEl) return;
  try {
    // only play if file exists and browser allows
    audioEl.currentTime = 0;
    audioEl.play().catch(()=>{ /* ignore autoplay block */ });
  } catch(e){}
}
function safePause(audioEl){
  try{ audioEl && audioEl.pause(); }catch(e){}
}

/* ---------------------------
   Core functions
---------------------------- */

function startGame() {
  playerName = nameInput.value.trim() || 'Player';
  playerNameTag.textContent = `${playerName}`;
  startScreen.classList.remove('active');
  gameScreen.classList.add('active');
  // start background music if available
  safePlay(bgAudio);
  // check share param (optional)
  const urlParams = new URLSearchParams(window.location.search);
  const sceneParam = urlParams.get('scene');
  if (sceneParam && story[sceneParam]) {
    currentScene = sceneParam;
  } else {
    currentScene = 'intro';
  }
  renderScene(currentScene);
}

function demoStart() {
  nameInput.value = 'Alex';
  startGame();
  // start at a middle scene for demo:
  renderScene('stage');
}

startBtn.addEventListener('click', () => {
  safePlay(clickAudio);
  startGame();
});

demoBtn.addEventListener('click', () => {
  safePlay(clickAudio);
  demoStart();
});

restartTop.addEventListener('click', () => {
  safePlay(clickAudio);
  restartGame();
});

restartBtn.addEventListener('click', () => {
  safePlay(clickAudio);
  restartGame();
});

shareBtn.addEventListener('click', () => {
  const url = new URL(window.location.href);
  url.searchParams.set('scene', currentScene);
  navigator.clipboard?.writeText(url.toString()).then(()=>{
    alert('Scene link copied! Share to let others start here.');
  }).catch(()=>alert('Copy failed. URL: ' + url.toString()));
});

/* renderScene: show story text and choices for a given sceneId */
function renderScene(sceneId) {
  if (!story[sceneId]) {
    storyText.innerText = "Scene not found.";
    return;
  }
  currentScene = sceneId;
  // clear existing choices
  choicesWrap.innerHTML = '';
  endActions.classList.add('hidden');

  // prepare text with name replacement
  let txt = story[sceneId].text.replace(/\{name\}/g, playerName);

  // typewriter effect then show choices
  typeWriterEffect(txt, () => {
    // after typing done show choices
    showChoices(story[sceneId].choices || []);
    // if this is an ending, play proper sound and reveal restart
    if (["goodEnding","heroEnding"].includes(sceneId)) {
      safePlay(winAudio);
      endActions.classList.remove('hidden');
    } else if (["badEnding","mysteryEnding"].includes(sceneId)) {
      endActions.classList.remove('hidden');
    } else if (sceneId === 'END') {
      endActions.classList.remove('hidden');
    }
  });

  // small background music cue for tense scenes (optional)
  if (["forceLock","smashDoor","badEscape"].includes(sceneId)) {
    // reduce bg volume subtly (if audio available)
    try { if (bgAudio) bgAudio.volume = 0.25; } catch(e){}
  } else {
    try { if (bgAudio) bgAudio.volume = 0.45; } catch(e){}
  }
}

/* showChoices: creates buttons for each choice */
function showChoices(choices = []) {
  choicesWrap.innerHTML = '';
  if (!choices || choices.length === 0) {
    // no choices — show restart
    const endBtn = document.createElement('button');
    endBtn.className = 'btn';
    endBtn.textContent = 'Restart';
    endBtn.onclick = () => restartGame();
    choicesWrap.appendChild(endBtn);
    return;
  }

  choices.forEach(choice => {
    const b = document.createElement('button');
    b.className = 'choice-btn';
    b.textContent = choice.text;
    b.onclick = () => {
      safePlay(clickAudio);
      // small fade
      storyText.style.opacity = 0;
      setTimeout(()=> {
        if (choice.next === 'restart') {
          restartGame();
        } else {
          renderScene(choice.next);
        }
      }, 180);
    };
    choicesWrap.appendChild(b);
  });
}

/* Typing effect: types text into storyText, calls cb when complete */
function typeWriterEffect(fullText, cb) {
  clearTimeout(typingTimer);
  storyText.style.opacity = 0;
  storyText.textContent = '';

  // quick show of text container
  setTimeout(()=> storyText.style.opacity = 1, 40);

  let i = 0;
  const speed = 18; // ms per char (faster/slower)
  function step() {
    if (i <= fullText.length) {
      // show substring
      storyText.textContent = fullText.slice(0, i);
      i++;
      typingTimer = setTimeout(step, speed);
    } else {
      if (typeof cb === 'function') cb();
    }
  }
  step();
}

/* restart game -> show start screen */
function restartGame() {
  safePause(bgAudio);
  safePause(winAudio);
  // show start screen
  gameScreen.classList.remove('active');
  startScreen.classList.add('active');
  nameInput.value = '';
  storyText.textContent = '';
  choicesWrap.innerHTML = '';
  endActions.classList.add('hidden');
  currentScene = 'intro';
}

/* Optional: autoplay background music on user gesture */
document.addEventListener('click', function once() {
  // Resume any suspended audio after user's first interaction
  try { if (bgAudio) bgAudio.play().catch(()=>{}); } catch(e){}
  document.removeEventListener('click', once);
});

/* If user uses share link with scene param before start, we will load that scene after name input.
   This is handled in startGame reading URL params. */

// For quick debug: allow starting with name in URL ?name=YourName
(function prefillNameFromURL(){
  const params = new URLSearchParams(window.location.search);
  const n = params.get('name');
  if(n) nameInput.value = decodeURIComponent(n);
})();
