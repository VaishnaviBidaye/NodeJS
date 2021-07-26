const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent'); // fetch api

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find file!');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file!');
      resolve('Success!');
    });
  });
};

// Async- await promise function
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // remove await of each function and below write an array
    const result1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const result2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const result3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([
      result1Promise,
      result2Promise,
      result3Promise,
    ]);
    const images = all.map((el) => el.body.message);
    console.log(images);

    await writeFilePromise('dog-img.txt', images.join('\n'));
    console.log('Random dog image saves to file!');
  } catch (err) {
    console.log(err);

    throw err;
  }
  return '2. READY';
};

(async () => {
  try {
    console.log('1. Will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3. Done getting Dog pics');
  } catch (err) {
    console.log('Error!');
  }
})();

// console.log('1. Will get dog pics');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3. Done getting Dog pics');
//   })
//   .catch((err) => {
//     console.log('Error!');
//   });

// // Promise function

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePromise('dog-img.txt', res.body.message);

//   }).then(() => {
//     console.log('Random dog image saves to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
