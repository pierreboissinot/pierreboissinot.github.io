---
title: 2 containers 1 blog
date: "2017-01-01T22:12:03.284Z"
description: ""
---


Dans ce premier post, je vais expliquer comment, avec les bons outils, monter rapidement un blog simple.

## Ce que je souhaite
> Mettre en place un blog simple pour partager des posts.

## Ce dont je dispose
Pour que la mise en place du blog me coûte le moins possible, je suis parti de ce que je possédais déjà, à savoir une machine chez Online.net sous CoreOS, idéal pour gérer des containers avec [Docker](https://www.docker.com/).

## Ce dont j'ai besoin
* une plateforme de blogging depuis laquelle **éditer** et **poster** des posts.
* un reverse proxy La machine hébergeant déjà plusieurs containers sur des ports différents, il me faut un outil qui redirige les requêtes du client vers le bon container. En revanche si ma machine était dédiée à héberger uniquement le blog, j'aurais pu me passer de reverse-proxy.
* certification TLS.

## Les outils sur lesquels je me suis penché
* [Wordpress](https://fr.wordpress.org/) car CMS le plus connu et que j'avais déjà utilisé il y a un moment pour un site vitrine. Cet outil présente deux inconvénients pour moi. D'une part il est lourd et complexe, c'est bien pour ça qu' on peut faire n'importe quel type de site avec la pléthore de plugins à configurer. D'autre part ce n'est pas la stack avec laquelle je suis le plus à l'aise si je veux modifier un template par exemple.
* [Traefik](https://traefik.io/), un reverse-proxy français (cocorico). J'ai essayé et après avoir décortiqué la doc, j'ai réussi à rediriger le http(80) vers https(443) pluggé au container du blog avec le SSL qui va bien. Mais pour quelqu'un comme moi qui n'avait jamais touché un reverse-proxy et qui n'a pas besoin de loadbalancing, cet outil est bien plus que ce qu'il me faut.

## Les outils choisis
* [Caddy](https://caddyserver.com/), un web server qui fait office de reverse-proxy et gère automatiquement la certification TLS (merci [Let's Encrypt](https://letsencrypt.org/)).
* [Ghost](https://ghost.org/fr/), un outil de blogging dont la stack est orientée autour de NodeJS et qui utilise le Markdown pour éditer les posts. De plus les thèmes sont facilement customizables grâce à [HandleBars](http://handlebarsjs.com/).



Après avoir fait mes courses sur le [Docker Store](https://store.docker.com/), ma recette se compose des deux containers suivants:
* [ghost](https://store.docker.com/images/57aa97f1-9868-4936-906c-b83d78cfaf4f?tab=description)
* [abiosoft/caddy](https://store.docker.com/community/images/abiosoft/caddy)

## En pratique
Commençons par créer sur la machine host les dossiers et fichiers suivants:
```bash
mkdir -p ~/docker-conf/caddy-ghost
mkdir -p ~/docker-data/ghost
mkdir -p ~/docker-data/caddy/.caddy
touch ~/docker-data/caddy/Caddyfile
```
Ces dossiers et fichiers seront liés à nos containers.
Pour ce qui est de la configuration des containers, j'ai choisi d'utiliser docker-compose, libre à vous d'utiliser docker si vous le souhaitez.
```bash
cd docker-conf/caddy-ghost
touch docker-compose.yml
```



Voici à quoi devrait ressembler la conf des containers dans le docker-compose.yml:
```yaml
version: "2.0"
services:
  ghost:
    image: ghost:latest
    volumes:
      - ~/docker-data/ghost:/var/lib/ghost
    environment:
      - NODE_ENV=production
    container_name: my-ghost

  caddy:
    image: abiosoft/caddy:latest
    volumes:
      - ~/docker-data/caddy/Caddyfile:/etc/Caddyfile
      - ~/docker-data/caddy/.caddy:/root/.caddy
    ports:
      - "80:80"
      - "443:443"
    links:
      - ghost:my-ghost
    container_name: my-caddy
```

Nous retrouvons les volumes précédemment créés. Notez que j'ai choisi de ne pas publier de port du container ghost à la machine host.

Désormais nous pouvons lancer nos containers via docker-compose up -d et vérifier que la configuration des containers est corrrecte (docker logs my-ghost et docker logs my-caddy).

### Paramètrage
#### Caddy
On renseigne les éléments suivants:
* le nom de domaine: pierreboissinot.net
* rediriger toutes les requêtes vers ghost:2368
* activer le tls et renseignet son email

vim ~/docker-data/caddy/Caddyfile

```
pierreboissinot.net {
    proxy / ghost:2368 {
          transparent
    }
    tls pierre.boissinot@outlook.fr
}
```

Attention à bien préciser le port :80 après le nom de domaine dans CaddyFile car le port par défaut est 2015 (notamment si vous êtes en localhost et que le tls est off)

#### Ghost
Dans config.js ajouter au niveau de la conf de production le bout de json suivant après server sans oublier la virgule (comme au niveau development). Définir aussi l'url de production 'https://pierreboissinot.net' vim ~/docker-data/ghost/config.js

```javascript
// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: 'https://pierreboissinot.net',
        mail: {},
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.GHOST_CONTENT, '/data/ghost.db')
            },
            debug: false
        },

        server: {
            host: '0.0.0.0',
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(process.env.GHOST_CONTENT, '/')
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368',

        // Example refferer policy
        // Visit https://www.w3.org/TR/referrer-policy/ for instructions
        // default 'origin-when-cross-origin',
        // referrerPolicy: 'origin-when-cross-origin',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.GHOST_CONTENT, '/data/ghost-dev.db')
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(process.env.GHOST_CONTENT, '/')
        }
    },

     // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://0.0.0.0:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.GHOST_CONTENT, '/data/ghost-test.db')
            },
            pool: {
                afterCreate: function (conn, done) {
                    conn.run('PRAGMA synchronous=OFF;' +
                    'PRAGMA journal_mode=MEMORY;' +
                    'PRAGMA locking_mode=EXCLUSIVE;' +
                    'BEGIN EXCLUSIVE; COMMIT;', done);
                }
            },
            useNullAsDefault: true
        },
        server: {
            host: '0.0.0.0',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://0.0.0.0:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '0.0.0.0',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://0.0.0.0:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '0.0.0.0',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: '2369'
        },
        logging: false
    }
};

module.exports = config;
```

Pour finir vous pouvez mettre à jour vos containers via docker-compose up -d.

Et voilà !
