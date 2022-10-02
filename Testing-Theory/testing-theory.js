/*
    *** Testing Isolated Microservice ***
        * What's the scope of our tests *
            => Test a single piece of code in isolation(e. Single middleware. unit test)
            => Test how different pieces of code work together(Request flowing through 
                multiple middlewares to a request handler)
            => Test how different components work together(Make request to service , 
                ensure write to database was completed)
            => Test how different services work together.(Creating a payment at the payment service
                 should affect the orders service)

        Note that: if we want to test how the order service and the ticketing service interact with each other, we need to think about how to construct some kind of environment quickly and cost effectively to actually test.

        * Testing Goals *
            => Testing Goal ( Basic Request Handling): we might want to try to make sure that if we make a request to our service to sign up for something, we should get back a response with a cookie that has the JSON web token inside of it or we might want to try to assert that we write some data into our MongoDB database.

            => Some tests around models: the particular model inside of our app and try to test some functionality around it.

            => Event emitting and receiving inside of our service.
    
    => Jest: is the library that we are going to use to actually execute tests inside of our project.
            Jest Follow Work:
                => Start in-memory copy of MongoDB
                => Start up our express app
                => Use supertest library to make fake requests to our express app.
                => Run assertions to make sure the request did the right thing.

    *** Docker file: RUN npm install --only=prod : through this way we can avoid downloading mongo-server-memory that 80 mb file every single time we have to rebuild our image.

    *** package.json file ***
        => "test": "jest --watchAll --no-cached"
                "jest --watchAll":to tell it to run all the different tests inside of our project whenever any file changes.
                "--no-cached": is related to our attempt to try to use TypeScript with jest.

        
         "jest": {
            // installed a dependency called jest that is going to add TypeScript support for us.
            "preset": "ts-jest",
            "testEnvironment": "node",
            // we are going to tell jest to run a setup file inside of our project after it initially starts everything
            "setupFilesAfterEnv": [
            "./src/test/setup.ts"
            ]
        },

*/