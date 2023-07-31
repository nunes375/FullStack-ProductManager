# Full Stack ProductManager

This application callled "ProductManager" is a full-stack app with nodeJs, React and MongoDB. It's capable of showing the products in database to the user and also add, delete or update if needed.

## Guide to run application

1. Install dependecies by running both in "backend" and "frontend" folders terminal: 
``` 
npm install 
```

2. MongoDB Connection Setup:
- Create a .env file in the root of the "backend" folder and add the following line to it:
``` 
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority
```
- Replace 'username' and 'password' with your MongoDB Atlas cluster's username and password, respectively. Also, replace 'cluster-address' with the connection address for your MongoDB Atlas cluster and 'database-name' with the created database name.

- Make sure to add the .env file to your .gitignore to prevent sensitive information from being committed to the repository.

3. In the "backend" folder terminal run the following line:
``` 
npm run serve 
```

4. In the "frontend" folder terminal run the following line:
``` 
npm start
```

## Unit Test

1. Install Jest dependecies by running the following line in "backend" folder terminal:
``` 
npm install --save-dev jest
```

2. Install Supertest dependency in the same terminal:
``` 
npm install supertest --save-dev
```

3. To run the unit test file use the command:
``` 
npx jest
```

# Technologies used
-NodeJS -Express -MongoDB -React
