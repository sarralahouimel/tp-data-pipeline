// profil-generator.js

const axios = require('axios');
const https = require('https');

// ✅ Clé API Randommer
const RANDOMMER_API_KEY = "83f11b3a2d7c4bd28cdf9df41e094187";

// ✅ Agent HTTPS pour ignorer les erreurs de certificat expiré
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// ✅ Headers pour Randommer
const headers = {
  "X-Api-Key": RANDOMMER_API_KEY
};

// -----------------------------
// 1️⃣ Utilisateur aléatoire (RandomUser.me)
// -----------------------------
async function getRandomUser() {
  const res = await axios.get("https://randomuser.me/api/?nat=fr", { httpsAgent });
  const user = res.data.results[0];
  return {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    gender: user.gender,
    location: `${user.location.city}, ${user.location.country}`,
    picture: user.picture.large
  };
}

// -----------------------------
// 2️⃣ Téléphone (Randommer.io)
// -----------------------------
async function getPhoneNumber() {
  const res = await axios.get(
    "https://randommer.io/api/Phone/Generate?CountryCode=FR&Quantity=1",
    { headers, httpsAgent }
  );
  return Array.isArray(res.data) ? res.data[0] : res.data;
}

// -----------------------------
// 3️⃣ IBAN (Randommer.io)
// -----------------------------
async function getIban() {
  const res = await axios.get(
    "https://randommer.io/api/Finance/Iban/FR",
    { headers, httpsAgent }
  );
  return res.data;
}

// -----------------------------
// 4️⃣ Carte de crédit (Randommer.io)
// -----------------------------
async function getCreditCard() {
  const res = await axios.get("https://randommer.io/api/Card", { headers, httpsAgent });
  return {
    card_number: res.data.cardNumber,
    card_type: res.data.cardType || "VISA",
    expiration_date: res.data.expiration || "12/2026",
    cvv: res.data.cvv
  };
}

// -----------------------------
// 5️⃣ Nom aléatoire (Randommer.io)
// -----------------------------
async function getRandomName() {
  const res = await axios.get(
    "https://randommer.io/api/Name?nameType=firstname&quantity=1",
    { headers, httpsAgent }
  );
  return Array.isArray(res.data) ? res.data[0] : res.data;
}

// -----------------------------
// 6️⃣ Animal (catfact.ninja)
// -----------------------------
async function getAnimal() {
  const res = await axios.get("https://catfact.ninja/fact", { httpsAgent });
  return "Cat : " + res.data.fact;
}

// -----------------------------
// 7️⃣ Citation (zenquotes.io)
// -----------------------------
async function getQuote() {
  const res = await axios.get("https://zenquotes.io/api/random", { httpsAgent });
  const quote = res.data[0];
  return {
    content: quote.q,
    author: quote.a
  };
}

// -----------------------------
// 8️⃣ Blague (JokeAPI)
// -----------------------------
async function getJoke() {
  const res = await axios.get(
    "https://v2.jokeapi.dev/joke/Programming?type=single",
    { httpsAgent }
  );
  return {
    type: res.data.category,
    content: res.data.joke
  };
}

// -----------------------------
// Générer le profil complet
// -----------------------------
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
      credit_card: creditCard,
      random_name: randomName,
      pet,
      quote,
      joke
    };

    console.log("Profil généré :\n", JSON.stringify(profile, null, 2));
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

// -----------------------------
// Lancer le script
// -----------------------------
generateUserProfile();
