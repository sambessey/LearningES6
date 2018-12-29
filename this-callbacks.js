var characters = require ('./characters.js');
var moves = require('./fightmoves.json');
//console.log(moves.fight.punch.verb + ' ' + moves.fight.kick.unlimited);
class Hero {

    constructor(name, level) {
        this.level = level;
        this._name = randomise(name);
        //This is a backing underscore that stops an infinite loop occurring when
        //we try and get hold of the name property.
    }
  set name(newName){
   this._name = name;
  }
  //This setter does not seem to do much?!

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

    constructor(name, level, spell, potency, minSpellThreshold, canUseSpell, hasUsedSpell) {
      super(name, level, spell);

    //  console.log(theSpellStatus);
      this.potency = potency;
      this.spellstatus = "but he can't use it yet.";
      this.canUseSpell = false;
      this.minSpellThreshold = minSpellThreshold;
      this.hasUsedSpell = false;
    //  this.spellstatus=`with a potency of ${this.potency}`;
      //return super.logstuff(" the child class");
    //  return super.logthings(name);
      var testing123 = (potency, threshold) => {
        if(this.potency>this.minSpellThreshold){
          this.spellstatus=`with a power of ${this.potency}`;
          this.canUseSpell = true;
        }
      }
    var theSpellStatus = testing123(this.potency, this.minSpellThreshold);
    }
    static writeBack(){console.log("bleh");}
    //static methods require you to hit the CLASS (MagicalMage) as they are defined at _proto_
}
var canWeFight = (a,b) => {
  if (mainCharacter.level > 0 && theEnemy.level > 0)
  {
    fight (mainCharacter, theEnemy);
  }
}
var somethingelse = err => {console.log("Carrying on"+err);return;}
var randomLevel = (max,min) => {return(Math.round(Math.random() * (max - min) + min))}
var randomise = input => {
  let r = input[Math.floor(Math.random() * input.length)];
  input.splice( input.indexOf(r), 1 );
  return (r);
}
var pickBestMove = c => new Promise((resolve, reject)=> {
  var move = null;
  //console.log(c);
    if (c.hasUsedSpell == false && c.canUseSpell == true)
    {
      c.hasUsedSpell = true;
      move=m.spell;
      resolve (move);
    }
    if (c.level > m.kick.requiresStrength)
    {
      move=m.kick;
    }
    else
    {
      move=m.punch;
    }
    setTimeout(()=>resolve(move),1500);
  });
//}

var fight = (mainCharacter, theEnemy) => {
  if (a == null){
    a = mainCharacter;
    b = theEnemy;
  }
  var m = null;
//  console.log(a);
  pickBestMove(a)
  .then(move => {
    let m=move;
    let movetxt = null;
    if (m.verb == "uses spell: ")
    {
      movetxt = `${m.verb}${a.spell} on`;
    }
    else
    {
      movetxt = m.verb;
    }
    console.log(`${a.name} ${movetxt} ${b.name}`);
    console.log (`${b.name} went from ${b.level} to:`);
    b.level -= Math.random()*m.multiplier;
    if(b.level <=0){console.log("defeated!")} else{console.log (`${b.level}`)};
    [a,b] = [b,a];
    canWeFight(a,b);
  })
}

const promiseBeforeMakingCharacters = () => new Promise((resolve, reject) => {
  let potency = Math.random();
  if (potency>0.2){resolve(potency);}
  throw new Error("Too weak to continue "+potency);
  });

let mainCharacter;
let startingLevelRange = [1,4];
let [name,spell] = characters.attributes();
let theHero = [name, randomLevel(...startingLevelRange), spell];
let ourEnemy = [name, randomLevel(...startingLevelRange), spell];
var m = moves.fight;
var a,b;
promiseBeforeMakingCharacters()

  .then(potency => {
    mainCharacter = new Mage(...theHero);
    theEnemy = new Mage(...ourEnemy);
    if(potency >0.3)
    {
      mainCharacter = new MagicalMage(...theHero,potency,0.3);
      theEnemy = new MagicalMage(...ourEnemy,potency,0.7);
    }
  })
  .then(() => {
  console.log(`our hero is ${mainCharacter.name}. He has a spell of ${mainCharacter.spell} ${mainCharacter.spellstatus}`)
  console.log(`our enemy is ${theEnemy.name}. He has a spell of ${theEnemy.spell} ${theEnemy.spellstatus}`)
  if (mainCharacter.level > 0 && theEnemy.level > 0)
  {
  fight (mainCharacter, theEnemy);
  }
//  MagicalMage.writeBack();
//  mainCharacter.logstuff();
let characters;

})

.catch(err => somethingelse(err))
