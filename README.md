<div align="center">
<img src="./DS9.png" alt="DS9 Logo" width="200" height="200">
<h3>Local Development Setup</h3>
<hr />
</div>


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

12. Copy the environment file:
    ```
    cp .env.example .env
    ```

13. Open the .env file and update any necessary configurations

14. Start Docker Desktop application

15. Start MongoDB and other infrastructure:
    ```
    docker-compose up -d
    ```

16. Install project dependencies:
    ```
    yarn
    ```
  - If this is not the first time running the project, If experiencing errors you may need to remove the node_modules folder and then run `yarn` again because there is a good change new packages have been added. If still experiencing issues, remove the yarn.lock file and try again. If still experiencing issues, please reach out to the DSS team.
  
    ```
    rm -rf node_modules
    yarn
    ```    

17. Generate GraphQL types (Only if you have changed the schema):
    ```
    yarn generate:types
    ```

18. Seed the database (optional):
    ```
    yarn seed
    ```

19. Start the GraphQL server:
    ```
    yarn start
    ```

20. The GraphQL Altair playground will be available at:
    ```
    http://localhost:4000
    ```

21. Generate a JWT token for testing:
    ```
    node generate-token.js
    ```

22. Steps to Use the JWT token to authenticate requests in the Altair playground (See notes below for more details):

  - Adjust the .env file and set the AUTH_STRATEGY to `jwt`.
  - Copy the JWT token
  - Click the first icon on the left bar in the Altair playground for headers
  - Click add new header 
  - For the key add: `Authorization`, for the value add: `Bearer <JWT token>`
  - Paste the JWT token into the textbox
  - Click Save and begin making requests


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

- Generate a JWT token for testing:
  ```
  node generate-token.js
  ```

# Dev notes


## GraphQL

Altaire GraphQL playground: http://localhost:4000

- Altaire is a more feature rich GraphQL client that can be used as an alternative to the built in GraphQL playground


Key benefits of using Altair:
- Rich feature set for testing and debugging GraphQL queries
- User-friendly interface with syntax highlighting and auto-completion
- Ability to set custom headers and variables
- Support for GraphQL subscriptions
- Offline access to schema documentation

To use Altair with this project, simply point it to the GraphQL endpoint: `http://localhost:4000`

This project includes an Altaire Collection located in: ds9-graphql-collection.agc

For more information on Altair, please visit: https://altairgraphql.dev/docs/features/documentation

To import the collection:

1. Open Altair
2. Click on the Collections tab
3. Click the Import button
4. Select the ds9-graphql-collection.agc file

## To run APIs

- Start MongoDB and other infrastructure:
  ```
  docker-compose up -d
  ```

- Start the GraphQL server:
  ```
  yarn start
  ```

# Auth Strategies

## Configuring for mock JWT strategy

- Adjust the .env file and set the AUTH_STRATEGY to `mock`.
- Add headers for `x-mock-role` and `x-mock-permissions`
  - `x-mock-role` can be set to `Admin` or `User`
  - `x-mock-permissions` is a comma separated list of permissions (Read, Write, Delete, Execute)


## Configuring Okta for Authentication 

- Modify the .env file with the correct Okta settings and set the AUTH_STRATEGY to `okta`.
- Create a new OIDC application in Okta with the following settings:
  - Authorization server: Use the default one
  - Grant type: Authorization Code
  - Redirect URI: http://localhost:4000/auth/callback
  - Response type: Code
  - Scope: openid profile email

---

# For Update history see link below

[Changelog](./CHANGELOG.md)
