var yay = a => {
  let message = `All Good! saw ${a}`;
  console.log (message);
  //delay(1500);
}

const delay = (ms) => new Promise((resolve, reject) =>
(setTimeout(resolve, ms),console.log("WAITED "+ms))
);

const myPromise = () => new Promise((resolve, reject) => {
  let random = Math.random()*100;
  if (random < 1)
  {
    console.log ("less than 1");
    //If we go in here this just logs - number will never be less than 1
  }
  else {resolve(random);}
  //If we go into else, we hit resolve in our promise. The state is set.
  //reject (new Error ('Reject... It seems the number was too small - Saw '+random));
  throw new Error('Throw.... Promise was rejected, error thrown '+random);

  //If we don't go into else, we hit reject.
});

console.log("firstline");

delay(Math.random()*10000)
.then(() => {
  yay("we managed to connect"), (error) => console.log("ahye")
  //return delay(2000)
})
  .then(() => {
   myPromise().then((resolvedValue) => {yay(resolvedValue);}, (error) => console.log("Something went wrong "+error.message))
   myPromise().catch((error) => console.log("IN CATCH "+error.message));
   //In the above code we are passing the error to catch in the instance that the promise is rejected. This is the proper way of handling errors
   //If you have a .catch a level below the .then, then the .catch catches errors of executor function and the errors of .then handler too.
   //It makes sense because .then always returns a promise.
})
