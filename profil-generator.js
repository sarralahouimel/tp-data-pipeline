const axios = require('axios');

const RANDOMMER_API_KEY = "83f11b3a2d7c4bd28cdf9df41e094187";

const headers = {
  "X-Api-Key": RANDOMMER_API_KEY
};

// --- 1. Utilisateur aléatoire ---
async function getRandomUser() {
  const res = await axios.get("https://randomuser.me/api/");
  const user = res.data.results[0];
  return {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    gender: user.gender,
    location: `${user.location.city}, ${user.location.country}`,
    picture: user.picture.large
  };
}

// --- 2. Téléphone ---
async function getPhoneNumber() {
  const res = await axios.get("https://randommer.io/api/Phone/Generate?CountryCode=FR&Quantity=1%27", { headers });
  return res.data;
}

// --- 3. IBAN  ---
async function getIban() {
  const res = await axios.get("https://randommer.io/api/Finance/Iban/FR", { headers });
  return res.data;
}

// --- 4. Carte de crédit ---
async function getCreditCard() {
  const res = await axios.get("https://randommer.io/api/Card%27", { headers });
  return res.data;
}

// --- 5. Nom aléatoire (prénom) ---
async function getRandomName() {
  const res = await axios.get("https://randommer.io/api/Name?nameType=firstname&quantity=1", { headers });
  return res.data[0];
}

// --- 6. Animal (API publique sans clé) ---
async function getAnimal() {
  const res = await axios.get("https://randommer.io/api/pet-names%27");
  return res.data.name;
}

// --- 7. Citation ---
async function getQuote() {
  const res = await axios.get("https://api.quotable.io/random");
  return {
    content: res.data.content,
    author: res.data.author
  };
}

// --- 8. Blague ---
async function getJoke() {
  const res = await axios.get("https://v2.jokeapi.dev/joke/Programming?type=single");
  return {
    type: res.data.category,
    content: res.data.joke

      
  };
}

// --- Final : Tout combiner ---
async function generateUserProfile() {
  try {
    const [
      user,
      phone,
      iban,
      creditCard,
      randomName,
      pet,
      quote,
      joke
    ] = await Promise.all([
      getRandomUser(),
      getPhoneNumber(),
      getIban(),
      getCreditCard(),
      getRandomName(),
      getAnimal(),
      getQuote(),
      getJoke()
    ]);

    const profile = {
      user,
      phone_number: phone,
      iban,
      credit_card: {
        card_number: creditCard.cardNumber,
        card_type: creditCard.cardType,
        expiration_date: creditCard.expiration,
        cvv: creditCard.cvv
      },
      random_name: randomName,
      pet,
      quote,
      joke
    };

    console.log(JSON.stringify(profile, null, 2));
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

// Lancer le script
generateUserProfile();
