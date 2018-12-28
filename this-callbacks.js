var characters = require ('./characters.js');
class Hero {

    constructor(name, level) {
        this.level = level;
        this._name = randomise(name);
        //This is a backing underscore that stops an infinite loop occurring when
        //we try and get hold of the name property.
    }

  set name(newName){
   this._name = name;
   console.log("HEY!!!!!!!");
  }

 get name() {
   return this._name.toUpperCase();
  }
  logthings(name){
  console.log("NAMES ARE!!! "+name);
  }
}

class Mage extends Hero {

    constructor(name, level, spell) {
      super(name, level);
      this.spell = randomise(spell);;

    }

    logstuff(stuff){console.log("accessed"+stuff)}
    //Regular methods are set against the instance of the object (i.e. the hero)
}

class MagicalMage extends Mage {

    constructor(name, level, spell, potency) {
      super(name, level, spell);
      this.potency = potency;
      //return super.logstuff(" the child class");
      return super.logthings(name);
    }
    static writeBack(){console.log("bleh");}
    //static methods require you to hit the CLASS (MagicalMage) as they are defined at _proto_
}

var somethingelse = err => {console.log("Carrying on"+err);return;}
var randomLevel = (max,min) => {return(Math.round(Math.random() * (max - min) + min))}
var randomise = input => {return(input[Math.floor(Math.random() * input.length)])}

const promiseBeforeMakingCharacters = () => new Promise((resolve, reject) => {
  let somenumber = Math.random();
  if (somenumber<1){resolve(somenumber);}
  throw new Error("One DOES equal one, dummy!");
  });

let mainCharacter;
let startingLevelRange = [1,4];
let [name,spell] = characters.attributes();
let heroics = [name, randomLevel(...startingLevelRange), spell]
let spellstatus = "but he can't use it yet.";

promiseBeforeMakingCharacters()

  .then(somenumber => {
    mainCharacter = new Mage(...heroics);
    if(somenumber >0.1)
    {
      console.log(mainCharacter);
      mainCharacter = new MagicalMage(...heroics,somenumber);
      console.log(mainCharacter);
      spellstatus = `with a potency of ${mainCharacter.potency}`;
    }
  })
  .then(() => {
  console.log(`our hero is ${mainCharacter.name}. He has a spell of ${mainCharacter.spell} ${spellstatus}`)
//  MagicalMage.writeBack();
//  mainCharacter.logstuff();
let characters;

})

.catch(err => somethingelse(err))
