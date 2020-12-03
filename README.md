# Kevin's Calculator
## Vanilla Javascript App

<br>

_This is a simple calculator with a running total and memory options_

<br>

Try it [here](https://kbiz65.github.io/calculator/)

<br>

<image src="calc-screenshot.png">

## Summary

This calculator app is a great example of something that seems like it should be really simple but it's far from it. Not only is there quite a bit of work involved just to make it look like a calculator on the screen, mathematical order of operations threw me for a loop. Trying to get a running tally while having to follow proper order of operations proved to be a little more complicated than I thought.

The best part about building this app, that took me about 1 1/2 weeks, is that it forced me to spend a lot of time in the planning and whiteboarding stage as opposed to jumping in too quickly. I was forced to come up with an algorithm to figure out how to manage the calculations and then choose a data structure that best fit it.

I'm really happy with how this turned out from both a visual user design to the functionality working well.

## My Algorithm
Since there are no parenthesis or exponents on this calculator I found that there would never need to be more than 6 items involved in a calculation at a time. When calculating a running total, the first two numbers can only ever be calculated immediately if they are being multiplied or divided. If they are being added together or subtracted we would need to see what the next operator would be. This is due to the potential for the user to multiplying the second two numbers entered. For example: 2 + 3 x 2 = 8, not 10, due to the order of operations. 

When I saw this pattern I realized I could use a simple array and just calculate as needed within the array. Once I had this algorithm I was able to write the actual code fairly quickly (minus a few bugs here and there I needed to resolve).

## Author

* **Kevin Bisner** - *Full-Stack Software Developer* - [Website](http://www.kevinbisner.com) | [LinkedIn](https://www.linkedin.com/in/kevinbisner/)
