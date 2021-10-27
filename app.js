class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hiHatAudio = document.querySelector('.hihat-sound');
    this.playBtn = document.querySelector('.play');
    this.muteBtns = document.querySelectorAll('.mute');
    this.currentKick = './sounds/kick-classic.wav';
    this.currentSnare = './sounds/snare-acoustic01.wav';
    this.currentHihat = './sounds/hihat-acoustic01.wav';
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
    this.tempoSlider = document.querySelector('.tempo-slider');
  }

  activePad() {
    this.classList.toggle('active');
  }

  repeat() {
    let step = this.index % 8; //looping over the pads and when we get to 8 it will be reset to 0
    this.index++; //increase the step
    // console.log(step); 
    const activeBars = document.querySelectorAll(`.b${step}`); //it returns those 3 active bars and it loops over
    activeBars.forEach(bar => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // check if the bars have an active bar among them
      if (bar.classList.contains('active')) {
        // check which pad exactly is active and play the corresponding audio
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hiHatAudio.currentTime = 0;
          this.hiHatAudio.play();
        }
      }
    })
    // console.log(activeBars);
  }

  start() { //envoke repeat method every 1000 ms
    const interval = (60 / this.bpm) * 1000;

    // check if it's playing
    if (this.isPlaying) { // clear interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }

  changeSound(e) {
    // console.log(e);
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hiHatAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    // console.log(e.target);
    const muteIndex = e.target.getAttribute('data-track'); //get the attribute of a specific mute button
    e.target.classList.toggle('active'); //add a class to it when it's muted
    if (e.target.classList.contains('active')) {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 0;
          break;
        case '1':
          this.snareAudio.volume = 0;
          break;
        case '2':
          this.hiHatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 1;
          break;
        case '1':
          this.snareAudio.volume = 1;
          break;
        case '2':
          this.hiHatAudio.volume = 1;
          break;
      }
    }
  }

  changeTempoText(e) {
    const tempoText = document.querySelector('.tempo-nr'); //get the span with the tempo number
    this.bpm = e.target.value; //update the beats per minute
    tempoText.innerText = e.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains('active')) {
      drumKit.start();
    }
  }
}


const drumKit = new DrumKit();


// Event Listeners 
drumKit.selects.forEach(select => {
  select.addEventListener('change', function (e) {
    drumKit.changeSound(e);
  })
})

drumKit.muteBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    drumKit.mute(e);
  })
})

drumKit.pads.forEach(pad => {
  pad.addEventListener('click', drumKit.activePad); //toggle the active class of the pads when you click on them
  pad.addEventListener('animationend', function () {
    this.style.animation = "";
  })
})

drumKit.playBtn.addEventListener('click', () => {
  drumKit.updateBtn();
  drumKit.start(); //when we clck the play button the start method runs
})

drumKit.tempoSlider.addEventListener('input', function (e) {
  drumKit.changeTempoText(e);
})

drumKit.tempoSlider.addEventListener('change', function () {
  drumKit.updateTempo();
})