# library App Back-end

This code sources are for the banckend of this app

## How should this be tested

- Open the project and in the terminal at the root folder, run `yarn install`
- After the node-modules have installed, open `.env.example` and create and copy their content into a `.env` file.
- Fill all those environment variables with their correct values
- Run `yarn dbmigrate:all` to seed the librarian into the database, This will delete all previous data from the database
- If you wish to keep your data:

  - run first `yarn dbmigrate` to update the database on the new change in the models
  - run then `yarn seed` to seed your new data in the database

- Finally, run `yarn dev` to start app in development mode
- run `yarn build` to build for production mode
- run `yarn start` to in production mode
