const agent = require('superagent');
const asciify = require('asciify-image');

const noOfImages = 3;
const dogBreed = 'hound';
const DOG_API_URL = `https://dog.ceo/api/breed/${dogBreed}/images/random/${noOfImages}`;

const getDogImageURLs = async () => {
  const { body: { message: dogUrls }} = await agent.get(DOG_API_URL);
  return dogUrls;
};

const printAsciifiedImage = async (dogUrl) => {
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
}

(async () => {
  // Get a ${noOfImages} of URLs for a specific ${dogBreed}
  const dogUrls = await getDogImageURLs();

  // Access each dogUrl
  dogUrls.forEach(dogUrl => {
    printAsciifiedImage(dogUrl);
  });
})();
