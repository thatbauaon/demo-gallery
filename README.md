## Getting Started

# Gallery Mosaic
Language: TypeScript
NodeVersion: v20.9.0

CSS: Tailwind
CSS Framework: DaisyUI

# Sorfware Architecture

---
title: Animal example
---
classDiagram
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }


```sh
architecture-beta

group api(server)[Server]

group docker(server)[Docker] in api

service nextjs(logos:nextjs)[NextJS] in docker
service nginx(logos:nginx)[Nginx] in docker


service internat(internet)[Internet]
service client1(logos:nginx)[Client]

client1:L <--> R:internat
internat:L <--> R:nginx
nginx:L <--> R:nextjs

```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Deploy

# login for pull image

```sh
docker login registry.gitlab.com
```

# build image

```sh
docker build --platform linux/amd64 -t sasukefc/demo-gallery:v1 .
```

# push image to registory

```sh
docker push sasukefc/demo-gallery:v1
```
