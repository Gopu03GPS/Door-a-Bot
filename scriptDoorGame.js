let imageDoor1 = document.getElementById('door1');
let imageDoor2 = document.getElementById('door2');
let imageDoor3 = document.getElementById('door3');
let startButton = document.getElementById('start');

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;

let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isClicked = (door) => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

const isBot = (door) => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door) === true) {
        gameOver('lose');
    }
}

// const randomChoreDoorGenerator = () => {
//   const choreDoor = Math.floor(Math.random() * numClosedDoors);
//   if (choreDoor === 0) {
//     openDoor1 = botDoorPath;
//     openDoor2 = beachDoorPath;
//     openDoor3 = spaceDoorPath;
//   } else if (choreDoor === 1) {
//     openDoor2 = botDoorPath;
//     openDoor1 = beachDoorPath;
//     openDoor3 = spaceDoorPath;
//   } else {
//     openDoor3 = botDoorPath;
//     openDoor1 = beachDoorPath;
//     openDoor2 = spaceDoorPath;
//   }
// }

const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * 6);
    switch (choreDoor) {
        case 0:
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 1:
            openDoor1 = botDoorPath;
            openDoor2 = spaceDoorPath;
            openDoor3 = beachDoorPath;
            break;
        case 2:
            openDoor2 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 3:
            openDoor2 = botDoorPath;
            openDoor1 = spaceDoorPath;
            openDoor3 = beachDoorPath;
            break;
        case 4:
            openDoor3 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            break;
        case 5:
            openDoor3 = botDoorPath;
            openDoor1 = spaceDoorPath;
            openDoor2 = beachDoorPath;
            break;
    }
}

imageDoor1.onclick = () => {
    if (currentlyPlaying && !isClicked(door1)) {
        door1.src = openDoor1;
        playDoor(door1);
    }
}
imageDoor2.onclick = () => {
    if (currentlyPlaying && !isClicked(door2)) {
        door2.src = openDoor2;
        playDoor(door2);
    }
}
imageDoor3.onclick = () => {
    if (currentlyPlaying && !isClicked(door3)) {
        door3.src = openDoor3;
        playDoor(door3);
    }
}

startButton.onclick = () => {
    if (currentlyPlaying === false) {
        startRound();
    }
}

const startRound = () => {
    numClosedDoors = 3;
    imageDoor1.src = closedDoorPath;
    imageDoor2.src = closedDoorPath;
    imageDoor3.src = closedDoorPath;
    startButton.innerHTML = 'Good Luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

const gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = "You Win! Play Again?";
        getYourScore();
    } else {
        startButton.innerHTML = "Game Over! Play Again?";
        score = 0;
        currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
}

const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > highScore) {
        highScore = score;
        bestStreak.innerHTML = highScore;
    }
}

startRound();