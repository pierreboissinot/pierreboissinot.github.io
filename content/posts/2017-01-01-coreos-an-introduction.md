---
title: CoreOS, an introduction
date: "2017-01-01T22:12:03.284Z"
description: ""
---

Syntèse du talk de [Brandon Philips](https://twitter.com/BrandonPhilips).
[Lien vers le talk](https://www.youtube.com/watch?v=CESGogWbjeI)

Brandon Philips est CTO et co-fondateur de CoreOS, son travail en tant qu'ingénieur porte sur les systèmes distribués. Il participe aux projets open source associés (Kubernetes) qui ont pour but d'orchestrer des conteneurs docker.

## Un virage de concepts
Brandon Philips commence en rappelant que Google a publié un livre blanc en 2009, [The Datacenter as a Computer](https://research.google.com/pubs/pub35290.html), qui décrit l'infrastructure des datacenters non pas comme un groupe de serveurs physiques individuels mais comme un ensemble d'applications isolées fonctionnant sur des serveurs logiques multiples.

## Les conteneurs
Dans un premier temps, avant de présenter CoreOS, Brandon Philips rappelle ce que sont les conteneurs. Il s'agit d'un concept qui permet d'==isoler une application d'un système d'exploitation== et de sa machine hôte. On connaissait ce principe avec les conteneurs systèmes, telles que les machines virtuelles, et récemment on parle plutôt de conteneurs applicatifs ou logiciels. Le but d'embarquer une application dans un conteneur est de ne plus avoir de dépendances fortes avec son SE hôte. Cela permet également d'==isoler la consommation en ressources== des applications. L'outil qui a le vent en poupe pour gérer ces conteneurs applicatifs est le docker engine, qui permet de ==transporter ces conteneurs== d'une machine hôte à une autre.
Utiliser des conteneurs présente les avantages suivants:
* Découpler l'application de la couche système
* Transporter le conteneur d'un hôte à un autre (peu importe l'OS)
* Isoler les ressources entre les applications.



Il est ainsi possible de mettre à jour le système de sa machine hôte sans affecter les applications qu'elle héberge.

## CoreOS
Dans un second temps, Brandon Philips présente CoreOS. CoreOS est un système qui se met à jour automatiquement grâce à ses deux partitions systèmes. Ensuite, Brandon Philips répond à la question suivante: ==comment prévenir les problèmes liés à un dysfonctionnement sur l'hôte ?== Il propose de répliquer les données importantes autre part. L'outil etcd de CoreOS permet de répondre à ce besoin et de diminuer ainsi le downtime.

Par ailleurs, afin de prévenir des montées en charge et déployer un certain nombre d'instances d'un conteneur pour un certain temps, CoreOS a élaboré l'outil fleet. Ce dernier outil permet également de découvrir les services au sein d'un réseau.

En quelques mots, CoreOS est un système linux minimal conçu pour la conteneurisation des applications et la gestion de leur déploiement à grande échelle en proposant des outils d'administration tels que etcd et fleet.
