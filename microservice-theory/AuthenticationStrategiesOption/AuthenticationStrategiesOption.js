/*
    *** Authentication Strategies and Option ***
*/
/*
    *** Fundamental Authentication Strategies ***
        => Individual services rely on the auth service:
        The idea is that we are going to allow individual
        services to rely on some centralized authentication
        service to decide whether or not a user is logged in.

        => Individual services rely on the auth service as a gateway: any request coming into our application would need to go through some central gateway of sorts
        that would authenticate the incoming request.

        => Individual services know how to authenticate a user
      
    Note that: In the world of microservice, sync refers to a 
    direct request from one service to another, one that does 
    not make use of events or event buses or anything like that.
*/

/*
    *** So Which Option ***
        Fundamental Option #1(Individual services rely on the auth service)
    => benefits: any time we made changes to our authentication
    state or the access of a user, it would be immediately reflected throughout the rest of our cluster or throughout the rest of our services.
    => cons: Auth service goes down? Entire app is broken

        Fundamental Option #2(individual services know how to authenticate a user)
            => benefits: if the service ever went down, who cares, does not matter, Our other services exits.
            Our other services do not even have to understand that the authentication service exits.
            => Downside: if some user ever got banned there is going to be a window or a period of time where we were going to continue to trust that user was actually signed in.
*/
/*
    *** Requirements for Our Auth Mechanism ***
        => Must be able to tell us details about a user(may be user ID, their email, or something)
        => Must be able to handle authorization info.(whether or not this person is an admin, a normal user or something else)
        => Must have a built-in, temper resistant way to expire or invalidate itself.(a user should not be able to modify around with this or flow us to expire or invalidate that auth mechanism automatically without us having to reach out to a user's browser or something like that because we can not do that and try to invalidate their auth mechanism)
        => Must be easily understand between different language.
        => Must not require some kind of backing data store on the server.
*/