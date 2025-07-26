//Laboratoire/src/compinents/models_data.js
const politiquesCards = [
    {
        id: 1,
        name: "Barack Obama",
        description: "44ème Président des États-Unis",
        coverImg: "obama.jpeg",
        style: `style du 44ème Président des États-Unis, Barack Obama`
    },
    {
        id: 2,
        name: "Emmanuel Macron",
        description: "Président de la République française",
        coverImg: "macron.jpg",
        style: `style du Président de la République française, Emmanuel Macron`
    },
    {
        id: 3,
        name: "Angela Merkel",
        description: "Chancelière allemande de 2005 à 2021",
        coverImg: "merkel.jpg",
        style: `style de la Chancelière allemande de 2005 à 2021, Angela Merkel`
    },
    {
        id: 5,
        name: "Justin Trudeau",
        description: "Premier ministre du Canada depuis 2015",
        coverImg: "trudeau.jpg",
        style: `style du Premier ministre du Canada depuis 2015, Justin Trudeau`
    },
]

const economistesCards = [
    {
        id: 6,
        name: "Thomas Piketty",
        description: `Économiste français, auteur du best-seller "Le Capital au XXIe siècle"`,
        coverImg: "piketty.jpg",
        style: `style de Thomas Piketty, économiste français`
    },
    {
        id: 7,
        name: "Esther Duflo",
        description: "Économiste française, Prix Nobel d'Économie 2019",
        coverImg: "esther-duflo.jpg",
        style: `style d'Esther Duflo, économiste française`
    },
    {
        id: 8,
        name: "Joseph Stiglitz",
        description: "Économiste américain, Prix Nobel d'Économie 2001",
        coverImg: "stiglitz.jpg",
        style: `style de Joseph Stiglitz, économiste américain`
    },
    {
        id: 9,
        name: "Paul Krugman",
        description: "Économiste américain, Prix Nobel d'Économie 2008",
        coverImg: "krugman.jpg",
        style: `style de Paul Krugman, économiste américain`
    },
    {
        id: 10,
        name: "Amartya Sen",
        description: "Économiste indien, Prix Nobel d'Économie 1998",
        coverImg: "sen.jpg",
        style: `style d'Amartya Sen, économiste indien`
    },
];

const avocatsCards = [
    {
        id: 11,
        name: "Robert Badinter",
        description: "Avocat et homme politique français, connu pour son combat pour l'abolition de la peine de mort",
        coverImg: "badinter.jpg",
        style: `style de Robert Badinter, avocat et homme politique français`
    },
    {
        id: 12,
        name: "Amal Clooney",
        description: "Avocate britannique, spécialisée dans les droits de l'homme",
        coverImg: "amal-clooney.jpeg",
        style: `style d'Amal Clooney, avocate britannique`
    },
    {
        id: 13,
        name: "Eric Dupond-Moretti",
        description: "Avocat français, connu pour ses plaidoiries flamboyantes",
        coverImg: "dupont-moretti.jpg",
        style: `style d'Eric Dupond-Moretti, avocat français`
    },
    {
        id: 14,
        name: "Christiane Taubira",
        description: "Avocate et femme politique française, ancienne ministre de la Justice",
        coverImg: "taubira.jpg",
        style: `style de Christiane Taubira, avocate et femme politique française`
    },
];

const celebritesCards = [
    {
        id: 16,
        name: "Emma Watson",
        description: "Actrice britannique, engagée pour les droits des femmes",
        coverImg: "emma-watson.jpg",
        style: `style d'Emma Watson, actrice britannique`
    },
    {
        id: 17,
        name: "Nelson Mandela",
        description: "Homme d'État sud-africain, figure majeure de la lutte contre l'apartheid",
        coverImg: "mandela.jpg",
        style: `style de Nelson Mandela, homme d'État sud-africain`
    },
    {
        id: 18,
        name: "Malala Yousafzai",
        description: "Militante pakistanaise pour les droits des femmes et l'éducation des filles",
        coverImg: "malala-yousafzai.jpg",
        style: `style de Malala Yousafzai, militante pakistanaise`
    },
    {
        id: 20,
        name: "Leonardo DiCaprio",
        description: "Acteur américain, engagé dans la lutte contre le changement climatique",
        coverImg: "dicaprio.jpeg",
        style: `style de Leonardo DiCaprio, acteur américain`
    },
];

const medecinsCards = [
    {
        id: 21,
        name: "Benjamin Besse",
        description: "Directeur de la Recherche Clinique à Gustave Roussy",
        coverImg: "benjamin-besse.jpeg",
        style: `style du Directeur de la Recherche Clinique à Gustave Roussy, Benjamin Besse`
    },
    {
        id: 22,
        name: "Fabrice Barlési",
        description: "Professeur d'Oncologie, Directeur Général de Gustave Roussy",
        coverImg: "fabrice-barlesi.jpg",
        style: "style du Professeur d'Oncologie, Directeur Général de Gustave Roussy, Fabrice Barlési"
    },
    {
        id: 23,
        name: "Tony Mok",
        description: "Président du Département d'Oncologie à Hong Kong",
        coverImg: "tony-mok.jpeg",
        style: `style du Président du Département d'Oncologie à Hong Kong, Tony Mok`
    },
    {
        id: 24,
        name: "Martin Hirsch",
        description: "Médecin et homme politique français, ancien Directeur Général de l'AP-HP",
        coverImg: "martin-hirsch.jpg",
        style: "style du Président de l'Agence du Service Civique, Emmaüs France, et de l'Agence Nouvelle des Solidarités Actives"
    },
    {
        id: 25,
        name: "Jean-Charles Soria",
        description: "Professeur d'Oncologie, Directeur d'Amgen Global",
        coverImg: "jean-charles-soria.jpeg",
        style: `style du Professeur d'Oncologie, Directeur d'Amgen Global, Jean-Charles Soria`
    }
]

const data = [
    {
        Politiques: politiquesCards,
        Economistes: economistesCards,
        Avocats: avocatsCards,
        Celebrites: celebritesCards,
        Medecins: medecinsCards,
    }
];

export default data
