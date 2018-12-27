class Hero {

    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
}

class Mage extends Hero {

    constructor(name, level, spell) {
      super(name, level);
      this.spell = spell;
    }
    logstuff(){console.log("hey")}
    //Regular methods are set against the instance of the object (i.e. the hero)
}

class MagicalMage extends Mage {

    constructor(name, level, spell, potency) {
      super(name, level, spell);
      this.potency = potency;
    }
    static writeBack(){console.log("bleh");}
    //static methods require you to hit the CLASS (MagicalMage) as they are defined at _proto_
}

var somethingelse = err => {console.log("Carrying on"+err);return;}
var randomLevel = (max,min) => {return(Math.round(Math.random() * (max - min) + min))}

const promiseBeforeMakingCharacters = () => new Promise((resolve, reject) => {
  let somenumber = Math.random();
  if (somenumber<1){resolve(somenumber);}
  throw new Error("One DOES equal one, dummy!");
  });
//hi

let mainCharacter;
let startingLevelRange = [1,4]
let heroics = ["sammy", randomLevel(...startingLevelRange), "Shrinking people"]
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
})

.catch(err => somethingelse(err))
