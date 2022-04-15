# Adding a product
## Overview
Products are complex and highly versitile elements that can be used to create a contract.
## Structure
A product is usually not an item that can be added to a cart several times but instead one large project. So you wouldn't sell a single photograph but instead a photography project with many variable parts that influence the price. 

For a single, fixed priced photograph, you would know the price upfront, which would erase the need for this application. But if the price is structured around the type of the photograph (e.g. is it a portrait or a product image?) or the background being used, then having a product with modular parts makes sense. 

## Components
### Overview
Each product needs components that are variably added.
Each component can influence the resulting price. Which component is active or not is decided via a *contract*. Using the product add/edit tool, you simply lay out all the components *available* for the product but not, which of these are actually *active*, except when they are required.

### Adding a component
To add a component, hit *+ Component*. 

### Settings
Each component has a *name*, a *description* a *type*, a *price* and can be made *required*.

The type dictates the behaviour of the component and the way, the price is calculated.
The price is the amount that is added to the total price, when the component is added to the contract. In case the type is amount, the price would then be multiplied with an amount, specified in the contract.

### Types
Each component can be one of several types.
* Add-On
  * An optional feature that can be added (e.g. retouching after shooting the photograph)
* Amount
  * An optional feature that can be added with an amount. (e.g. the amount of copies of the photograph, the client should recieve)
* Choice
  * A component that alters the behaviour of the product by making a choice. (e.g. what type of photograph should be taken?; what camera should be used?)

### Choices
Having selected the type *choice*, you can now add different choices by pressing *+ Choice*. 

Each choice has a *name*, a *price* and *COND* field. The value that is set in price, is the amount being added to the products total price, ONLY when the choice is selected. Otherwise, the price is being discarded. The COND value is used for conditional pricing. Learn more [here](/docs/conditional_pricing).


### What should be made a component?
A component, which is already included with the product by default (e.g. making the photo in a studio) should either be not implemented as a component or marked as required. If the component is mainly a feature statement and is included with every product, it should not be implemented as a component (e.g. "Professional Photography!", every single one of your photographs is probably professional).

## Saving with existing contracts
By default, contracts do not store a copy of the product but a reference. That means that editing a product can influence contract data. So renaming a component will change the component's name in all contracts, referencing the product. 

This however may lead to unexpected behaviour and can even break a contract if it relies on certain data. Therefore, when you save, the system checks for contracts referencing the product. You can then decide to either *archive* the contract or to proceed with saving the product. Archiving will make the cohntract store a copy of the current revision of the product, instead of a reference, making mutations to the product have no effects on the contract. If you are sure, what you are doing, you can also simply save the product anyway, which risks corrupting the contract.
