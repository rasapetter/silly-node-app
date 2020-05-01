const agent = require('superagent');
const asciify = require('asciify-image');

const noOfImages = 3;
const dogBreed = 'hound';
const DOG_API_URL = `https://dog.ceo/api/breed/${dogBreed}/images/random/${noOfImages}`;

const getDogImageURLs = async () => {
  const { body: { message: dogUrls }} = await agent.get(DOG_API_URL);
  return dogUrls;
};

(async () => {
  // Get a URL for a random image of a dog
  const dogUrl = await getDogImageURLs();

  // Download the image
  const { body: data } = await agent.get(dogUrl);

  // Convert the image to ascii
  const ascii = await asciify(data, {
    fit: 'box',
    width: 60,
    height: 60,
  });

  // Print the ascii
  console.log(ascii);
})();
