
# Steps to get this working on the dev machine

1. installed x-code from self serve tool
2. installed XCode command line tools using terminal 
`xcode-select -install`
3. installed HomeBrew from self serve tool
4. created software install service request from the Heart icon from top right tool bar for docker desktop
5. Once service request is completed, installed Docker Desktop from self serve tool
6. Used the "advanced option" to Install Docker Desktop and unchecked anything that requires an "admin" password
7. added Docker install folder to .zprofile
add `$HOME/.docker/bin` to PATH
8. restart terminal

9. installed nmv using homebrew 
`brew install nvm`
- please make sure to add the nvm paths and env variables to .zprofile

10. setup node version
`nvm install lts/hydrogen`
`nvm use lts/hydrogen`

11. install yarn
`npm install --global yarn`

12. started graphQL server by 
`docker-compose up -d`
`yarn`
`yarn nx server apis`

13. the GraphQL playground should be avaiable at 
`http://localhost:3001/graphql`



# dev notes


## graphql

http://localhost:3001/graphql

--fe codegen

yarn nx codegen-generate frontend


## to run apis

- start mongo and other infrastructure
`docker-compose up -d`

- start the graphQL server
`yarn nx serve apis`
