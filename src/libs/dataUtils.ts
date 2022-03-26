import {firestore} from "./firebase";

type ProductComponentType = "choice" | "amount" | "addon";
type ProductComponentPriceType = number | "custom" | "cond";

interface ProductComponentData
{
  name: string,
  type: ProductComponentType,
  price: ProductComponentPriceType,
  required: boolean,
  choices?:
    {
      name: string,
      price: number,
      cond?: number
    }[]
}

interface ProductData
{
  productName: string,
  id: string,
  components: ProductComponentData[]
}


const characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-"
function getRandomId(length: number = 48) : string
{
  let result = "";

  for (let i = 0; i<length; i++)
  {
    let ran = Math.floor(Math.random()*characters.length);
    result += characters.charAt(ran);
  }


  return result;
}


export class Product
{
  data: ProductData;


  constructor(data: ProductData | null = null) {
    this.data = {
      id: getRandomId(),
      productName: "New Product",
      components: [],
    };

    if (data)
      this.data = data;
  }



  setProductName(name: string)
  {
    this.data.productName = name;
  }

  getProductName(): string
  {
    return this.data.productName;
  }

  addEmptyComponent()
  {
    let component: ProductComponentData = {
      name: "New Component",
      type: "addon",
      price: 100,
      required: false,
      choices: []
    };

    this.data.components.push(component);
  }

  getComponents(): ProductComponent[]
  {
    let components = this.data.components; //Raw component data
    return components.map((data) => new ProductComponent(data)); //A new array, but instead of the raw data, we now have the object
  }

  setComponents(components: ProductComponent[])
  {
    let data = components.map((component) => component.getData())
    this.data.components = data;
  }

  setComponent(index: number, component: ProductComponent)
  {
    this.data.components[index] = component.getData();
  }

  getID() : string
  {
    return this.data.id;
  }
}

export class ProductComponent {
  data: ProductComponentData;

  constructor(data: ProductComponentData) {
    this.data = data;
  }

  getType(): ProductComponentType {
    return this.data.type;
  }

  setType(type: ProductComponentType) {
    this.data.type = type;
  }

  getPrice(): ProductComponentPriceType {
    return this.data.price;
  }

  setPrice(price: ProductComponentPriceType) {
    this.data.price = price;
  }

  getData(): ProductComponentData {
    return this.data;
  }

  getName(): string {
    return this.data.name;
  }

  setName(name: string) {
    this.data.name = name;
  }

  getChoices()
  {
    return this.data.choices;
  }

  setChoices(choices: any)
  {
    this.data.choices = choices;
  }

  addEmptyChoice()
  {
    this.data.choices?.push({
      name: "New Choice",
      price: 100,
    })
  }

  setChoice(choice: any, index: number)
  {
    if (this.data.choices)
    {
      this.data.choices[index] = choice;
    }
  }
}


export async function getProductFromFirestore(user: any, id: string) : Promise<Product | null>
{
  const ref = firestore.doc(user.uid).collection("products").doc(id);

  if (ref)
  {
    let snap = await ref.get();
    let product = new Product((snap.data() as ProductData));

    return product;
  }

  return null;
}


export async function pushProductToFirestore(user: any, product: Product)
{
  const id = product.getID();

  let ref = firestore.collection("users").doc(user.uid).collection("products").doc(id);

  ref.set(product.data);

}




export type {ProductData, ProductComponentData, ProductComponentType};
