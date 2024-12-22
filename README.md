# week3-assignment

Cookie clicker for week 3 assignment

![image of wireframe](wireframe.png)

🎯 What requirements did you achieve?  
I managed to get all requirements completed.

🎯 Were there any requirements or goals that you were unable to achieve?  
After completing all the requirements I moved onto stretch goals. I really wanted to have sounds so that when a user clicks on the cookie it makes a click sound, most of the free click sounds was a little delayed or they needed to be chopped so that the empty sound is not as long but I didn't have the tools to do that.
Also the sound that plays when the user resets the cookie count works fine but if the user spams the reset button then it creates a new sound over the existing sound, my plan was to research more into that, but I thought I would carry on with more important things.

🎯 If so, what was it that you found difficult about these tasks?  
The stopping of the sound been played over and over again when user spams reset, I think could have been done by disabling the button for a few seconds after been pressed, I did look online and I read something about the button being async but that was a little more than I know, I know the basics of `async/await` in the scope of fetching data.

Another task that I found tricky was(and not quite managed to do yet) was resetting local storage, I knew how to reset using the button, but using the dev tools and clearing storage from there just kept pulling the data that was already on the screen at the time and I couldn't figure out if that was the correct behaviour or not.

### Stretch Goals

I manged to get a dark and light theme going and also could make that stick in local storage. I did have to research how to do that, initially I thought it would be easy and it wasn't. I got some code online and changed it to my needs [dark mode article](https://javascript.plainenglish.io/build-a-dark-mode-toggle-with-javascript-and-localstorage-8022b492fb9e) / [dark mode code](https://codepen.io/coderjay06/pen/WNEPVBv).

I have a kaching sound effect when the user buys an upgrade depending on if they have enough cookies, I was also wanting to have a sound effect in the case a user does not have enough cookies, I might still look into that.

I have one basic media query for small screen, I am not 100% happy with it, but I think I got carried away trying to do everything else.

Also I wanted an animation where a +1 appears over the cookie and disappears just like in the real cookie clicker game. I managed to find some code for that. I understood some of that code and tried to tinker but I eventually got AI to translate it to work for me, so I can't take any credit for that. I just could help but think it was worth while to have the animation to feel authentic.
This portion of code from increment cookies function

```
const moneyAnimation = document.createElement('p');
  moneyAnimation.innerHTML = '+1';
  moneyAnimation.classList.add('moneyAnimation');

  // Append the animation element to the body or a container
  document.body.appendChild(moneyAnimation);

  // Get the position of the click relative to the cookie element
  const clickX = event.clientX;
  const clickY = event.clientY;

  // Position the +1 element where the click occurred
  moneyAnimation.style.left = `${clickX - moneyAnimation.offsetWidth / 2}px`; // Center the text on the click position
  moneyAnimation.style.top = `${clickY - moneyAnimation.offsetHeight}px`; // Position it just above the click point

  // Apply the animation for moving up
  moneyAnimation.classList.add('animateMoney');

  // Remove the element after the animation ends
  moneyAnimation.addEventListener('animationend', () => {
    moneyAnimation.remove();
  });
```

One more little thing what I couldn't get at first was the cookie was always one behind the cound, but that was because I set cookies per second to 0 instead of 1.

I hope you enjoy what I have created. Would love to hear your feedback (good or bad)
