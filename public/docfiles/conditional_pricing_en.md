# Conditional Pricing
## Overview
Conditional pricing can be used for a choice to influence the price of a different component.
## Usage
Each component with the type *choice* has an *address*. This address can be used to reference the conditional price.

Now in another component, in the price field, you simpy enter `cond:[ADDRESS]`. (e.g. `cond:6yz8Uw`). 
Now, when a choice is made with the component having the address specified (in this case 6yz8Uw), the price from the *cond*
field of the selected choice is being used.