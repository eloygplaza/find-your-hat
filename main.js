const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
  }

  // Returns the field
  field() {
    return this.field;
  }

  // Returns the position of our last movement in X and Y axis
  getPosition() {
    let chr, position;
    
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        chr = this.field[i][j];
        if(chr === pathCharacter) {
          position = [i, j];
        }
      }
    }
    return position;
  }

  // We pass a direction (u, d, l, r) and updates our field
  updateField(dir) {
    let newY, newX;
    let position = this.getPosition();

    switch(dir) {
      case 'u':
        newY = position[0]-1;
        console.log(newY);
        if(this.field[newY][position[1]] != null) {
          if(this.field[newY][position[1]] === hole) {
            console.log("You fall into a hole!");
            return true;
          } else if(this.field[newY][position[1]] === hat) {
              console.log("You found your hat, congratulations!");
              return true;
          } else if(this.field[newY][position[1]] === fieldCharacter) {
              this.field[newY][position[1]] = pathCharacter;
          }
        } else {
          console.log("You exit the field!");
        }
        break;
      case 'd':
        newY = position[0]+1;
        if(this.field[newY][position[1]] != null) {
          if(this.field[newY][position[1]] === hole) {
            console.log("You fall into a hole!");
            return true;
          } else if(this.field[newY][position[1]] === hat) {
              console.log("You found your hat, congratulations!");
              return true;
          } else if(this.field[newY][position[1]] === fieldCharacter) {
              //console.log("siga su camino!");
              this.field[newY][position[1]] = pathCharacter;
          }
        } else {
          console.log("You exit the field!");
        }
        break;
      case 'l':
        newX = position[1]-1;
        if(this.field[position[0]][newX] != null) {
          //console.log("No es null, miramos que caracter es");
          //console.log(this.field[position[0]][newX]);
          if(this.field[position[0]][newX] === hole) {
            console.log("You fall into a hole!");
            return true;
          } else if(this.field[position[0]][newX] === hat) {
              console.log("You found your hat, congratulations!");
              return true;
          } else if(this.field[position[0]][newX] === fieldCharacter) {
              //console.log("siga su camino!");
              this.field[position[0]][newX] = pathCharacter;
          }
        } else {
          console.log("You exit the field!");
        }
        break;
      case 'r':
        newX = position[1]+1;
        if(this.field[position[0]][newX] != null) {
          if(this.field[position[0]][newX] === hole) {
            console.log("You fall into a hole!");
            return true;
          } else if(this.field[position[0]][newX] === hat) {
              console.log("You found your hat, congratulations!");
              return true;
          } else if(this.field[position[0]][newX] === fieldCharacter) {
              this.field[position[0]][newX] = pathCharacter;
          }
        } else {
          console.log("You exit the field!");
        }
        break;
    }
  }

  // Prints field
  print() {
    let finalText = ''; 
    
    // We iterate very array and join them
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        finalText += this.field[i][j];
      }
      finalText += '\n';
    }
    // Returns the field
    return finalText;
  }

  playGame() {
    // We inicialitze variables
    let lose, win;
    let end = false;

    console.log('\n- Want to play a game?!');
    console.log("- Your goal it's to find your hat wich it's the character ^");
    console.log('- You can move freely through the field with the keys u: up, d: down, l: left, r: right');
    console.log('- Here you have the field on which you position is indicated with * character');
    do {
      // We print the field
      console.log(this.print());
      // We ask next movement
      let position = prompt("In which direction you want to go? ");
      if (position !== null) {
        switch(position){
          case 'u':
            end = this.updateField('u');
            break;
          case 'd':
            end = this.updateField('d');
            break;
          case 'l':
            end = this.updateField('l');
            break;
          case 'r':
            end = this.updateField('r');
            break;
          default:
            console.log("Sorry, i doesn't understand you"); 
        }
      }
    } while (!end);
  }
}

// Inicialitze our array
const myField = new Field([
  ['*', '░', 'O', '░', 'O', '░', 'O', '░', 'O', '░'],
  ['O', '░', '░', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
  ['░', '░', '░', '░', '░', '░', '░', '░', '^', '░'],
]);

// Start the game
myField.playGame();
