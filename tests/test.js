// Laboratoire/src/components/api_mistral.js
import MistralClient from './@mistralai/mistralai/src/client.js';


const apiKey = 'zqpebDxID0ExjhXOHb5zZcF8VbkyhyfI'
const client = new MistralClient(apiKey);

const models = ['mistral-tiny','mistral-small','mistral-medium']
const status = ['Waiting','in-progress','Terminated']
let responseStatus = status[0]
document.getElementById("txt").innerText = responseStatus

export default async function mistral(){
    responseStatus = status [1]
    document.getElementById("txt").innerText = responseStatus
    console.log("mistralApi status : " + responseStatus)
    
    const chatResponse = await client.chat({
        model: models[mistralModel],
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content : userPrompt}
        ],
        temperature : 0.4,
        maxTokens : maxTokens,

    });
    responseStatus = status [2]
    console.log("mistralApi status : " + responseStatus)

    let finalresponse = chatResponse.choices[0].message.content
    return finalresponse;
}

const mistralModel = 2
const maxTokens = 20000
const systemPrompt =`
Réponds en Francais, 
Voici la transcritpion écrite d'un entretien par la direction de l’hôpital pour répondre à une demande de recrutement d’un médecin supplémentaire 

Les acteurs sont YLB et SC de la direction générale 
CAV et YK de la direction médicale 
Et FGA est le médecin auditionné pour son projet 

Et te concentrant sur la partie sur les astreintes
Format de ta réponse :
I. Un compte rendu détaillé global de l'entretien sur la partie sur les astreintes ... 
II. Un compte rendu critique couplé par pôle (direction générale  / direction médicale / médecin auditionné ) sur la partie sur les astreintes.
III. Un compte rendu critique individuel sur la partie sur les astreintes.
III. Et enfin une feuille de route pour FGA d'après les requêtes faites pendant l'entretien sur la partie sur les astreintes. 

N'hésite pas a critiquer ce qui est criticabl et faire ressortir les points faibles des interlocuteurs, c'est le plus important.
`

const userPrompt = `
FGA : 
Je vous remercie d'avoir été là quand c'était nécessaire. Des inquiétudes sur les actifs de l'équipe soignante, certes. Mme Gauthiot s'en occupe, je suis assez rassurée sur ce qui va advenir de l’equipe. 
Et sur l'équipe médicale, parce que... Je vous avais envoyé dans le mail par rapport à la maquette qui avait été faite avec Mme leonis, je pense, au mois de septembre ou décembre. On est en dessous de la maquette. La maquette et les postes de PH attribués, je crois qu'il y a un delta de un temps plein, au moins. 
SC : 
Docteur, Peut-être se rappeler, puisque la maquette n'a pas encore été présentée à la direction générale. La maquette est déclarative, puisque la DAM enregistre les déclarations des médecins. Et pour qu'elle soit un document opposable, il faut qu'elle soit validée. Aujourd'hui, ce n'est pas le cas, c'est un repère. Et dans ce que vous avez indiqué comme étant requis et les effectifs actuels, il y a effectivement un delta. 

FGA :
 Et c'est vrai que ce que j'ai indiqué, c'était aussi en fonction d'une activité de routine qu'on a eue quand il y avait encore le docteur hugues, le docteur Sanbarrino, etc. Et on est actuellement en dessous de ce qui permettait une activité de routine. Et puis, une inquiétude concrète par rapport au mois de décembre, où on a eu deux arrêts maladie de médecins en même temps, dont moi-même, et où on a été très en difficulté pour assurer la continuité des soins d'USP parce qu'en fait, il n'y avait pas de réserve. Et du coup, l'équipe mobile était un petit peu laissée de côté. Donc, l'équipe médicale est à flux tendu pour pouvoir assumer toutes ses missions. Et on a la candidature d'un médecin qui a une formation de soins palliatifs, la FST de soins palliatifs, qui veut venir rejoindre l'équipe. Et ça serait extrêmement bienvenu, quoi. Voilà. Donc, je sais qu'il y a aussi un poste qui est bloqué par le docteur hugues, encore pendant quelque temps, et ça, c'est un vrai souci. Mais bon, de toute façon, on ne peut pas faire autrement, au moins pendant, je crois, encore deux ans. C'est un temps plein. On a la perspective de pérenniser les forces vivent en place, puisque le docteur Fouquier va passer son concours Ph, qui devrait être titularisé au mois de juillet, et elle va augmenter un petit peu son temps, donc elle passera de 50 à 80 %, donc ça, c'est aussi un renfort qui va être précieux. 
Pour la première fois, on a des internes, donc ça, c'est vraiment... Alors, on ne peut pas compter dessus non plus pour compenser le manque de postes. Je crois que ce n'est pas le but. Mais en tout cas, nous, on est ravis de pouvoir les accueillir, de les former, et c'est une vraie perspective de transmission, d'acculturation. On a un interne de FST, donc en plus, lui, qui m'a demandé d'être sa directrice de these, donc il veut garder un pied ici. Il est là, en ce moment, Maxime Grisbard. Et l'autre est une interne de médecine générale. Alors, les internes de FST, on n'en aura pas souvent, parce qu'ils sont très peu à la FST de soins palliatifs. Ils sont à peu près 4 à 5 par an. Ils vont au CHU en priorité. Lui tenait vraiment à venir ici, et c'est une vraie démarche. Il est très impliqué, très apprécié par l’equipe. Donc on est très contents d'être en lien avec lui. En tout cas, le poste d'interne de médecine générale, maintenant qu'il est occupé, il est ouvert, je pense qu'en tout cas, ce poste-là sera reconduit régulièrement. Donc ça, c'est une bonne nouvelle. Et voilà. 

Donc là, le premier point, c'était pouvoir m'assurer qu'on va effectivement pouvoir recruter ce médecin, qui sera disponible au mois de mai. Alors, effectivement, par rapport à l'historique de l'équipe médicale, il y a des choses qui ont un petit peu bougé aussi. Je ne sais pas si je poursuis sur ça, mais il y a le poste du docteur Lenfant, qui était encore sur le pôle des urgences, et qu'on a récupéré sur notre pôle pour régulariser une situation, puisque le docteur Lenfant est maintenant à 80 % avec nous. Donc ça semblait bien normal à Catherine Vélly  de pouvoir récupérer son poste d'urgentiste. Donc du coup, sur les postes de PH disponibles, M. Lenfant prend un poste, et puis du coup, le docteur Fouquier va aussi occuper un PH. Et à partir de ce moment-là, la problématique est qu'on n'a plus de postes de PH disponibles. Si j'ai bien compris, en tout cas d'ici deux ans, la situation de docteur Hugues devrait être régularisée parce qu'il ne peut pas aller au-delà de cinq ans. Si j'ai bien compris ? Donc si vous étiez d'accord pour ce recrutement, il s'agirait de proposer une solution transitoire pendant deux ans, comme on a fait avec Élodie Fouquet, d'ailleurs. Elle a été en PHC pendant deux ans avant de passer le concours. D'autant plus que je crois qu'il n'a pas tout à fait finalisé sa thèse, etc., et que je pense qu'on ne pourra pas le recruter. Voilà. 

YK : 
En d'autres termes. En individu, il y a... Oui ? -...toi, François L'Enfant... -...Marie-Louise. -...Marie-Louise Fouquier ?. C'est la maquette, c'est ça ? 
FGA :
 Oui, oui, c'est votre maquette. C'est très bien. 
YLB :
 Et le statut actuel du docteur Hugues, c'est ça ? Il est PH. J'ai jamais connu... Il est en arrêt ? 
FGA : 
En arrêt maladie, oui. Depuis 2020. En CLD ? Juillet 2020, c'est ça ? Ou peut-être mai 2020 ? Quelque chose comme ça. Je ne peux pas vous dire la date. Je sais que je n'ai pas rencontré, mais... D'accord, CLD. 
YK : 
Et l'interne FST, il est interne, certes, mais FST, il est quand même... 

FGA : 
 Alors oui, mais en fait, j'ai insisté sur ce point, parce qu'il y a une vraie différence entre l'interne de FST, en plus, qui est en fin de cursus, et l'autre interne, qui est en médecine générale, qui a besoin d'être plus cadré. Pour autant, lui, il demande à être formé, donc il faut être beaucoup avec lui. Après, on fait, vraiment, on le forme, on fait... YK :C'est quoi, le FST de soins palliatifs, c'est mixé avec ? 
FGA : 
Ah non, FST de soins palliatifs, Alors, ils ont une formation de douleur. Moi, quand j'ai fait la formation, tu avais la même formation, soit algologue, soit médecin de soins palliatifs. Il y a une grosse formation éthique, aussi. Mais là, ils doivent se positionner soit algologue, soit médecin de soins palliatifs. Il reste un an ou six mois ? C'est six mois. Là, pour eux, ou ça se termine en mai ? Ça se termine en mai. Dans la mesure où il voudrait, en fait, que son sujet de thèse soit sur l'USP de Toulon, il va voir s'il peut reconduire, en fait. Ce qui est possible, exceptionnellement, mais s'il fait son recrutement de patients, son enquête, ça serait... 
CAV : 
Et il a le droit de doubler son..stage ?
FGA : 
En fait, s'il n'y a pas de concurrence sur le poste, a priori, oui. En plus, dans la mesure où, nous, on fait USP et UMSP, et on peut aussi justifier qu'il soit plus sur l'UMSP le second semestre. 
YK : 
Et du coup, ça serait son dernier semestre ? Oui. Euh... Oui, donc, s'il est renouvelé, qui c'est qui va décider ça ? Parce que c'est, du coup... C'est la fac, et en fait, c'est dans une semaine... C'est une situation précieuse, puisque c'est quand même... C'est le professeur Salas, à la Timone, qui fait ça. Il aura quasiment une fonction de FFI, en fait. Voilà, il n'est pas loin, quoi. Il est en fin. Mais c'est justement... Oui, il n'a pas le projet de rester. Enfin, il y a d'autres perspectives avant de... Il n'a pas le projet de rester. Ben, peut-être pas... En fait, a priori, il va finaliser sa thèse et prendre 2-3 ans avec sa compagne avant de prendre un poste fixe. 
YK :
 Je comprends. Oui, s’il y'amoyen. Je ne sais pas tout ça. Il faudra me donner son nom, il faudra me le transférer... Oui, il faut qu'il fasse. Il y a une motivation de rester, certains. ...qui est le responsable de la fac FST, qui nous a positionnés au FST en gérie après-médecine interne. C'est pour ça que je disais que c'est un mixte avec toi. Pour lui donner le contexte et lui dire que... 
CAV :
 En revanche, il faut le coacher pour qu'il ne dise pas qu'il n'a pas l'intention de rester ici. S'il dit qu'il n'a pas l'intention de rester ici... 
FGA :
 Il faut que je clarifie ses intentions d'ici la fin du choix et après que... 
CAV :
Ça ne sera pas vendeur. 
YLB :
 Oui, bien sûr. Coaching. Oui, coaching. 
CAV :
Il faut dire qu'il a un intérêt et qu'effectivement, il a quand même un projet d'être ici ou d'avoir un avenir dans l'établissement parce qu'autrement, on aura du mal à se positionner comme... 
YK :
Et les internes de médecine générale, ce sont des jeunes ou des jeunes ? 
FGA :
 Là, c'est une toute jeune. Premier semestre ? Deuxième semestre. Après, je suis quand même étonnée du niveau pour un deuxième semestre parce que... Je pense que ça, ça dépend sur qui on tombe, mais là, c'est... Elle est... Elle vient au CME, Clémence, c'est la...
YK :  Ah oui ? C'est Clémence. 
FGA :
 D'accord. Mais oui, elle est autonome, elle est... Bon... On a eu... On a eu de la chance parce que je pense que ça peut... D'un choix à l'autre, ça peut changer. Là, on a eu deux belles recrues. 
CAV : Les pré-choix, c'est quand, les pré-choix d'interne ? 
FGA :
 Dans pas longtemps. La commission de répartition, c'est fin mars, donc les pré-choix, c'est début mars. Ça doit être juste avant, ça doit être après les vacances scolaires. 
YK :
 Et... Et en fait, il faudrait déjà presque commencer à en parler avec Patrick , du coup, dans la semaine prochaine, presque. Oui. Et là, il est en vacances, Maxime. Je le revois que lundi. Lundi, dans la semaine lundi. Lundi, je lui en parle. Oui, il faut qu'il ait un projet. Il faut qu'il construise son projet parce qu'en fait, si... Les DJ, tout ça, il faut anticiper.
CAV :
 Oui. Surtout que si... Si son projet, c'est de prendre une dispo pendant 3 ans, il sera pas vendeur. 
FGA :
 Mais alors, je sais pas du tout... En fait, je connais pas trop le statut de docteur junior, mais est-ce que du coup, pour François Huguenot, qui est candidat, qui n'est pas encore thésé, ça peut pas être une option pour le faire venir dans l'attente d'un poste de PH ? 
CAV :
Non. Il faut qu'il soit interne encore. Il sera fait FFI, quoi. Il a fini, en fait, son cursus, Huguenot. C'est ça, en fait. Et les DJ, c'est quand même un an avant le dossier. Là, on est sur les dossiers de DJ de mai 2025, nous. sachant que c'est les DJ qui nous choisissent. Et la liste vient d'être publiée ce matin, d'ailleurs,

 FGA : 
 Non, bah... Alors, attendez, maintenant, il faut qu'il fasse une thèse de... Non, en fait, il démarrait avant d'être thésé, aussi. De toute façon, il aura un statut de FFI transitoire, s'il vient, parce que tant que t'es pas taisé... Il a un intérêt familial ou un intérêt professionnel ? Idéalaire ? Les deux. Les deux. Lui, il veut faire des soins palliatifs. Après, c'est un gars qui a fait de l'unité... Enfin, il fait... Il peut faire que ça, quoi. Et après, avec sa compagne, il cherche un coin... Ça leur convient, tous les deux, ce coin-là, aussi. Euh... Je crois que ça serait soit avant l'été, soit la rentrée, lui, sa thèse. Parce qu'il cherche une date soit en juin, soit septembre. Au post-septembre, ça doit être ça, pendant octobre. Voilà, il est en train de... 

SC :
Donc là, on a deux sujets ... Alors, il y a un premier sujet, qui est celui de la concordance et la maquette, parce que pour la dam, la maquette n'étant pas validée, c'est pas... Ça peut être un support, un outil. 
Là, la maquette fait apparaître un besoin d'ETP supérieur à l'existant. 
Sauf qu'il y a peut-être un premier regard à avoir sur la maquette pour se poser la question du recrutement. 
Donc là, sur la maquette, on voit apparaître, pour les 14 lits du service... Vous avez 12 lits, 14 lits ? 
FGA :
 12 lits. 
SC : 
12 lits du service, un besoin de deux ETPs jours. Ce qui vous fait l'équivalent de deux temps pleins, en fait, jours, plus sur l'unité mobile. Un requis de deux ETPs. 
Donc, ça peut questionner sur l'établissement. 
Après, il y a une spécialité, les soins palliatifs sont très particuliers, mais ça peut questionner sur l'établissement, malgré tout, parce que, globalement, les ratios en effectif ne sont pas forcément ceux-là.

FGA :
  Oui, mais en soins palliatifs, les ratios sont différents. 

SC : J'alerte ma direction générale. Ils sont supérieurs, après, effectivement, il faudrait pouvoir se comparer un peu. 
YLB :
Et puis après, il y a se comparer un peu à d'autres USP. Moi, ça m'intéresserait. En tout cas, je n'avais pas l'habitude, pour ma part, de ce type de maquette, que les maquettes soient supérieures et le ratio supérieur à une unité d'hospitalisation conventionnelle, évidemment. Et après, il y a aussi une certaine biologie d'activité, parce que l'EMSP a une réalité de fonctionnement, même si, à la fin, vous êtes dans quelque chose qui est coordonné. Et tant mieux pour le projet médical et pour le suivi des patients. Le vecteur de... Je suis désolé de parler prosaïque, mais le vecteur de financement n'est pas le même. Oui. Donc, il faut aussi qu'on regarde avec le vecteur financement EMSP. Vous êtes du FIR, oue de la MIG ?... 
FGA :
C'est de la MIG , je crois. 

YLB :
 Oui, je pense que c'est l'un des deux.. Et voir, du coup, ce qu'on nous finance aussi. Je pense que ça va guider une partie de... Sur le volet EMSP, ça va faire guider une partie. Sur l'autre, c'est une réalité plus classique de financement des activités. Mais voilà, dans le raisonnement global et pour pouvoir analyser la maquette, 
Après, il y a le projet Med, évidemment. Ça, c'est sûr. Alors, après, j'entends que ça interpelle 2 temps plein pour 12 lits, ce que ça fait, du coup, un médecin pour 6. Et le EMSP. 
FGA :
 Et l’EMSP. En fait, bon, là, on vient de remplir le rapport d'activité de l'équipe mobile. Là, on y entrera. On va le rendre avant fin mars. Il y a aussi toute une zone aveugle de notre activité qui est difficile, en fait, à quantifier, mais qui, pourtant, prend beaucoup de temps. Que ce soit les formations... Il y a tout ce qui est... Informalisé, les DPC, le DU, etc. Mais il y a aussi toutes les formations de façon un peu plus... Comme ça, là, ça prend beaucoup de temps. On est disponible pour des staffs de réflexion éthique. Voilà. Pouvoir donner notre expertise de soins périodiques, assurer la collégialité. Et en fait, ça, il y a quasiment tous les jours et parfois plusieurs réunions par jour. Donc ça prend du temps. Et donc, forcément, c'est du temps qu'on n'a pas auprès des patients, sur le plan clinique, sauf que ça fait partie de nos missions. Pour être... Là, je fais que de l'unité depuis les six derniers mois, là, facilement. C'est sûr que quand on est deux médecins, ça nous permet de sectoriser les visites, de voir toutes les familles, de mener le staff avec l'équipe tous les jours, qui, pour moi, a une prérogative pour rassurer la spécificité d'un travail en USP. Parce qu'on est là pour pouvoir réserver un espace réflexif autour du patient. Parce que si on ne peut pas proposer ça, je pense qu'on glisserait vers une prise en charge de médecine polyvalente. Enfin, ça ne serait plus une prise en charge en USP. 
Quand il y avait les médecins, donc maintenant qu'ils ne sont plus là, il y avait aussi la petite consultation de douleurs qu'on n'a pas pu reprendre, qui manquent à l'établissement. Il y avait des docteurs vallicioni et hugues  qui faisaient une vacation chacun par semaine de douleurs onco et douleurs onco et soins palliatifs. Mais c'était vraiment... Ça répondait à une demande. 
Les oncologues nous sollicitent et nous, on ne peut plus leur proposer ça. C'est sûr que... Voilà. Je trouve que c'est une activité qu'il faudrait pouvoir reprendre. Donc oui, ça apparaît beaucoup par rapport aux effectifs. La particularité de notre équipe mobile, c'est qu'elle est multi-sites. Donc par rapport à l'intra-hospitalière, mais multi-sites. À chaque fois qu'on change d'endroit, là, jeudi, c'est Clémenceau, le mardi, elles vont à La Seine. C'est aussi du temps de changer. C'est vraiment une autre façon de travailler, d'être sur plusieurs sites. Voilà. On essaye d'optimiser  par téléphone. Parfois, on est obligés de repenser un peu nos outils de travail, parce qu'on ne s'en sort pas, on ne peut pas se déplacer à tous les coups. Mais tout ça, c'est pas forcément visible sur un bilan d'activité standard. Et pour autant, je pense que ça fait vraiment partie de nos missions. Voilà. 
SC :
En tout cas, mon propos, c'est pas de juger, parce que je n'ai pas la compétence. Bien sûr, sur le requis, mais plus de... Parce que c'est notre rôle de regarder la dépense que va générer le recrutement avec, en regard, les financements, dans un contexte qui est quand même très compliqué pour notre établissement. Donc, d'où les questions, et il faut qu'on se les pose collectivement. Donc, le recrutement du médecin, au-delà de sécuriser les pratiques et de garantir tout cela, il y aura aussi un questionnement sur l'implication de l'équipe médicale sur le territoire, l'implication de l'équipe médicale dans le maillage de l'établissement, enfin, tout ça. Est-ce que, du coup, c'est dans le champ ? Parce que, par exemple, là, dans la maquette, on n'a pas identifié le temps médical pour l'hôpital de jour. Est-ce qu'il y aurait du temps supplémentaire après si jamais l'hôpital de jour se mettait en place ? 
FGA : 
Non, pour le moment, de toute façon, c'est un effectif constant, le projet d'HDJ. Non, ce serait sur l'activité du temps d'équipe mobile, selon le patient, où le médecin se trouve à ce moment-là. Mais je pense que ça serait pris sur ce temps-là. Je ne sais pas encore. Les consultations en HdJ, l'HdJ sera... Ça sera... 
YK :
La journée de HdJ, elle est facturable en HdJ ? 
FGA :
Oui, identifiable en HDJ, soit pas sélectif. 
YK :
D'accord. Elle est facturable en tant que telle ? 
FGA :
 Oui. Elle... Si on répond à certains critères, il faut qu'il y ait une expertise palliative, donc le fait qu'il y ait un passage dans le médecin, voilà, je crois qu'il faut qu'il y ait 3 soins de support. Ils en chargent plus ou moins une discipline. C'est ça. Donc, bon, s'il y a la diète qui passe, la psycho... 
YK :
 Du coup, elle va répondre à la question de consultation, quelque part. 
FGA :
 Ce ne sont pas les mêmes patients qu'on voit en bilan de soins palliatifs et qu'on voit en consultation douleur. C'est pas... Oui. Mais peut-être. On ne va pas pouvoir... 
YK :
 Des prévisions par rapport à ça. Ça serait combien de patients sur une prévision d'une première année ? C'est 50 patients par année ? 
FGA :
 Alors, ce qu'on proposait, c'était 4 patients par semaine sur 2 jours. 
YK :
200, donc un peu plus. 
FGA :
 Voilà. Par deux journées, parce qu'il faut garder les patients par demi-journée. Voilà, sur deux jours. Deux patients par jour sur deux jours par semaine. Voilà, ça me paraît faisable. 
YK : Il y a une difficulté PNM là-dessus ? Ou c'est que, sur la question M, c'est quoi l'obstacle ? Pour les consultations. Pour les consultations.
SC :
 Pour la stratégie, déjà. Alors, le PNM a déjà été recruté. C'était une infirmière coordinatrice qui a fait l'objet d'une EME. Donc, elle est là. C'est pas l'hôpital de J, mais elle est là. Elle a été réintégrée. Depuis un an ? 
CAV :
 Oui, depuis un peu plus. Depuis août 2022. 
FGA :
 Le septembre ou l'octobre ? 
CAV :
 Le recrutement, c'était juillet à 31 août. 
SC :
C'est le financement en amont. En EME. 
YLB :
 Et du coup, elle a été réintégrée au fonctionnement du pôle dans les effectifs. Du coup, on est à plus 1 ? 
SC :
 On est à plus 1 parce qu'en fait, elle va pallier des absences au travail, mais on n'a pas diminué l'effectif infirmier pour autant du pôle, que ce soit l'équipe du Dr Giraud ou... D'accord. 
YK :
 Et les patients de l'HDJ sont... Qu'est-ce qui nous empêche d'ouvrir, finalement ? 
SC :
 Alors, peut-être la genèse. Enfin, la genèse. Pourquoi ça n'a pas ouvert ? Parce que les deux lits étaient prévus pour être ouverts sur le service de pneumo
 Et le docteur Mérien, pour ne pas le citer, a questionné, en tout cas, le contexte pour savoir quel était l'intérêt pour savoir quel était le maillage, quel était son rôle, quelle vision on devait avoir. Et donc, il a été acté de prendre le temps d'avoir cette discussion pour clarifier la politique d'établissement, qui fait quoi et où. Et en fait, c'est ce qui reste à clarifier. 
YK :
 Et à la Seine, il y a de la place ? 
FGA :
 Alors, il y a plusieurs pistes. Parce que, du coup, on a été voir un petit peu. Et puis, je me suis renseignée auprès de la directrice de site et de notre cadre de site, qui connaissent très bien tous les recoins de l'hôpital de la Seine. Alors, soit on réorganise dans l'unité en condamnant un bureau de psychomote actuellement, et auquel cas, on perd un bureau. Mais l'avantage, c'est que cette pièce, il y a la pièce d'eau, il y a les toilettes, il y a de quoi mettre un brancard, il y a un ordinateur. Il y a juste l'oxygène qui pose souci, mais je pense que ça concernera un peu de patients, et on peut toujours y pallier avec une bouteille d'oxygène. Après, moi, je vais visiter régulièrement. Je me balade dans l'hôpital de la Seine, parce qu'il y a quand même le service tiroir qui est en face, où avait été transférée l'oncologie pendant le Covid, où, là, actuellement, il y a la psychiatrie, en attendant que les travaux soient faits, etc. Traverse la passerelle, c'est en face des soins palliatifs. Je me suis posée la question de... Voilà, alors, ce service, il est précieux, il est nécessaire, mais on prendrait juste une chambre à l'extrémité, parce que c'est vrai que quand il y a les grippes en hiver, c'est pas du tout propre. Là, il n'y a pas tout le monde. Mais ça pourrait être aussi... Là, il y a tout. Les chambres, elles sont aménagées. Le bureau, je pense quand même qu'il y a, dans une configuration médicale un petit peu restreinte ou avec le poste de Damien Hug, la proximité de l'hôpital de jour pour l'avoir. Là, c'est en face. C'est pas... Bon. Oui, mais plus on est proche, plus c'est facile pour les infirmiers. Oui, en fait, la question, c'est que dès que tu perds quelque chose, en général, tu ne le récupères pas. Donc si on perd un bureau... Si le bureau, il est occupé, il n'est pas occupé. Voilà, si on perd un bureau, c'est plutôt pour que tout le monde soit bien, pour travailler. En gros, les pistes, c'est ça. Moyennant, là, il faut déménager des armoires, mais il n'y a pas grand-chose à faire, quoi. Voilà. Et après, pourquoi est-ce que ça semble... Alors, je pense qu'il faut quand même qu'on soit vraiment... Là, avec les effectifs médicaux actuels, c'est trop serré.
. Mais en tout cas, il faut un médecin de plus tout le temps. Oui. Parce que sinon, en fait, l'idée, c'est qu'on s'organise pour qu'il y ait un médecin responsable par jour d'HDI. Ça fait deux patients avoir... C'est pas non plus... C'est faisable. Oui, c'est quatre par semaine. Pour avoir fait de l'HDI, en fait, à l'IPC, en fait, j'invente rien. C'est juste un dispositif que j'ai exercé et j'ai vu à quel point c'était... Ça permettait d'anticiper pour mettre en place des choses à la maison, éviter que tout le monde panique, rassurer les familles, voilà. Alors, ça ne solutionne pas tout non plus. Non, on est pas sûr. Mais en tout cas, sur la fameuse fiche urgence pallia dont on a parlé... Le bénéfice patient, il est évident. Voilà, sur déjà la bonne orientation du patient, pouvoir discuter vraiment... Après, pour parler en effectif médical, s'il y a deux médecins qui sont présents sur l'unité d'hospitalisation et que l'HDI est sur site, ça permet quand même d'être faisable sans avoir d'augmentation. Là, il y a deux médecins postés et qu'on dégage du temps sur une journée entière. Mais avec les congés, les formations de chacun... Oui, mais c'est très rare. 
CAV :
 D'accord, donc du coup, il n'y a besoin que d'un médecin posté. Du coup, ça peut tourner avec un seul. Ou il y en a besoin de deux. C'est pour ça que dans la répartition de la maquette, s'il y en a besoin de deux tout le temps, ça veut dire qu'il faut... Il faut s'assurer de médecins tout le temps sur l'USP. 
FGA :
 Oui, mais par exemple, pendant les vacances, il n'y en a qu'un. 
CAV :
D'accord, donc ça veut dire que l’USP peut fonctionner à 1. Du coup, ça veut dire que tu n'as pas besoin de deux pour fonctionner, en fait. Deux, c'est optimal, mais un, c'est le minimum. Donc c'est là où ça permet de se mettre dans une situation où tu peux initier le projet pour justifier le recrutement après, en augmentant l'activité. 
FGA :
 Oui, mais moi, je pense que mon équipe médicale ne tiendra pas. Au mois de décembre, on est passés à ça de la fermeture à nouveau. Le deux, c'est le minimum... CAV : Enfin, pour refaire la question, est-ce que le deux est le minimum requis pour la sécurité des patients ou c'est le confort et la QVT qui...
FGA :  Non, alors, ce n'est pas une question de confort. Tu parles de deux sur l'USP, là. Oui, c'est-à-dire qu'en fait, là, quand tu dis... Quand je ne suis pas là  avec les vacances, des fois, on n'y est qu'un, ça veut dire que quand même... En fait, quand on n'est qu'un médecin sur l'USP, ça m'arrive très souvent d'être seule sur l'USP ou François. D'accord. Moi, je pense qu'on ne fait plus du travail spécifique d'USP. Je pense qu'on perd vraiment en expertise. J'ai ressorti, je trouvais que c'était intéressant. Du coup, tu vois, les problèmes, il y a des discussions. Enfin, nous, il y a des patients qui viennent avec des demandes de sédation, avec des demandes d'euthanasie, beaucoup, avec toute une souffrance existentielle. On a des patients très complexes sur la douleur. Là, je trouve qu'on a une expertise sur la douleur complexe et qu'on récupère de plus en plus de patients. Voilà, on met là, il y en a plusieurs avec du Suflanta, des protocoles Métadone, des choses comme ça. Ça prend beaucoup de temps, en fait, ces patients-là. C'est des patients qui vont pouvoir évoluer sur la journée. C'est des patients qu'il faut voir plusieurs fois sur la journée. Si tu ne les vois qu'une seule fois le matin, franchement, ça ne suffit pas. 
YK :
Qu'est-ce qui permettrait de pallier... Enfin, à effectif constant, qu'est-ce qui permettrait d'augmenter, de pallier à l'existant, en fait ? C'est ça, ce qu'il faut... C'est ça, la question, en fait. De notre côté de... Je ne sais pas. Il y a une dimension économique... Voilà, de la dimension économique qui nous coince. Après, sur la prise en charge médicale, on est tous convaincus de l'intérêt de tout ça et on ne discute pas, mais c'est vrai qu'il faut qu'on réfléchisse avec un effectif constant dans la situation que nous sommes. Il n'y a pas de norme et pas de texte sur les soins palliatifs en termes de nombre de praticiens pour nombre de lits. Ce n'est pas normé. Ce n'est pas normé. C'est comme la gériatrie, il y a un prétexte, un prétexte... 
FGA : 
Il n'y a pas de norme. Très souvent, tu as un médecin par unité, mais en fait, la plupart des unités, elles font entre 5 lits et 7 lits. Donc nous, en fait, pour une unité de soins palliatifs, on a une grosse unité, même si 12 lits, ça paraît peu. En fait, t'as pas d'unité qui fait plus de 12 en soins palliatifs. Ça n'existe pas à Gardanne. Ils en ont plusieurs, mais il y a plusieurs unités de 12 lits. T'en as pas une unité de 15 lits en soins palliatifs. YK : 
Par exemple, à Gardanne, les 12 lits, ils ont combien par 12 lits ? 
FGA : 
Alors oui, ils ont un médecin par 12 lits, mais ça ne fonctionne pas pareil. En tout cas, il y a toujours un médecin par 12 lits. Oui, bien sûr. Oui. 
SC :
 Ça serait bien d'ailleurs d'aller peut-être faire du bench. Oui, il faut regarder. Il faut qu'on regarde. Et après... 
YLB :
 C'est souvent des organisations aussi... Moi, c'est le que j'ai connu. Je ne sais pas si c'est souvent, mais c'est mixé avec l'EMSP, effectivement. Moi, je connais l'EMSP à l'échelle départementale. C'est mixé avec l'EMSP. Au début, c'était scindé, après, ils ont mixé. Mais bon, c'est ça, dans le bench. C'est cette finesse-là qu'il faut arriver à approcher, parce que la mutualisation ou la non-mutualisation, ça change pas mal de choses, je pense. 

SC :
On aura un autre sujet à regarder, celui des astreintes, mais des astreintes où vous vous déplacez tous les week-ends, ce qu'on voit sur Agile Time, tous les week-ends, donc samedi et dimanche. Alors, samedi après-midi, dimanche matin, dimanche après-midi, sur des plages qui sont optimales, parfois très tôt le matin, c'est quasiment systématique d'ailleurs, jusqu'à tard le soir, ce qui, du coup, génère là aussi un surcoût pour l'unité que vous avez a porter. Et donc, ça aussi, c'est à re-questionner, parce que dans la maquette, comme c'est de l'astreinte, ça n'apparaît pas, sauf que dans la vraie vie, ça se rapproche plus d'une garde sur place que d'une astreinte. Donc, il y a aussi ça à questionner. C'est un cout, c'est un cout. 
FGA :
Alors après, pour être très clair, avant la réouverture de l'unité, c'était convenu avec le précédent directeur des affaires médicales qu'on puisse valoriser cette astreinte, parce qu'en fait, l'historique de l'astreinte, elle est lourde aussi. On a fait très longtemps l'astreinte sans être payée du tout. On l'a faite pendant longtemps très mal payée. Et en fait, dans les conditions de réouverture, ça avait été une grande discussion avec M. Delpêche à l'époque. Et du coup, on avait convenu de la valoriser de cette façon-là. Donc, c'est la consigne que j'ai donnée à mes médecins. 
SC : 
Alors moi, je ne reviens pas là-dessus. Là non plus, je n'ai pas de jugement à porter. Par contre, on est de plus en plus regardé. Déjà, on doit se regarder nous-mêmes, parce que nos contraintes financières sont celles-là. Mais aussi, on est de plus en plus regardé par notre contrôleur, notre trésorier, qui nous demande de justifier les dépenses. Et donc, ce n'est pas le seul service. Et Hyeres, on a aussi des soucis, des préoccupations là-bas. Mais on doit, quand il y a un déplacement en garde, indiquer quel patient est vu l'heure d'arrivée, l'heure de départ du médecin. Et forcément, ça attire l'œil. Ça a attiré le mien, mais pas que. Ça attire l'œil quand on a comme ça du systématique, 8h30, 12h30, où on a deux plages à chaque fois qui sont déclenchées, d'autres que nous vont finir par tomber dessus. Et de toute façon, on aura à le justifier. Et les arrangements qui ont pu exister, très bien, risquent de ne pas pouvoir tenir. Donc là, c'est la même chose que la PET du docteur Fouquier. J'ai eu la même discussion. Il y a eu une négo de PET, à un moment donné, sur un truc qui n'existe pas. Du moment, il faut que ça saute. Donc là, le docteur Fouquier bénéficiait d'une PET. 
FGA : C'est quoi, une PET ? 
SC : Une prime d'exercice territorial qui n'existe pas. Il n'y a pas l'action, il n'y a pas l'activité, mais il y avait la prime, c'est un élément de négociation. OK ? Donc on y a mis fin, dans le renouvellement du contrat, et on a discuté de comment on fait pour y mettre fin. Donc ça, c'est propre, c'est fait, il n'y a pas de souci. Là, pour moi, c'est un point d'inquiétude, que ces gardes non faites. C'est un point d'inquiétude. 
FGA : Pour l'astreinte, moi, je pense qu'en fait, on répartit le temps qui est consacré, mais c'est une astreinte qui prend beaucoup de temps. Donc quand un médecin part à 14 ou 15 heures, je trouve que ça ne me semble plus... Le fait de mettre deux passages, effectivement, c'est pour valoriser l'astreinte. Je comprends votre inquiétude, mais mon équipe médicale, si je leur dis qu'on ne peut pas recruter de médecins supplémentaires et qu'ils vont moins gagner sur leurs astreintes... Je pense qu'après, il faudra... Je pense qu'elle va se déliter. Ce n'est pas grave, ce n'est pas un souci. C'est-à-dire qu'en fait, je trouverais ça dommage parce que mon service me tient à coeur. Je pense qu'il est nécessaire pour nos deux bassins de population que pendant que ça a fermé, ça a manqué. Mais en fait... 
SC : 
C'est pas le sujet, docteur. 
FGA : 
Le sujet, c’est que 200 euros pour la prime  de chef  service aussi. C'est assez intéressant quand même de voir... Je pense que c'est à la mesure de la marge de décision qu'on nous laisse, en fait. Ça ne vaut pas plus. Et pourtant, charge mentale, je pense que... 
SC : 
Ce n'est pas le sujet, docteur. Voilà. 
YLB : C'est pas le sujet, docteur. Le sujet, c'est que vous défendez un projet et on essaie de voir non pas l'opportunité. Si on est là, c'est qu'on pense tous que ça fait partie du projet médical, de l'établissement et de sa vocation. Après, on est dans les conditions de faisabilité. Condition de faisabilité, c'est pas nous qui décidons des modalités de financement des activités, ni pas plus des primes pour les chefs de service. C'est pas nous qui les décidons. Non, mais peu importe. C'est pour ça que je le dis. Par contre, vous avez une demande, fatalement. On revoit l'ensemble de l'organisation, comment elle tourne actuellement, pas au sens médical, au sens de l'activité, ce qu'elle génère, comment les coûts sont affectés. Et après, avant de pouvoir se dire, est-ce qu'on est capable de se payer quelque chose de plus ? Dans un établissement comme tous les hôpitaux en France, on est dans une contrainte économique majeure. C'est pas une question du jugement de valeur, ni du projet, ni de l'équipe. C'est pas ça, le sujet. On est tous dans une responsabilité collective. Si demain, on vous dit, pas de problème, et puis vous générez un déficit d'un million d'euros, je vais vous dire qu'assez vite, vous allez vous en rendre compte. C'est-à-dire que les travaux que vous voudriez pour aménager l'hôpital du jour, incapable de payer les entreprises, et ainsi de suite. Je peux vous faire une liste assez longue. C'est juste un devoir de responsabilité collective dans des règles du jeu qui s'imposent à nous. Ici, personne ne tourne la table pour choisir une règle de fonctionnement et de financement. Elles sont là, donc la marge de manœuvre, elle est dans ce cadre de responsabilité. C'est tout. Donc, il n'y a pas... Nous, il n'y a pas de rapport de force vis-à-vis de vous, et vous n’avez pas plus à en avoir vis-à-vis de nous. On cherche juste à comprendre et derrière, être capable de financer dans la durée pour que le projet que vous portez et qu'on soutient, il soit pérenne. L'hôpital du jour, aucun problème. En plus, j'ai l'impression que par rapport à l'été, ça s'est clarifié. J'ai l'impression. 
FGA : En tout cas, l'hôpital du jour va rapporter à l'hôpital. Donc, ça va peut-être pouvoir compenser. Alors, oui, moi, je parle de finances, là. C'est l'ambulatoire. 
YLB : 
L'actionnaire, c'est les patients. Nous, on veut simplement qu'on ne fasse pas d'excédent commercial. Je veux simplement qu'à la fin, on soit sûrs d'assurer le modèle économique pérenne de l'hôpital pour que la mission de service public soit... 
FGA : Ce que je voulais dire, c'est qu'en fait, ce que rapporterait financièrement l'hôpital du jour permettrait peut-être de compenser un petit peu le reste et de financer... C'est ce qu'il nous faut supplémentaire. C'est ça qu'il faut regarder. Effectivement, il y a le poste de madame DArdoise, certes, mais bon, après, ça ne m'intéresse pas. Il y a le poste d'infirmier et puis le temps médical. Oui, mais le temps médical qui serait... Je ne pense pas qu'il ne sera pas plein, mais voilà, on voit si ça peut... Mais après, ce qui me questionne, juste sur le temps médical aussi, c'est qu'en fait, on est bien en dessous de ce qui existait avant la fermeture, en fait. Voilà. Alors peut-être... Je pense qu'on était certainement dans une situation qui était peut-être confortable, et qu'on ne s'en est pas rendu compte, mais en tout cas, on est bien en dessous. Et sur l'astreinte, on a fait le choix d'être autonome sur notre service pour plein de raisons, en fait, parce que c'est des patients qui sont très complexes, qu'il y a des décisions, voilà, notamment au niveau d'engagement thérapeutique, sur l'aspecticité des traitements, etc. Donc, en fait, on voulait être complètement autonome pour... Donc, ça, c'est un vrai choix, parce qu'on fait des semaines d'astreinte téléphonique 24 heures sur 24. Je pense que pour la prise en charge des patients, puis pour les confrères urgentistes aussi, je pense que c'est mieux. Mais ça demande un vrai engagement. Actuellement, c'est une semaine par mois ou une semaine par mois, voire plus. Voilà.
YK :
 Après, moi, ce qui me gêne dans la transformation de dimanche en coup de garde, c'est que le moindre pépin, accident de voiture, on tombe dans l'escalier, etc. Et qu'au fond, on n'est pas physiquement là... Voilà. Il faut faire attention à l'aspect accident qui peut vraiment mettre en difficulté la situation et que... Sans parler de contrôle, mais... Les déplacements prévisibles... Enfin, voilà. Pour avoir fait régulièrement des déplacements, moi, je garde les dimanches, je refais encore régulièrement. Je viens à 1h, je marque à 1h, je viens pas, je viens pas, je marque pas. Je me connecte de la maison à 1h30, je les marque, je me connecte pas, je marque pas. Puis, c'est effectivement... 
CAV : 
C'est la discordance du temps passé, effectivement... qui va dépasser, effectivement, avec des soirées ou des temps déclarés jusqu'à minuit ou à partir de 7h du matin qui alertent les contrôleurs. C'est évident. Ça saute tout de suite. 
FGA : 
On le déclare pas quand on reste jusqu'à 20h, en fait. Tu vois ? Ou quand tu arrives à 7h parce qu'il y a une réunion, qu'il faut arriver très tôt, etc. À quel moment tu le déclares ? CAV :
 C'est pas nous qui faisons les statuts, malheureusement. On pointe pas, c'est injuste, mais c'est la raison pour laquelle il y a une mission IGAS de revalorisation. Mais au 1er juillet, il y aura une revalorisation de temps à temps. C'est pas défini. 
FGA :
Ah ouais, mais ça, c'est... C'est une vision très variable, en fait. 
CAV :
Ça, c'est notre vie depuis... Mais c'est pas nous qui décidons ça. C'est la raison pour laquelle on n'est pas maître là-dessus. Et que... La question de télétravail en Astreinte, ça va se poser. Mais ça sera au 1er juillet, et c'est défendu par... Et ça sera une décision ministérielle avec un décret. Mais effectivement, voilà, il faut qu'on puisse justifier de rester dans les clous comme... 
FGA :
En tout cas, ce que je veux dire, c'est que je connais mon équipe médicale. Il y a des profils différents. Chacun apporte quelque chose, mais en tout cas, j'ai confiance en eux, ils sont présents, ils sont fiables, ils font des propositions de projets de formation toutes les semaines. Et voilà, j'ai beaucoup de chance. J'ai beaucoup de chance d'avoir une équipe avec des gens qui sont volontaires, qui sont impliqués, qui vont se former, qui ramènent de la matière à se nourrir intellectuellement et à repenser sans cesse ce qu'on fait, à se... Voilà. À requestionner, et ça, je pense que c'est... C'est très, très précieux. 
YLB : 
Vous avez beaucoup de chance, nous avons beaucoup de chance. 
FGA :
Ah oui, je pense. Oui, je pense aussi, oui. 
YLB : 
Moi, l'USP, j'ai été très, très marqué par ça. La fermeture de  l'USP, et quand je suis arrivé, il n'y a aucun jugement pour le fait s'il y a du chiffre, mais ça m'a énormément marqué. Et en plus, quand je regardais la cartographie, les nombres d'USP dans le cadre... 
FGA : 
Donc le fait que ça vive comme ça vit aujourd'hui, on peut le remplacer ainsi qu'avec notre équipe. Et l'équipe, soyons possibles.
YLB :
Non mais moi, je... — Derrière nous, les internes, il y a plein de choses où, effectivement, encore une fois, par les règles du jeu qui sont les nôtres, on est obligé de compter. Et Mme Curnier, elle a un rôle qui est ingrat, mais on est obligé de le faire. Les questions qu'elle vous pose sont pas agréables, mais on est obligé de le faire. 
FGA :
— Non mais je comprends. — Je peux avoir un rôle ingrat aussi vis-à-vis de mon équipe. Je comprends. — Mais les internes, je dirais que... 
YLB : 
Je dirais pas en contrepartie, mais on n'a jamais dit au corps médical qu'au-dessus de 80 internes, vous arrêtez, quoi. Voilà. C'est pour vous dire. On pense que c'est un investissement d'avenir, tout d'abord, et que c'est notre mission. On a un très très bel établissement. C'est la manière dont on porte aussi notre mission. Et puis derrière, on connaît la vie quotidienne des services. 
FGA :
— Oui, oui. — 
YLB :
C'est un effort de formation qui en a pu. Après, il y a la dimension territoriale. Déjà, avec hier, plus le territoire, plus Saint-Anne. Avec Saint-Anne, déjà, ce rang de fonctionnalité, c'est à peu près perfection. Et le reste qui va être dans la perspective du territoire, département, GHT, etc., il va falloir aussi réfléchir avec – je comprends bien – la dimension de formation, des tâches transversales qui paraissent pas, mais qui prennent du temps, et une dimension qui va falloir un petit peu retravailler par rapport à la formation et par rapport à ce type de réunion de réflexion. J'entends que c'est difficile à quantifier et à encadrer, à identifier de manière presque chiffrable. Mais pourtant, c'est une activité qu'il va falloir ou l'identifier si on est dans une action de territoire, de formation par exemple, et de dire que c'est une formation dans une organisation de notre structure de formation alliée. D'ailleurs, c'est le DPC, non ? – 
FGA :
Oui. Je vais vous en reparler, j'aimerais... – En partie. – Il y a un projet de développement du DPC. C'est via le DPC, je crois, que ça va se faire ? – Le DPC. Moi, j'ai assez... – Le DPC, soit pas. Il y a 10 qui existent, à l'époque. – Il y a un développement qui va se faire. – En fait, ça faute aussi de moyens. C'est-à-dire qu'en fait, à des moments, on n'était pas assez d'intervenants pour assurer le DPC, puisque le DPC, le format était à un jour et demi. Là, on l'a revu à un jour. Et pendant un jour, nous, c'est multiprofessionnel. Donc il y a médecins, psychos, cadres. Donc pendant une journée, tu détaches tous ces soignants. Et pourtant, cette DPC, elle est très précieuse.
. On l'a relancé. Donc c'est une heure et demie de réunion avec tous les partenaires, avec autant partage sur les projets communs sur le territoire que parfois des sujets très cliniques, en fait, sur des patients qui ont posé soucis. On est très en lien avec la cellule d'animation de soins palliatifs, là, qui vient. C'est le nouveau bébé de l'ARS en soins palliatifs. Elle est effictive depuis le mois de juillet. On l'avait présentée la journée du 9 novembre. Et elle est en lien avec nous. Elle fait vraiment le lien. Donc on est en collaboration étroite. Voilà. Après, il y a des choses à faire. On est en train de relancer la commission de soins palliatifs. Je pense qu'il s'agira d'élargir après sur le territoire. Je sais pas ce que t'en penses, mais ça serait peut-être une option. Le comité qu'il avait proposé, Julien, il avait élargi le comité, qu'il avait invité des collègues de guerre, etc. Ça avait assez bien fonctionné, en fait. 
SC :
Et une commission, ça peut être aussi une bonne façon de réunir et de mettre des perspectives communes, de répertorier nos outils et de renforcer nos relations, je pense. Sur l'astreinte territoriale, j'ai appris il y a peu, je sais plus comment et par qui, mais que c'était Beau Séjour qui l'avait récupéré. Enfin, il y a quelqu'un qui fait tout seul. FGA : 
A priori, c'est pas officialisé parce qu'on fait toutes les réunions avec BARDAGI et il dit que non, en fait. Alors c'est très compliqué parce qu'on lui a déjà posé la question. D'accord. On peut parler de cette permanence téléphonique. Je trouve que c'est important. En fait, je ne sais pas si vous pourrez être avec moi. Je crois que oui. Oui, le 14. La semaine prochaine. Finalement, après un an de proposition de cette permanence téléphonique en soins périodiques, il y a quelques équipes qui ont lancé la dernière. C'est le Vaucluse. Avec le docteur Prenant, on voulait en fait savoir comment ils avaient fait dans le Vaucluse. Voilà, on essaie de voir comment ils ont réussi à mettre en place les dispositifs parce qu'enfin, je pense qu'il faut pas. Il faut. Il faudra mettre en place cette permanence. C'est important, mais pour l'instant, on n'était pas. Je pense qu'on n'était pas. Peut-être qu'on s'est mal pris. Je sais pas. En tout cas, il y a cette réunion proposée par l'ARS la semaine prochaine.
YLB :
 Quand vous dites  ARS , qui suit les dossiers ?
FGA :
. Je sais qu'il y a Crétel et on a été conviés à cette réunion pour être présente parce que on va avoir un retour en fait sur sur ses permanences téléphoniques voir comment ils ont mis en place des dispositifs, peut-être pouvoir s'en inspirer pour pouvoir la mettre en place. Je sais que dans le Vaucluse, les premières nouvelles qu'on a eues, c'est qu'en fait, il y avait un échantillon de médecins qui était énorme. Ils avaient 15 médecins, 12, 15 médecins. En plus, c'était je sais pas comment ils ont fait pendant 15 minutes. On va voir. Oui, mais en fait, certainement qu'il faut faire ça. C'est comme ça qu'on va y arriver. Pas possible d'être d'astreinte sur notre service une semaine d'astreinte sur en permanence téléphonique la suivante à partir d'une semaine sur deux. C'était la question, c'est-à-dire que les deux et qui n'est payé qu'une fois, soit si vous payez deux fois, il faut le faire sur un temps différent. En tout cas, on n'a pas réussi à se mettre d'accord. Au fur et à mesure de la proposition du dispositif, on a perdu. On a des gens qui sont désengagés, en fait, c'est-à-dire que de 10 ou 12 médecins au départ, à la fin, on était 4. Donc c'était pas possible. Anne-Sophie Sambarino, elle a définitivement quitté les soins palliatifs. C'était quelqu'un qui, potentiellement, faisait partie d'astreinte. Pour l'instant, on n'a plus de nouvelles. Donc ça, j'attends beaucoup de la réunion de la semaine prochaine pour voir ce qu'on peut se préparer. Alors moi, je me vois plutôt en auditrice pour voir ce qu'ont fait les autres et comment ils font pour s'en inspirer et peut-être poser des questions. 
FGA :  Et après, je crois que vous aurez tout échangé sur les sujets que je voulais évoquer avec vous. Les conventions avec les EHPAD, parce que l'ARS, ça fait un moment, en fait, historiquement aussi, alors je fais beaucoup, historique du service, mais en même temps, c'est un service que je connais depuis 12 ans. Historiquement, le poste supplémentaire, c'est-à-dire celui qui a occupé l'entreprise en Barénault, sur l'équipe mobile, avait été attribué par l'ARS pour ouvrir l'équipe mobile sur l'extérieur. 

Et du coup, on voulait, la volonté de l'époque était d'ouvrir sur les EHPAD pour poser des formations. Alors, on a fait quelques formations sans convention. Je ne sais pas pourquoi on n'arrive pas à signer des conventions. Il y a une centaine d'EHPAD dans la région, donc il faut aussi... Enfin, c'est compliqué. Mais en tout cas, des formations, de façon informelle, on en a proposé. Ce qu'on se rend compte, quand même, là, on va en refaire à côté, au Trône d'âme de la paix, on va faire quelques formations. Ils nous ont demandé, on a détaché un binôme pour aller voir l'équipe soignante. Mais à la fois, on se rend bien compte, pour avoir vu aussi la semaine dernière, les directeurs d'EHPAD, par un autre événement où j'étais invitée, qu'il y a une telle demande... C'est de la fin de vie gériatrique. C'est vraiment sur des choses très... très basiques de la fin de vie. Et en fait, j'ai... Moi, je veux... Je n'ai pas mon idée, en fait. C'est en en discutant avec mes collègues, je trouve que ça serait beaucoup plus cohérent de remettre la DPC en route et de l'ouvrir, en fait, en réservant, par session, 5 à 10 places pour des libéraux, parce que ça fait partie aussi d'une mission, et pour des soignants des EHPAD, et de les intégrer, en fait, à notre DPC, qui est un dispositif qui fonctionne, moyennement... Enfin, c'est une formation qui est validante. Moi, je pense que c'est... Voilà. Oui. Et je trouve que ça, ça paraît réalisable. Alors, je sais que ce n'est pas évident. Quand on appelle l'organisme de formation, ce qu'on nous a répondu pour le moment, c'est pas mal Marie-Louise qui s'en est occupée. C'est vous qu'elle a appelée ? Oui. Voilà. Je vous laisse... 
SC : 
En fait, travailler gratuitement par les temps qui courent, c'est compliqué. Donc, faire des conventions sur le plan juridique, très bien, mais ça ne fait pas rentrer de sous dans nos caisses. Et faire valoir nos compétences aussi. Donc, j'étais moyennement enthousiaste à l'idée de développer des conventions. Par contre, effectivement, sur ouvrir l'action DPC, ben oui. Et c'est là-dessus qu'il faut s'orienter
FGA :
 Et alors, après, les conventions, c'est ce que demande l'ARS sur le bilan d'activité. Alors, il faut les conventions de partenariat.
SC :
 Après, on choisit ce qu'on veut dans les conventions. Oui, les formations. Donc, si on demande en contrepartie un engagement d'inscrire des soignants à la DPC.Ça, ça peut faire partie d'une convention, d'accueillir les professionnels. 
FGA : Et sur Jeanne Garnier, ils font une formation sur deux jours pour... Je ne sais pas comment définir. C'est une formation soignants référents, en fait. Donc, les soignants vont faire cette formation de deux jours. Ils ont besoin de faire un stage. Donc, on a eu des stagiaires dans l'interview. Vous voyez combien ils ont dû la formation, si vous voulez. Encore une fois, je ne suis pas... 
CAV : 
C'est pour ça que ce que dit Madame Curnier, c'est qu'en fait, si tu veux, de l'autre côté, et ça, c'est de notre vision administrative, ce qui est compliqué, c'est que, bien sûr que c'est super, mais si les conventions ne servent que à leur donner un label pour leur cocher une case et que nous... Il faut qu'il y ait un engagement de leur part de former leurs soignants. Oui, mais il faut que ça rend... Enfin, il faut que nous, il y ait un bénéfice. Il faut que ça soit, pour dire de façon un petit peu cavalier, il faut que ça soit win-win, quoi. Voilà. Mais sur une convention, ça, c'est écrit, ça ? Oui. Donc... Mais c'est ça. Soit c'est DPC, quelques... 
SC :
Voilà. Il faut qu'il y ait un spécialisé dans ça. Il faut qu'il paye. Ça ne peut pas forcément être des... Voilà. Ça ne peut pas forcément être des conventions individuelles. Ça peut être qu'on a une offre, ils s'inscrivent, et voilà. Mais pas... Parce qu'autrement, on va faire, effectivement, sans convention, avec tous les avancements, alors qu'en fait, c'est leur démarche à eux. 
YLB : en direction des EHPAD, oui. Monsieur Pavillon ici qui coordonne tout ça. On a plein de conventions avec eux. Et à chaque fois, c'est sur des actions qui ont été préparées de longue date et où il y a un support de projet très clair. Le vôtre a l'air d'être très clair, mais il y a, y compris le volet de financement qui est calé. Donc là, par exemple, on a une équipe géométrique extra-hospitalière qui va enfin pouvoir démarrer, parce qu'on a les ressources. Mais elle est financée, quoi. D'ailleurs, on avait le financement, on n'arrivait pas à la démarrer. Mais voilà, c'est tout. Il faut simplement mettre toutes les pièces du puzzle dans le bon ordre. 
FGA :
Après, l'ouverture aux EHPAD, c'est notre mission. C'est très clair. Après, il faut simplement qu'on trouve les bons moyens et les bons supports. 
YK : OK ? Bon, on voit pour l'hôpital du jour ? Est-ce qu'on garde le jeune FST ou pas ? 

SC :
 Il ne faudra pas demander un arbitrage de notre direction générale et de la gouvernance médicale aujourd'hui. Non, mais c'est pour avoir un délai. Mais ça fait partie des projets. Il y a peut-être des arguments complémentaires à amener, tels que du benchmark où ça se fait ailleurs. 
FGA : J'ai entendu ce terme. J'aimerais bien savoir comment ça s'écrit, ce que c'est. 
SC :
B-E-N-C-H-M-A-R-K. Alors, c'est un anglicisme. 
YLB :
Parengonage, disent les Québécois. C'est aller voir ailleurs pour voir ce qui se passe. Une liste comparative. On va voir un échantillon. Et du coup, vous allez dans une autre USP, dans une autre équipe. C'est ce que l'on doit faire normalement systématiquement. On regarde comment font les autres et on s'améliore. C'est toujours instructif. Et puis, quand on doit porter des arguments, notamment à l'ARS, mais en interne, c'est intéressant de dire qu'on l'a fait parce qu'on s'est aussi renseigné sur ce qui se fait ailleurs. Donc, il y a ces éléments-là, peut-être, à compléter. Revoir avec M. Doumail des éléments d'activité, éléments financiers. C'est toujours intéressant puisqu'il y avait une EME qui a été consentie. Derrière, des engagements pris. Bon, alors, il faut peut-être faire un prix aussi là-dessus. Et se donner un temps de revoyure. 
Quand les compléments sont apportés. 
FGA :
Pour le benchmark, je fais toujours partie de l’APSP, l'Association Générale des soins palliatifs. Là, tout le monde. Bon, là, je peux pas y aller, mais en tout cas, j'ai la mailing list. Si vous pouvez avoir des infos dans ce cadre-là. Oui, après, l'idéal, c'est d'y aller. CAV :
Mais après, c'est dans chaque établissement à son projet d'établissement. Donc, en fait, je pense que c'est même. Ils ont des publications. Quand on avait écrit, quand on avait fait le difficile travail de se lancer sur l'écriture du projet médical. Il y a énormément d'établissements qui publient en accès totalement libre. Non, mais oui, mais il y a des trucs très, très détaillés. On peut être surpris. 
YLB : Les données sur les personnels médicaux, c'est quasiment le secret bancaire en Suisse. 
CAV : 
Mais alors, ceux qui ne marchent pas bien publient pas. Mais alors, ceux qui marchent bien publient. Donc, on peut déjà au moins voir où est le Graal. Et puis après, d'essayer de creuser ce qui est en dessous.

FGA : Donc, on se donne quel délit? Le docteur Hugonot est à la réunion, je crois. Oui, alors il savait qu'on se voyait aujourd'hui. Voilà, moi, je peux donner un délai, mais il a sûr qu'il attend des nouvelles.
SC :  Ça a été parlé avec la plus haute  gouvernance. Ça doit encore s'objectiver. De toute façon, il y aura. Il y aura, s'il tentait que ce recrutement soit validé. Une autre question qui se posera immédiatement derrière. C'est sous quel statut? Parce que là, il ne peut être que contractuel vu qu'on n'a pas de support pour un poste de PH. Donc après, peut-être, peut-être qu'est-ce qu'il veut? Qu'est-ce qu'il s'y attend? Mais là, pour l'instant, on en est à discuter du support financier. Et donc savoir si l'établissement peut faire cet effort ou pas. Moyennant quel est le résultat? Parce que les lignes, apparemment, aussi, sont challengées. Donc fin mars, on se dit ça? 
FGA : Fin mars, c'est à dire qu'il faut ramener tous les éléments benchmark, etc. D'ici là. D'accord.
`

document.getElementById("btn").addEventListener("click" , async function(){
    console.log(responseStatus)
    const MistResponse = await mistral();
    console.log(MistResponse)
    document.getElementById("txt").innerText = MistResponse
})

export {responseStatus}
