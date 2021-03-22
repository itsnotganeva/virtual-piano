// general elements
const pianoButtons = document.querySelectorAll(".piano-key");
const pianoContainer = document.getElementById("piano");
const lettersButton = document.getElementById("letters-button");
const notesButton = document.getElementById("notes-button");

// general functions for togglers 
function onSelectNotes() {
  pianoButtons.forEach((pianoButton) => {
    pianoButton.classList.remove("piano-key-letter");
    pianoButton.classList.add("piano-key-note");
  });

  lettersButton.classList.remove("btn-active");
  notesButton.classList.add("btn-active");
}

function onSelectLetters() {
  pianoButtons.forEach((pianoButton) => {
    pianoButton.classList.remove("piano-key-note");
    pianoButton.classList.add("piano-key-letter");
  });

  notesButton.classList.remove("btn-active");
  lettersButton.classList.add("btn-active");
}

function fullscreenToggler() {
  const isEnabledFullscreen = document.fullscreenElement;
  const element = document.documentElement;

  if (isEnabledFullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE11
      document.msExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      // Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  }
}

// function for reproduce audio
function playAudio(audio, pianoButton) {
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  pianoButton.classList.add("piano-key-active");
  pianoButton.classList.add("piano-key-active-pseudo");
}

// general functions for keyboard events
function onKeyDown(event) {
  if (!event.repeat) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`); //звук
    const pianoButton = document.querySelector(`.piano-key[data-key="${event.keyCode}"]`);

    playAudio(audio, pianoButton);
  }
}

function onKeyUp(event) {
  const pianoContainer = document.querySelector(
    `.piano-key[data-key="${event.keyCode}"]`
  );

  pianoContainer.classList.remove("piano-key-active");
}

// general functions for mouse events
function onMouseDown(event) {
  const pianoButton = event.target;
  const audio = document.getElementById(pianoButton.dataset.letter);

  playAudio(audio, pianoButton);
}

const onMouseUp = (event) => {
  event.target.classList.remove("piano-key-active");
  event.target.classList.remove("piano-key-active-pseudo");
};

const startCorrespondOver = (event) => {
  onMouseDown(event);

  pianoButtons.forEach((elem) => {
    elem.addEventListener("mouseenter", onMouseDown);
    elem.addEventListener("mouseleave", onMouseUp);
  });
};

const stopCorrespondOver = (event) => {
  onMouseUp(event);

  pianoButtons.forEach((elem) => {
    elem.removeEventListener("mouseenter", onMouseDown);
    elem.removeEventListener("mouseleave", onMouseUp);
  });
};

// general event listeners
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
pianoContainer.addEventListener("mousedown", startCorrespondOver);
pianoContainer.addEventListener("mouseup", stopCorrespondOver);
