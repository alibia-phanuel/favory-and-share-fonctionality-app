import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const plans = [
//   {
//     namePlan: "Bronze",
//     price: 150,
//     duration: "AN",
//     country: "",
//     startDate: new Date("2024-12-01"),
//     endDate: new Date("2025-01-31"),
//     premiumAds: 5,
//     photosPerAd: 8,
//     shortVideosPerAd: 0,
//     youtubeVideoDuration: "",
//     zoneRadius: 0,
//     features:
//       "Visibilité élevée, 5 annonces premium, 8 photos/annonce, pas de vidéos",
//   },
//   {
//     namePlan: "Argent",
//     price: 250,
//     duration: "AN",
//     country: "",
//     startDate: new Date("2024-12-01"),
//     endDate: new Date("2025-01-31"),
//     premiumAds: 10,
//     photosPerAd: 8,
//     shortVideosPerAd: 0,
//     youtubeVideoDuration: "",
//     zoneRadius: 0,
//     features:
//       "Visibilité élevée, 10 annonces premium, 8 photos/annonce, pas de vidéos",
//   },
//   {
//     namePlan: "Or",
//     price: 400,
//     duration: "AN",
//     country: "",
//     startDate: new Date("2024-12-01"),
//     endDate: new Date("2025-01-31"),
//     premiumAds: 20,
//     photosPerAd: 10,
//     shortVideosPerAd: 0,
//     youtubeVideoDuration: "",
//     zoneRadius: 0,
//     features:
//       "Visibilité élevée, 20 annonces premium, 10 photos/annonce, pas de vidéos",
//   },
//   {
//     namePlan: "Diamant",
//     price: 1500,
//     duration: "AN",
//     country: "Maroc",
//     startDate: new Date("2024-12-01"),
//     endDate: new Date("2025-01-31"),
//     premiumAds: 25,
//     photosPerAd: 15,
//     shortVideosPerAd: 1,
//     youtubeVideoDuration: "30-45 MIN",
//     zoneRadius: 30,
//     features: "Visibilité maximale",
//   },
// ];

// const propertyTypes = [
//   { value: "Appartement" },
//   { value: "Maison" },
//   { value: "Villa" },
//   { value: "Commerce" },
//   { value: "Riad" },
//   { value: "Bureau" },
//   { value: "Terrain" },
//   { value: "Ferme" },
//   { value: "Entrepôt" },
//   { value: "Hôtel" },
//   { value: "Programme neuf" },
// ];

// const propertyStatuses = [
//   { value: "Vente" },
//   { value: "Location" },
//   { value: "Location saisonnière" },
//   { value: "Location meublée" },
// ];

// async function main() {
//   for (const plan of plans) {
//     await prisma.subscriptionPlan.create({ data: plan });
//     console.log(`Seed completed: Plan ${plan.namePlan} has been added.`);
//   }

//   for (const status of propertyStatuses) {
//     await prisma.propertyStatus.upsert({
//       where: { value: status.value }, // Si 'value' est défini comme unique dans le modèle
//       update: {}, // Aucune mise à jour nécessaire
//       create: { value: status.value }, // Crée un nouvel enregistrement si non trouvé
//     });
//   }

//   console.log("PropertyType data seeded successfully!");

//   for (const type of propertyTypes) {
//     await prisma.propertyType.upsert({
//       where: { value: type.value }, // Si 'value' est défini comme unique dans le modèle
//       update: {}, // Aucune mise à jour nécessaire pour ce seed
//       create: { value: type.value }, // Crée un nouvel enregistrement si non trouvé
//     });
//   }

//   console.log("PropertyType data seeded successfully!");
// }

// main()
//   .catch((e) => {
//     console.error("Error during seeding:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });








    // Créer un utilisateur

    async function main() {
//Vérifier et créer des types de propriétés
const propertyType1 = await prisma.propertyType.upsert({
  where: { value: 'Maison' },
  update: {},
  create: { value: 'Maison' },
});

const propertyType2 = await prisma.propertyType.upsert({
  where: { value: 'Appartement' },
  update: {},
  create: { value: 'Appartement' },
});

// Vérifier et créer des statuts de propriétés
const propertyStatus1 = await prisma.propertyStatus.upsert({
  where: { value: 'À vendre' },
  update: {},
  create: { value: 'À vendre' },
});

const propertyStatus2 = await prisma.propertyStatus.upsert({
  where: { value: 'Loué' },
  update: {},
  create: { value: 'Loué' },
});

// Créer un utilisateur
const user = await prisma.user.create({
  data: {
    id:"15" ,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  },
});

// Créer des propriétés pour l'utilisateur
const property1 = await prisma.property.create({
  data: {
    // id:'3',
    name: 'Maison de campagne',
    description: 'Belle maison de campagne avec jardin',
    price: 300000,
    userId: user.id,
    typeId: propertyType1.id,
    statusId: propertyStatus1.id,
    feature: {
      create: {
        bedrooms: 3,
        bathrooms: 2,
        parkingSpots: 1,
        area: 200,
        hasSwimmingPool: true,
        hasGardenYard: true,
        hasBalcony: false,
      },
    },
    images: {
      create: [
        { url: 'https://example.com/image1.jpg' },
        { url: 'https://example.com/image2.jpg' },
      ],
    },
    videos: {
      create: [
        { url: 'https://youtube.com/video1' },
      ],
    },
    contact: {
      create: {
        name: 'Agent Immobilier',
        phone: '123-456-7890',
        email: 'agent@example.com',
      },
    },
  },
});

const property2 = await prisma.property.create({
  data: {
    // id:"8",
    name: 'Appartement en ville',
    description: 'Appartement moderne en centre-ville',
    price: 200000,
    userId: user.id,
    typeId: propertyType2.id,
    statusId: propertyStatus2.id,
    feature: {
      create: {
        bedrooms: 2,
        bathrooms: 1,
        parkingSpots: 0,
        area: 100,
        hasSwimmingPool: false,
        hasGardenYard: false,
        hasBalcony: true,
      },
    },
    images: {
      create: [
        { url: 'https://example.com/image3.jpg' },
      ],
    },
    videos: {
      create: [
        { url: 'https://youtube.com/video2' },
      ],
    },
    contact: {
      create: {
        name: 'Agent Immobilier',
        phone: '123-456-7890',
        email: 'agent@example.com',
      },
    },
  },
});

// Créer des emplacements pour les propriétés
await prisma.propertyLocation.create({
  data: {
    id:'5',
    propertyId: property1.id,
    streetAddress: '123 Rue de la Campagne',
    city: 'Ville',
    state: 'État',
    zip: '12345',
    region: 'Région',
    landmark: 'Près du lac',
  },
});

await prisma.propertyLocation.create({
  data: {
    id:"4",
    propertyId: property2.id,
    streetAddress: '456 Rue de la Ville',
    city: 'Ville',
    state: 'État',
    zip: '67890',
    region: 'Région',
    landmark: 'Près du parc',
  },
});


  // Ajouter des favoris pour l'utilisateur
  await prisma.favorite.createMany({
    data: [
      {
        userId: "2",
        propertyId: 2,
      },
      {
        userId: "3",
        propertyId: 2,
      },
    ],
  });
// Créer un abonnement pour l'utilisateur
await prisma.subscriptions.create({
  data: {
    paymentID: 'payment123',
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    plan: {
      connect: { id: subscriptionPlan.id },
    },
    user: {
      connect: { id: user.id },
    },
  },
});

console.log('Seed data created successfully');
}
  

  main()