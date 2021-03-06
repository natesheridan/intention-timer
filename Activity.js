class Activity {
    constructor(category, description, minutes, seconds) {
      this.category = category;
      this.description = description;
      this.minutes = minutes || 0;
      this.seconds = seconds || 0;
      this.originalTime;
      this.completed = false;
      this.id = `ID${Date.now()}`;
      this.running = false
    }
  
    startTimer() {
      if (!this.running) {
        this.originalTime = `${this.minutes} MIN ${this.seconds} SEC`;
      }
      if (this.running) {
        return;
      }
      this.running = true;
      var seconds = this.seconds;
      var minutes = this.minutes;
      var self = this;
      var interval = setInterval(function() {
        var parsedMinutes = minutes;
        var parsedSeconds = seconds;
        if (parsedMinutes.toString().length < 2) {
          parsedMinutes = `0${parsedMinutes}`
        }
        if (parsedSeconds.toString().length < 2) {
          parsedSeconds = `0${parsedSeconds}`
        }
        var parsedTime = `${parsedMinutes}:${parsedSeconds}`
        countdownText.innerText = (`${parsedTime}`);
        seconds--;
        if (seconds == -1) {
          minutes--;
          seconds = 59;
        if (minutes == -1 && seconds == 59) {
            clearInterval(interval);
            countdownText.innerText = (`Way to Slay!`);
            self.markComplete()
            document.querySelector("#startTimerButton").innerText = 'COMPLETE!'
            return
        }
        }
      }, 1000)
    }
  
    markComplete() {
      this.completed = true;
      document.querySelector('.log-activity-button').classList.remove('hidden')
      document.querySelector('.log-activity-button').addEventListener('click', this.saveToStorage);
    }
  
    saveToStorage() {
      var objectToStore = newCard;
      var stringifiedObject = JSON.stringify(objectToStore);
      localStorage.setItem(`activity-${(localStorage.length+1)}`, stringifiedObject);
      noActivitiesLoggedStatement.classList.add('hidden');
      populatePastActivities();
      document.querySelector('.log-activity-button').classList.add('hidden');
      document.querySelector('#timerView').classList.add('hidden');
      leftSectionHeader.innerText = "Completed Activity";
      document.querySelector('#createNewActivityBtnView').classList.remove('hidden');
    }
  }