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

12. Install project dependencies:
    ```
    yarn
    ```

13. Generate GraphQL types:
    ```
    yarn generate:types
    ```

14. Seed the database (optional):
    ```
    yarn seed
    ```

15. Start the GraphQL server:
    ```
    yarn start
    ```

16. The GraphQL playground should be available at:
    ```
    http://localhost:3001/graphql
    ```

# Additional Commands

- Lint the project:
  ```
  yarn lint
  ```

- Run tests:
  ```
  yarn test
  ```

- Build the project:
  ```
  yarn build
  ```

- Run end-to-end tests:
  ```
  yarn e2e
  ```

# dev notes

## GraphQL

GraphQL playground: http://localhost:3001/graphql

## To run APIs

- Start MongoDB and other infrastructure:
  ```
  docker-compose up -d
  ```

- Start the GraphQL server:
  ```
  yarn start
  ```
