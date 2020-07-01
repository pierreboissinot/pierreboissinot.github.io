---
title: Devfest Nantes 2019
date: "2019-10-27T00:00:00Z"
description: "21 et 22 octobre 2019 à la Cité des Congrès de Nantes"
---

# Les stands

La moitié des stands présentaient des activités autour de la VR, peu d'originalité car nombreux étaient les stands à faire essayer du Beat Saber.

# Les conférences

Je n'ai assisté qu'à la journée du mardi, le devfest ayant commencé le lundi.

## Back in Black Hat : Comment se faire pogoter (hacker) bien comme il faut!

Présenté par  [Julien Topcu](https://twitter.com/JulienTopcu)

### En bref
A partir d'un projet demo e-commerce, Julien a fait une demo des 10 attaques les plus classiques et des plus faciles à se protéger.
Il a tenu un discours très parlant aux développeurs notamment sur le CRSF, protection que nous les développeurs désactivons parce que c'est embêtant en dev sans avoir conscience de l'énorme faille que cela implique. Ce genre de discours je l'ai encore entendu pas plus tard que vendredi dernier par un dev.

### Notes
- Accès en lecture de fichier en faisant référence à des fichiers via les external entities de XML

- Dependencytrack projet open source pour avertir les vulnérabilités des dépendances du code. Il y a souvent plus de vulnérabilités dans les dépendances  que dans le code projet

## Premiers pas avec un microcontrôleur et Google Cloud IoT Core

Présenté par [Gautier Mechling](https://github.com/Nilhcem)

### Notes
- esp32: microcontrôleur post ESP8266, plus petit, avec Wifi et BLE
- frizzing => export plaque PCB => service internet d'impression de PCB
imprimantes 3D
- iotcore utilise des standard du web et de l'open source (pas de sdk propriétaires google)
backend pour recevoir des données, utiliser une google cloud function pour intercepeter ce pub sub et stocker la donnée dans un firebase.
la rendre dans un firebase hosting.

## FPGA,  créer du matériel en programmant

Présenté par [Frédéric Bisson](https://github.com/zigazou)

REX très intéressant car j'ai senti Frédéric très passionné par ce qu'il partageait.

Un peu de mal à suivre pour un neophyte mais au moins j'ai découvert le FPGA.

### Notes
- fin de la loi de moore
- post cpu, nouvelle archi FPGA, racheté par altera pour 16Mds
- le cablage définit le fonctionnement, les composants restent les memes
- PLL: permet de varier la fréquence
- Les outils sont encore propriétaires
- 2 façon de programmer: dessiner un schéma ou utiliser un HDL ou OpenCl


## Build your own Knowledge Graph with Weaviate on GCP

Présenté par [Bob van Luijt](https://github.com/bobvanluijt)

### Notes
- Semi Technologies - Weaviate
- Problem to solve: on ne peut pas stocker une entité dans une table en bdd (nom, role, position social) car on perd les références
Comment connecter les entités entre elles ?
- Peut-on nous approprier la recherche google ? Par exemple nos recherches dépendent de notre geoloc
graph database: tout ce qu'on enregistre est un graph, mais un back end en graph demande beaucoup de puissance.
- Notion de contexte: placer les objets dans l'espace (apple, iphone, fruit ) à côté (mais France serait éloigné).
- GraphQl
- Classification
- P2P network: feature pas encore implémentée mais il serait intéressant que les graphs apprennnent les uns des autres
- les objets sont définis par des classes dont les propriétés sont en camelCase pour que les nom des propriétés puissent être "compris" et analysés par le graph


## WebAuthn: Le renouveau de l'authentification

Présenté par [Thomas Blaisot](https://github.com/tblaisot)

Frustrant car en 20 minutes Thomas n'a pas eu le temps de présenter entièrement les implémentations de cette norme à venir.

### Notes
- "passwordLess"
- se passer de gestionnaire de mot de passe => credential API
- OT password
- sans mot de passe car via clef privée/publique
- on envoit un login au serveur qui nous envoit un challenge,l'authenticator renvoit la signature, la pub key et l'id, que le serveur valide


## Comment le projet Euler m'as donné envie de refaire des Maths

Présenté par [Romain Ardiet](https://github.com/romibuzi)

### Notes
- Projet Euler: site qui propose des problème maths à résoudre via des programmes
- Travailler avec la complexité O, les structures de données.
- Bon challenge pour apprendre un nouveau language, plus pertinent qu'un hello word/todo app.
