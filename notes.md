

#Object Oriented Programming
An object is simply a collection of variables and functions that we group together. Objects allow us to deal with complexity in programs. They provide a way of organising and structuring code. 

##Simple objects
All the object we create are based on the *Object* this is a basic object that is built into JavaScript. When we create our own objects, essentially we are making a copy of this basic object and adding some extra stuff. Here's an example: 

```javascript
var anEmployee=new Object()
anEmployee.name="Jane";
anEmployee.wage=8.50;
anEmployee.calcWeeklyWage=function(hours){
    return hours*this.wage
}
```
Note the use of the keyword *this* in the calWeeklyWage function. It simply means the current object. To work with an object we use dot-notation syntax, *objectName.property* or *objectName.method()*. Here are some examples:

```javascript
console.log(anEmployee.name) //Jane
console.log(anEmployee.calcWeeklyWage(40)) //340
```

It is a bit more efficient to use the object literal notation.

```javascript
var anEmployee={
    name:"Jane",
    wage:8.50,
    calcWeeklyWage:function(hours){
        return hours*this.wage
    }
}
console.log(anEmployee.calcWeeklyWage(40)) //outputs 340
```
You will see this far more often than *new Object()*

##Creating Lots of Instances
If we only want to create a single instance of an object, the above is all we need to know. The complexity in OOP comes when we want to create several different instances of an object. If we take the approach shown above, creating lots of similar objects involves lots of duplicate code. Have a look at the following where there are two employee objects. 

```javascript
var anEmployee={
    name:"Jane",
    wage:8.50,
    calcWeeklyWage:function(hours){
        return hours*this.wage
    }
}
var anotherEmployee={
    name:"Pete",
    wage:7.50,
    calcWeeklyWage:function(hours){
        return hours*this.wage
    }
}

console.log(anEmployee.calcWeeklyWage(40)) //340
console.log(anotherEmployee.calcWeeklyWage(45)) //337.5
```
What if we had 100s of employee objects that we needed to create? There are many different approaches to this problem of how to efficiently create multiple objects of the same type. 

###Constructor Functions
You should be familiar with the idea of a constructor function. 

```javascript
function Employee(name, wage)
{
    this.name=name;
    this.wage=wage;
    this.calcWeeklyWage=function(hours){
        return hours*this.wage
    }
}
var anEmployee=new Employee("Jane",8.50);
var anotherEmployee=new Employee("Pete",7.50);
var oneMoreEmployee=new Employee("Zofia",14.00);
```

Several prominent JavaScript professionals don't like the use of the constructor pattern for a number of reasons. See Eric Elliott's http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/ for a detailed breakdown of the problem with constructor functions. One the key objections is that constructor functions are an attempt to mimic traditional object oriented languages and we need to think in a different way when programming JavaScript. Again see Eric Elliott's  http://chimera.labs.oreilly.com/books/1234000000262/ch03.html for a good explanation of 'fluent-style javaScript'.

###Factory Functions
So if we don't create object using the constructor pattern, what should we use? The answer is a factory function. A factory is simply a function that is used to create other objects. Here's an example:

```javascript

function employee(name,wage)
{
    var newEmployee={
        name:name,
        wage:wage,
        calcWeeklyWage:function(hours){
            return hours*this.wage
        }
    }
    return newEmployee;
}
var anEmployee=employee("Jane",8.50);
var anotherEmployee=employee("Pete",7.50);
var oneMoreEmployee=employee("Zofia",14.00);

```
On the face of it it may not seem that this is very different or advantageous to the constructor pattern. The strength of using factories comes through their flexibility. They allow us to create objects in many different ways using many different combinations of functions and properties. We'll see some examples later. 

###Configuration Objects
Here's another widely adopted good programming practice. It can apply to any function with multiple parameters. It is good to discuss it here because when we create objects we often call a factory function with lots of arguments. Imagine my employee objects are more complex and I need to specify values for four properties e.g. 

```javascript
function employee(firstName, lastName, wage, gender)
{
    var newEmployee=
    {
        firstName:firstName,
        lastName:lastName,
        wage:wage,
        gender:gender,
        calcWeeklyWage:function(hours){
            return hours*this.wage
        }
        
    }
    return newEmployee;
}

```

We might want to set some defaults for some of these properties, for example "unspecified" for the gender property. We can do this using the boolean OR (||)operator.

```javascript

function employee(firstName, lastName, wage, gender)
{
    var newEmployee=
    {
        firstName:firstName||"",
        lastName:lastName||"",
        wage:wage||8.50,
        gender:gender||"unspecified",
        calcWeeklyWage:function(hours){
            return hours*this.wage
        }
        
    }
    return newEmployee;
}

var anotherEmployee=employee("Pete","Jones"); //no argument specified for wage or gender
console.log(anotherEmployee.wage); //8.50

```

If the parameter is undefined i.e. it hasn't been assigned a value, the default value will be used. In this example there is no value specified for the wage parameter so 8.50 will be used. If I want to specify a value for the gender parameter but not wage I end up with something like this. 

```javascript
var anotherEmployee=employee("Pete","Jones",,"male"); //missing out wage
```

It causes an error, there is no way to specify the 4th parameter without specifying the others first. The solution is an object literal.

```javascript
function employee(config)
{
    var newEmployee=
    {
        firstname:config.firstname||"",
        lastname:config.lastname||"",
        wage:config.wage||8.50,
        gender:config.gender||"unspecified",
        calcWeeklyWage:function(hours){
            return hours*this.wage
        }
        
    }
    return newEmployee;
}

var anotherEmployee=employee({firstname:"Pete",lastname:"Jones",gender:"male"});
```
When the employee function is called an object literal is passed as an argument. It is assigned to parameter config. Config is then used to specify values for the object's properties. Not only does it mean we can specify optional parameters it also cleans up the code in the factory function. 

###Inheritance
Again you should be familiar with the idea of inheritance. It is a key object oriented programming concept that allows us to re-use code. It is fairly intuitive to understand here's a simple JavaScript example that uses constructor functions. 

```javascript
function Pet(name,breed)
{
    this.name=name;
    this.breed=breed;
    this.stroke=function()
    {
        return this.name+" is being stroked";
    }
    this.feed=function(food)
    {
        return this.name+" is eating "+food;
    }
}

function Dog(name, breed)
{
    Pet.call(this,name,breed); //call the parent (Pet) constructor
    this.fetch=function(item)
    {
        return this.name+" has fetched a "+item;
    }
}

function Cat(name,breed)
{
    Pet.call(this,name,breed); //call the parent (Pet) constructor
    this.scratch=function()
    {
        return this.name+" is scratching"
    }
}

var aDog = new Dog("Buster","Labrador");
var aCat = new Cat("Mackeral","British Shorthair");
console.log(aDog.stroke());
console.log(aCat.stroke());
console.log(aCat.scratch());
console.log(aDog.fetch("ball"));
console.log(aDog.feed("a bone"));

```

Whenever we create a Dog or Cat object, the first line of the constructor function is a call to Pet. This creates a Pet object that we then add extra methods to, *fetch* for Dog and *scratch* for Cat. Both Dog and Cat are based on Pet so they both have a *stroke* method and the *name* and *breed* properties. We don't have to duplicate the *stroke* function in the Dog and Cat constructors. We say that Pet is a parent class and Dog and Cat are child classes. 

Examples like this make the benefits of inheritance clear. An easy way to re-use code. 

###The problem with inheritance
Here's the problem with inheritance. A new requirement comes in for the application, some people have fish as pets. So we could do something like this.

```javascript
function Fish(name, breed)
{
    Pet.call(this,name,breed); //call the parent (Pet) constructor
    this.swim=function()
    {
        return this.name+" is swimming";
    }
}
```

On the face of it this looks fine. The problem is that we will inherit the *stroke* method from the parent Pet class. You can't stroke a goldfish! What we need is a more flexible way of re-using code to build objects. 

##Favour Composition Over Inheritance
The alternative to inheritance is composition. Essentially building an object from several different parts. Going back to the employee example, let's say we need manager objects. Based on what we have looked at so far, the following should make sense. 

```javascript


function manager(config)
{
    var newManager=
    {
        name:config.name||"",
        wage:config.wage||40,
        dept:config.dept||"Accounts",
        calcWeeklyWage:function(hours){
            return hours*this.wage;
        },
        attendMeeting:function(){
            return this.name+" is getting paid for not doing much";
        }
        
    }
    return newManager;
}

var aManager=manager({name:"Jane",wage:8.50,dept:"HR"});
console.log(aManager.calcWeeklyWage(20)); 170
console.log(aManager.attendMeeting()); Jane is getting paid for not doing much

```

It should also be clear that this code is very similar to code we used for creating employee objects (goes against the DRY principle). To re-use the code we can use composition. Have a look at the following:

```javascript
function employee(config)
{
    var newEmployee=
    {
        name:config.name||"",
        wage:config.wage||40,
        calcWeeklyWage:function(hours){
            return hours*this.wage
        } 
    }
    return newEmployee;
}
function manager(config)
{
    var newManager=employee(config); //first create a plain employee object 
    newManager.dept=config.dept||"Accounts"; //add additional properties
    newManager.attendMeeting=function(){ //add additional methods
        return this.name+" is getting paid for not doing much";
    }
    return newManager;
}

var anEmployee=employee({name:"Pete",wage:8.50})
var aManager=manager({name:"Jane",wage:8.50,dept:"HR"});
console.log(anEmployee.calcWeeklyWage(40))
console.log(aManager.calcWeeklyWage(20));
console.log(aManager.attendMeeting());
```

The manager object is built by first taking an employee object and then adding extra properties and methods. On the face of it, it might seem this is exactly the same as using inheritance via the constructor pattern. However, it gives us much more flexibility. Here's the pet example written using composition. See how the behaviour for furry pets has been put in it's own object. This means I can build a fish object that doesn't have a stroke method. 

```javascript
function pet(name)
{
    var newPet={
        name:name,
        feed:function(food)
        {
            return this.name+" is eating"+food;
        }
    }
    return newPet;
}
function furryPet()
{
    var newFurryPet={
        stroke:function(){
            return this.name+" is being stroked";
        }
    }
    return newFurryPet;
}
function dog(name,breed)
{
    var newDog=pet(name); //create a pet
    var newFurryPet=furryPet(); //create a furry animal 
    newDog.stroke=newFurryPet.stroke; //use the furry animal's stroke function
    newDog.breed=breed||"Staffordshire Bull Terrier"; //set breed

    newDog.fetch=function(item) //add a new function for dogs
    {
        return this.name+" has fetched a "+item;
    }
    return newDog;
}
function fish(name,breed)
{
    var newFish=pet(name); //create a pet
    newFish.breed=breed||"Goldfish"; //set breed

    newFish.swim=function(item) //add a new function for fish
    {
        return this.name+" is swimming";
    }
    return newFish;
}
var anAnimal=pet("Fred");
console.log(anAnimal);
var aDog=dog("buster","dalmatian");
aDog.name="rex";
console.log(aDog.stroke())
var aFish=fish("Flipper","Cod")
console.log(aFish.swim())

```
Hopefully you can see that this is a more flexible way of creating objects.

##A real example
So far all the examples are fairly abstract. Here's a simple example of how we could use object oriented programming in our applications. Validating form controls is a common task. We could build a simple validation object using the following code.

```javascript

function formValidator(formCtrlId)
{
    var formValObject={
        formCtrl:document.querySelector(formCtrlId),
        validate:function(){
            if(this.formCtrl.value.trim()!=="")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    };
    return formValObject;
}


var formVal=formValidator("#searchBox");


function processForm(){
    if(formVal.validate())
    {
        console.log("valid form, do some searching");
    }else{
        console.log("not valid");
    }
}
var searchBtn=document.querySelector("#searchBtn")
searchBtn.addEventListener("click",processForm, false);
```

In this example *formValidator* is a factory function that creates a form validation object. We simply call validate on this object to see if the specified form control has been completed. 

##Wait, there's more
One problem with learning advanced JavaScript features is there are lots of ways of doing the same (or similar) things. We have seen this already with the constructor pattern vs factory functions. This makes it difficult for beginners to learn because different examples use different syntax. Plus, techniques and good practices have evolved over time. The compositional approach used above is largely based on advice from Douglas Crockford. However, he has changed his approach over the years and it is still possible to view articles written by Crockford that use approaches he would now probably consider obselete. To make the situation even more complex in the latest version of ECMAScript we now have classes, similar to many other object oriented languages.

To get the whole picture on JavaScript objects (in ES5) you need to understand 

* Object.create()
* prototypes
* delegates

##Reading/references
* http://eloquentjavascript.net/06_object.html
* http://addyosmani.com/resources/essentialjsdesignpatterns/book
* http://chimera.labs.oreilly.com/books/1234000000262/ch03.html
* Douglas Crockford at Nordic.js 2014 https://www.youtube.com/watch?v=PSGEjv3Tqo0 