---
title: "Sujet 11 — IA générative : la bataille autour des règles applicables aux grands modèles d'IA"
subtitle: "Partie 1 — Contexte et décision publique (Nhi)"
---

# 1. Contexte et décision publique

*Question directrice de cette partie : quel problème public a conduit l'Union européenne à réguler les grands modèles d'IA, par quelle décision, et qui l'a prise ?*

## Introduction

En moins de deux ans, l'intelligence artificielle générative est passée des laboratoires au grand public. Cette diffusion très rapide a posé aux pouvoirs publics européens une question inédite : comment encadrer une technologie capable de presque tout faire, alors que le texte en préparation avait été pensé pour des usages précis ? C'est autour de cette question que s'est jouée l'une des batailles de lobbying les plus intenses de la législature européenne 2019-2024.

## a) Le contexte : l'irruption de l'IA générative

Le 30 novembre 2022, OpenAI met en ligne ChatGPT. Selon une estimation de la banque UBS, l'outil atteint environ 100 millions d'utilisateurs en deux mois, ce qui en fait l'une des applications grand public à la croissance la plus rapide de l'histoire. D'autres outils suivent rapidement : Gemini (Google), Llama (Meta), ou encore les modèles de la start-up française Mistral AI, créée en avril 2023.

Ces outils reposent sur ce que l'on appelle des « modèles de fondation » ou, dans le vocabulaire juridique européen, des **« modèles d'IA à usage général »** (en anglais *general-purpose AI models*, ou GPAI). Il s'agit de modèles entraînés sur d'immenses quantités de données, capables d'accomplir un large éventail de tâches différentes (rédiger, traduire, résumer, coder, générer des images…) et pouvant être intégrés dans une multitude d'applications développées par d'autres entreprises.

Deux caractéristiques de ce marché sont essentielles pour comprendre la suite :

- **Une chaîne de valeur à deux niveaux.** En amont, quelques fournisseurs développent les modèles. En aval, des milliers d'entreprises les intègrent dans leurs propres produits (service client, outils de recrutement, applications médicales…). Les entreprises en aval dépendent donc d'informations que seul le fournisseur du modèle possède.
- **Un marché très concentré.** Entraîner un modèle de pointe exige une puissance de calcul, des données et des capitaux considérables. D'après l'*AI Index 2024* de l'université Stanford, l'entraînement de GPT-4 aurait coûté environ 78 millions de dollars en puissance de calcul, et celui de Gemini Ultra environ 191 millions. Seuls quelques acteurs, majoritairement américains, peuvent suivre ce rythme. En Europe, les rares concurrents sont Mistral AI (France) et Aleph Alpha (Allemagne).

## b) Le problème public : un vide juridique en pleine négociation

Lorsque ChatGPT apparaît, l'Union européenne est déjà en train de légiférer sur l'IA. Le **21 avril 2021**, la Commission européenne a présenté une proposition de règlement (COM(2021) 206) fondée sur une **approche par les risques** : les systèmes d'IA y sont classés selon leur usage, en quatre niveaux (risque inacceptable, donc interdit ; risque élevé, soumis à des obligations strictes ; risque limité, soumis à des obligations de transparence ; risque minimal, sans obligation particulière). La logique est de réguler les **usages**, et non la technologie elle-même.

Or les modèles à usage général ne rentrent pas dans ce cadre : par définition, ils n'ont pas un usage unique. Le même modèle peut aider un élève à réviser ou servir à produire de la désinformation à grande échelle. La proposition de 2021 ne prévoyait d'ailleurs **aucune règle spécifique** pour ces modèles. Plusieurs risques apparaissent pourtant clairement :

- **Désinformation et hypertrucages (*deepfakes*)** : textes, images, voix et vidéos de synthèse deviennent faciles à produire, au risque de manipuler l'opinion, notamment en période électorale.
- **Droit d'auteur** : les modèles sont entraînés sur des œuvres (articles, livres, images, musique) souvent utilisées sans autorisation ni rémunération des créateurs. En décembre 2023, le *New York Times* attaque ainsi OpenAI et Microsoft en justice.
- **Opacité** : on ignore souvent sur quelles données un modèle a été entraîné et comment il fonctionne, ce qui empêche les entreprises en aval, les autorités et les citoyens d'en évaluer les risques.
- **Biais et discriminations** : les modèles reproduisent les biais présents dans leurs données d'entraînement.
- **Risques « systémiques »** : pour les modèles les plus puissants, on évoque des risques à l'échelle de toute la société (aide à des cyberattaques, à la conception d'armes chimiques ou biologiques, perte de contrôle).
- **Impact environnemental** : l'entraînement et l'utilisation de ces modèles consomment énormément d'énergie.

Il s'agit bien d'un **problème public** : il ne concerne pas seulement les entreprises du secteur, mais aussi les citoyens, la démocratie, les créateurs, la concurrence et la souveraineté numérique de l'Europe. L'arrivée de ChatGPT a ouvert ce que le politiste John Kingdon appelle une **« fenêtre d'opportunité »** : le problème devient visible au moment même où un texte est en cours de négociation, ce qui permet de l'inscrire immédiatement à l'agenda.

Le problème se résume alors en deux questions, qui structurent toute la bataille :

1. **Faut-il réguler le modèle lui-même (en amont), ou seulement ses usages (en aval) ?**
2. **Jusqu'où réglementer les grands modèles d'IA sans freiner l'innovation européenne ?**

## c) La décision publique : le chapitre V de l'AI Act

La décision publique que nous analysons est le **règlement (UE) 2024/1689 du Parlement européen et du Conseil du 13 juin 2024 établissant des règles harmonisées concernant l'intelligence artificielle**, plus connu sous le nom d'**AI Act** (ou RIA, « règlement sur l'intelligence artificielle »).

**Nature juridique.** Il s'agit d'un **règlement européen** : selon l'article 288 du Traité sur le fonctionnement de l'Union européenne (TFUE), il est obligatoire dans tous ses éléments et directement applicable dans les 27 États membres, sans transposition en droit national (contrairement à une directive). Il est adopté sur la base de l'article 114 du TFUE, relatif au marché intérieur. Conséquence importante pour notre sujet : comme une règle unique s'applique à toute l'Union, l'enjeu est maximal pour les acteurs concernés, et c'est à Bruxelles que tout se joue.

**Notre périmètre.** L'AI Act est un texte très vaste. Notre sujet ne porte pas sur l'ensemble du règlement (pratiques interdites, systèmes à haut risque, reconnaissance biométrique…), mais sur son **chapitre V, « Modèles d'IA à usage général » (articles 51 à 56)**, complété par :

- l'article 3, point 63, qui définit les modèles d'IA à usage général ;
- l'article 101, qui fixe les amendes applicables à leurs fournisseurs ;
- les annexes XI à XIII, qui précisent la documentation technique à fournir, les informations à transmettre aux entreprises en aval et les critères permettant de désigner un modèle « à risque systémique ».

**Ce que règle le chapitre V.** Il fixe les obligations des **fournisseurs** de grands modèles (OpenAI, Google, Meta, Mistral AI…) en distinguant deux catégories : d'une part, l'ensemble des modèles d'IA à usage général ; d'autre part, ceux qui présentent un « risque systémique ». Il prévoit également l'élaboration d'un **code de bonnes pratiques** (article 56) pour aider les fournisseurs à se mettre en conformité. Le contenu précis de ce compromis, et ce que chaque acteur a obtenu, sera analysé dans la partie 5.

**Les textes d'application.** La décision ne s'arrête pas au vote du règlement. Le **code de bonnes pratiques pour l'IA à usage général**, rédigé par des experts indépendants avec les parties prenantes, a été publié le **10 juillet 2025**, et la Commission a adopté des **lignes directrices** sur ces obligations le **18 juillet 2025**. La bataille d'influence s'est donc prolongée au stade de la mise en œuvre.

## d) Qui décide ? Les institutions et le calendrier

**Une procédure à trois acteurs.** L'AI Act a été adopté selon la **procédure législative ordinaire** (article 294 du TFUE), dite de « codécision » :

- La **Commission européenne** a l'initiative : elle rédige et propose le texte. Les commissaires concernés sont Margrethe Vestager, vice-présidente exécutive chargée du numérique, et Thierry Breton, commissaire au marché intérieur.
- Le **Parlement européen**, élu au suffrage universel, co-décide. Le dossier est suivi par deux commissions, IMCO (marché intérieur) et LIBE (libertés civiles), avec deux co-rapporteurs : Brando Benifei (S&D, Italie) et Dragoș Tudorache (Renew, Roumanie).
- Le **Conseil de l'Union européenne**, qui réunit les ministres des 27 États membres, co-décide également. Ses travaux sont conduits par la présidence tournante : française (1er semestre 2022), tchèque (2e semestre 2022), suédoise (1er semestre 2023), espagnole (2e semestre 2023) puis belge (1er semestre 2024). Il ne faut pas le confondre avec le Conseil européen, qui réunit les chefs d'État et de gouvernement.

Lorsque le Parlement et le Conseil ont des positions différentes, ils négocient avec la Commission lors de réunions informelles appelées **trilogues**. C'est dans ces trilogues que s'est jouée l'essentiel de la bataille sur les grands modèles.

**L'application.** Depuis l'entrée en vigueur du texte, c'est la Commission, à travers le **Bureau européen de l'IA** (*AI Office*, créé par une décision du 24 janvier 2024), qui contrôle et sanctionne les fournisseurs de modèles d'IA à usage général. Elle s'appuie sur le **Comité européen de l'IA**, composé de représentants des États membres, et sur un **groupe scientifique d'experts indépendants**, qui peut lancer des alertes sur les modèles présentant des risques.

**Calendrier de la décision.**

| Date | Étape |
|---|---|
| 21 avril 2021 | Proposition de la Commission (aucune règle spécifique sur les grands modèles) |
| 13 mai 2022 | La présidence française du Conseil introduit des dispositions sur l'IA à usage général |
| 30 novembre 2022 | Lancement de ChatGPT : le sujet s'impose dans le débat |
| 6 décembre 2022 | Orientation générale (position de négociation) du Conseil |
| 14 juin 2023 | Position du Parlement (499 pour, 28 contre, 93 abstentions), qui ajoute des obligations pour les « modèles de fondation » ; début des trilogues |
| 6-8 décembre 2023 | Trilogue final sous présidence espagnole : **accord politique** dans la nuit du 8 décembre (moment clé, voir partie 4) |
| 2 février 2024 | Les 27 États membres approuvent l'accord à l'unanimité (Coreper) |
| 13 mars 2024 | Vote final du Parlement européen (523 pour, 46 contre, 49 abstentions) |
| 21 mai 2024 | Adoption définitive par le Conseil |
| 13 juin 2024 | Signature du règlement |
| 12 juillet 2024 | Publication au *Journal officiel de l'Union européenne* |
| 1er août 2024 | Entrée en vigueur |
| 10 juillet 2025 | Publication du code de bonnes pratiques pour l'IA à usage général |
| 2 août 2025 | Application des obligations des fournisseurs de modèles d'IA à usage général |
| 2 août 2026 | La Commission peut infliger des amendes aux fournisseurs de ces modèles |
| 2 août 2027 | Date limite de mise en conformité pour les modèles mis sur le marché avant le 2 août 2025 |

En 2026, l'« Omnibus numérique » sur l'IA (règlement (UE) 2026/1744) a reporté l'application de certaines règles, notamment celles relatives aux systèmes à haut risque, mais a laissé pour l'essentiel inchangées les règles applicables aux modèles d'IA à usage général. Notre sujet porte donc sur des règles aujourd'hui pleinement en vigueur.

## e) Conclusion de la partie et problématique

Le contexte est donc celui d'une technologie nouvelle, très puissante et dominée par quelques acteurs, qui surgit en pleine négociation d'un texte qui n'avait pas été conçu pour elle. La décision à prendre dépasse la simple question technique : elle détermine qui portera les obligations, qui en sera exempté, et quelle place l'Europe pourra occuper dans la course mondiale à l'IA. Par ailleurs, la procédure européenne offre plusieurs portes d'entrée aux intérêts organisés : la Commission, le Parlement et le Conseil, et, à travers ce dernier, les gouvernements nationaux.

D'où notre problématique :

> **Qui a réussi à peser sur les règles applicables aux grands modèles d'IA dans l'AI Act, et par quels moyens ?**

Pour y répondre, nous analyserons d'abord les enjeux de cette décision (partie 2), puis les acteurs et leurs positions (partie 3), le déroulé de la bataille et les actions de lobbying (partie 4), avant de dresser le bilan du compromis et d'en tirer des enseignements sur les méthodes et l'efficacité du lobbying (partie 5).

## Sources (partie 1)

- Règlement (UE) 2024/1689 du Parlement européen et du Conseil du 13 juin 2024 (AI Act), *Journal officiel de l'UE*, 12 juillet 2024 — EUR-Lex : https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=fr
- Commission européenne, Proposition de règlement établissant des règles harmonisées concernant l'intelligence artificielle, COM(2021) 206 final, 21 avril 2021.
- Conseil de l'UE, « Artificial intelligence – timeline » : https://www.consilium.europa.eu/en/policies/artificial-intelligence/timeline-artificial-intelligence/
- Parlement européen, communiqué de presse du 13 mars 2024 sur le vote final de l'AI Act ; voir aussi Siècle Digital, 13 mars 2024 : https://siecledigital.fr/2024/03/13/le-parlement-europeen-adopte-lai-act/
- AI Act Service Desk (Commission européenne), calendrier de mise en œuvre de l'AI Act.
- Commission européenne, Code de bonnes pratiques pour l'IA à usage général (10 juillet 2025) et lignes directrices sur les obligations des fournisseurs (18 juillet 2025).
- Future of Privacy Forum, « The AI Act implementation timeline: what changes under the AI Omnibus? » : https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus/
- Stanford HAI, *AI Index Report 2024* (coûts d'entraînement des modèles).
- Reuters, 2 février 2023 (estimation d'UBS sur les utilisateurs de ChatGPT).
- John W. Kingdon, *Agendas, Alternatives, and Public Policies*, 1984 (notion de « fenêtre d'opportunité »).
