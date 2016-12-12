//Q1. Create a simple object literal to represent a cake. The object should have properties for name (a string), layers (a number), and ingredients (an array of strings). It should have single method, bake(), that should return a string using the name value e.g. 'The sponge cake is baking'. Assign the newly created object to a variable named myCake. 

//Q2. Create a simple object literal to represent a footballer assign it to a variable named myPlayer. The object should have properties for firstName (a string), lastName (a string) and shirtNumber (a number). It should have two methods dribble(), and shoot() these should return simple strings using the firstName and lastName properties e.g. "David Batty is shooting" and "David Batty is dribbling"

//Q3. Create a factory function that will create instances of cake objects. The factory function should be named cake, it should accept three arguments and return an object featuring the same properties and methods as in Q1. 

//Q4.Create a factory function to create instances of football player objects. The factory function should be named footballer. The factory function should accept an object literal to specify values for the object properties. e.g. var player=footballer({firstName:"David",lastName:"Batty",shirtNumber:4}) and return an object featuring the same properties and methods as in Q2.


//Q5. Modify the above so that default values are used for firstName, lastName and shirtNumber if any of these values properties aren't specified. 

//Q6. Make the factory function add a third method pass(). The pass method should accept another footballer object as an argument.The method should then return a string stating the pass has happened in the form '[player1 fullname] has passed to [player2 fullname]' e.g. 'David Batty has passed to Tony Dorigo'
