
Name : Mohamed Abdelnaser Elsayed Mortada

Iti Minia branch 

Mearn 23-24 Q1 G2




--------------------Question 6--------------------

** what is the output of
    Console.log( [ ] == [ ] )
    Console.log( { } == { } )

        In both, we will get an error (Console is not defined) because js gives objects and arrays different references in head and == compare references.



--------------------Question 7--------------------

** what is the output of this code with explaination
        function main() {
            console.log("A");
            setTimeout(function print() {
                console.log("B");
                }, 0);
            console.log("C");
                }
            main();
            

        // First A, then B, and last C  because C gets in web APIS and then through Event Queue and waits to get into the execute stack.


--------------------------------Question 8--------------------------------
** what is the output of this code with explaination
    var num = 8;
    var num = 10;
    console.log(num);

        // The output will be 10 because in var declaration the variable is subject to hoisting (moved to the top of the scope either globally or locally). So when we declare the variable again in the same scope will overwrite the oldest variable with the newest one.

--------------------------------Question 9--------------------------------
** what is the output of this code with explaination
        function sayHi() {
            console.log(name);
            console.log(age);
            var name = 'Ayush';
            let age = 21;
        }
        sayHi();

        //The output will be:

        (undefined) For the name that's because var will be hoisting the variable to the top of the function scope but will not initialize it. so cnsole.log(name) is executed before the initialization of the value but it's declared (indefined not error). 

         (Cannot access 'age' before initialization) For age, that's because variables declared with let hoisted also but will not initialize until the statement of declaration is executed. In our code console.log(age) is executed before declaring and initializing the age, so it's in a temporal dead zone.



            
