function getObjectDetails(obj)
{
  numProperties=0;
  numMethods=0;
  for(attr in obj)
  {
    if(typeof obj[attr] == "function") 
    {
      numMethods++;
    }
    else
    {
      numProperties++;
    }
  }
  return {props:numProperties,methods:numMethods}
}

describe("Q1. The myCake object", function() {
  it("should have three properties", function() {
      expect(getObjectDetails(myCake).props).toEqual(3);
  });

  it("should have a single method", function() {
      expect(getObjectDetails(myCake).methods).toEqual(1);
  });

  it("should have a string property named name", function() {
      expect(myCake.name).toBeDefined();
      expect(typeof myCake.name).toEqual('string');
  });

  it("should have a numeric property named layers", function() {
      expect(myCake.layers).toBeDefined();
      expect(isNaN(myCake.layers)).toEqual(false);
  });

  it("should have an array property named ingredients", function() {
      expect(myCake.ingredients).toBeDefined();
      expect(Array.isArray(myCake.ingredients)).toEqual(true);
  });

  it("should have a method named bake that should return a string", function() {
      expect(myCake.bake()).toEqual('The '+myCake.name+" cake is baking");
  });
});

describe("Q2. The myPlayer object", function() {
   it("should have three properties", function() {
      expect(getObjectDetails(myPlayer).props).toEqual(3);
  });


  it("should have a string property named firstName", function() {
      expect(myPlayer.firstName).toBeDefined();
      expect(typeof myPlayer.firstName).toEqual('string');
  });

  it("should have a string property named lastName", function() {
      expect(myPlayer.firstName).toBeDefined();
      expect(typeof myPlayer.firstName).toEqual('string');
  });

  it("should have a property named shirtNumber", function() {
      expect(myPlayer.shirtNumber).toBeDefined();
      expect(isNaN(myPlayer.shirtNumber)).toEqual(false);
  });

  it("should have a method named shoot that should return a string", function() {
      expect(myPlayer.shoot()).toEqual(myPlayer.firstName+" "+myPlayer.lastName+" is shooting");
  });

  it("should have a method named dribble that should return a string", function() {
      expect(myPlayer.dribble()).toEqual(myPlayer.firstName+" "+myPlayer.lastName+" is dribbling");
  });
})

describe("Q3. The cake factory function", function() {
  describe('when called with three arguments should return a new object ',function(){
      var newCake=cake("chocolate",4,["sugar","flour","butter","eggs","chocolate"])
      var props=getObjectDetails(newCake).props;
      var methods=getObjectDetails(newCake).methods;
      it("with 3 properties", function() {
        expect(props).toEqual(3);
      });
      it("with a single method", function() {
        expect(methods).toEqual(1);
      });
      it("with a  name property", function() {
        expect(newCake.name).toEqual('chocolate');
      });
      it("with a layers property", function() {
        expect(newCake.layers).toEqual(4);
      });
      it('with an ingredients property', function() {
        expect(newCake.ingredients).toEqual(["sugar","flour","butter","eggs","chocolate"]);
      });
      it("with a method named bake that should return a string", function() {
        expect(newCake.bake()).toEqual('The '+newCake.name+" cake is baking");
      });
    });

});

describe("Q4. The footballer factory function", function() {
  describe('When called with an single argument (a config object) should return a new object ',function(){
      var newPlayer=footballer({firstName:"Tony",lastName:"Dorigo",shirtNumber:3});
      var props=getObjectDetails(newPlayer).props;
      var methods=getObjectDetails(newPlayer).methods;
      it("with 3 properties", function() {
        expect(props).toEqual(3);
      });
      it("a firstName property", function() {
        expect(newPlayer.firstName).toEqual('Tony');
      });
      it("a lastName property", function() {
        expect(newPlayer.lastName).toEqual('Dorigo');
      });
      it('a shirtNumber property', function() {
        expect(newPlayer.shirtNumber).toEqual(3);
      });
      it("should have a method named shoot that should return a string", function() {
      expect(newPlayer.shoot()).toEqual(newPlayer.firstName+" "+newPlayer.lastName+" is shooting");
      });

      it("should have a method named dribble that should return a string", function() {
          expect(newPlayer.dribble()).toEqual(newPlayer.firstName+" "+newPlayer.lastName+" is dribbling");
      });
    });
});
describe("Q5. The footballer factory function when called with an argument of {} should return an object with default properties", function() {
  var newPlayer=footballer({});
  it("should have three properties", function() {
      expect(getObjectDetails(newPlayer).props).toEqual(3);
  });


  it("should have a string property named firstName", function() {
      expect(newPlayer.firstName).toBeDefined();
      expect(typeof newPlayer.firstName).toEqual('string');
  });

  it("should have a string property named lastName", function() {
      expect(newPlayer.firstName).toBeDefined();
      expect(typeof newPlayer.firstName).toEqual('string');
  });

  it("should have a property named shirtNumber with a value of 4", function() {
      expect(newPlayer.shirtNumber).toBeDefined();
      expect(isNaN(newPlayer.shirtNumber)).toEqual(false);
  });

  it("should have a method named shoot that should return a string", function() {
      expect(newPlayer.shoot()).toEqual(newPlayer.firstName+" "+newPlayer.lastName+" is shooting");
      });
    
  it("should have a method named dribble that should return a string", function() {
          expect(newPlayer.dribble()).toEqual(newPlayer.firstName+" "+newPlayer.lastName+" is dribbling");
  });

});

describe("Q6. footballer objects pass() method", function() {
  var player1,player2,player3,msg;

  beforeEach(function() {
    player1=footballer({firstName:"David",lastName:"Batty",shirtNumber:4});
    player2=footballer({firstName:"Tony",lastName:"Dorigo",shirtNumber:3});
    player3=footballer({});
    spyOn(player1, 'pass');
    player1.pass(player2);
  });

  it("should accept an object as an argument", function() {
    expect(player1.pass.calls.argsFor(0)).toEqual([player2]);
  });
  it("should return the string '[player1 fullname] has passed to [player2 fullname]' when passed a footballer object", function() {
    player1=footballer({firstName:"David",lastName:"Batty",shirtNumber:4});
    expect(player1.pass({firstName:"Tony",lastName:"Dorigo",shirtNumber:3})).toEqual('David Batty has passed to Tony Dorigo');
  });
});
