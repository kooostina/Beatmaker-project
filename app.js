class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hiHatAudio = document.querySelector('.hihat-sound');
    this.playBtn = document.querySelector('.play');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
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
    if (this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }

}



const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
  pad.addEventListener('click', drumKit.activePad); //toggle the active class of the pads when you click on them
  pad.addEventListener('animationend', function () {
    this.style.animation = "";
  })
})

drumKit.playBtn.addEventListener('click', () => {
  drumKit.start(); //when we clck the play button the start method runs
})