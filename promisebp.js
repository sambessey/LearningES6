const promiseThatResolves = b => new Promise((resolve, reject) => {
  console.log(b);
  var a = Math.random();
  if (a<0.5)
  {
    setTimeout(()=>resolve(a), 3000);
  }
  else {
    throw new Error;
  }
  //return promise;
});

// Leads to UnhandledPromiseRejection
//promiseThatResolves().then(
//  () => { throw new Error },
//  (err) => console.log(err),
//);
//Problem here is that the executor founction above has a 100% chance of throwing
// an error but the executor block itself cannot handle the error. It needs a .catch.
//The block above CAN catch the error on the callback from the promise in promiseThatResolves though.

// Proper error handling
promiseThatResolves("Sam")
  .then(a => {
    console.log("Resolved!"+a)
    //throw new Error();
  })

//  then(function(result) {
    // you can access the result from the promise here
//});
  .catch(err => console.log("FAIL"+err));

//So here we have a call to a promise that will ALWAYS fail at the executor
//because the only condition specificed is to throw an error
//the catch block catches ANY error seen above  - hence catch(err) - which ALWAYS happens.
