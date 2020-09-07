# Gateways Management Demo

## Technologies involved

- GitHub
- NextJS
- TailwindCSS
- MongoDB Atlas
- Vercel

## Database

- MongoDB Atlas database with a collection called **gateways**. You can import the file **gateways_collection.json** located on the root folder of this repo.

## Local instalation

1. Clone the repo.
2. Run the following command inside the folder of the repo: `npm i`.
3. Create an **.env.local** file inside the folder of the repo with the following code: `MONGODB_URI=xxx` where **xxx** is the provided MongoDB uri.

## Run the project locally

1. Run the following command inside the folder of the repo: `npm run dev`.

## Deployment

1. Update your repo on Github.
2. Sign up on [Vercel](https://vercel.com/) and follow the instructions to deploy a project from your GitHub repo, remember to config the environment variable as well.
