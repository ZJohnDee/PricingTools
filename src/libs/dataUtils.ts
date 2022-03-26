import {firestore} from "./firebase";

type ProductComponentType = "choice" | "amount" | "addon";
type ProductComponentPriceType = number | "custom" | "cond";

interface ProductComponentData
{
  name: string,
  type: ProductComponentType,
  price: ProductComponentPriceType,
  required: boolean,
  id: string,
  description: string,
  choices?:
    {
      name: string,
      price: number,
      cond?: number
    }[]
}

interface ContractData
{
  product: Product,
  client: Client,
  id: string,
  components: ContractComponentLinkData[]
}

interface ContractComponentLinkData
{
  componentID: string,
  value: string | number
}

interface ProductData
{
  productName: string,
  description: string,
  id: string,
  components: ProductComponentData[]
}

interface ClientData
{
  firstName: string,
  lastName: string,
  title: string,
  email: string,
  id: string,
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
      description: "Description",
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
      description: "Description",
      id: getRandomId(24),
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

  getDescription(): string
  {
    return this.data.description;
  }

  setDescription(description: string)
  {
    this.data.description = description;
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

  isRequired(): boolean
  {
    return this.data.required;
  }

  setRequired(required: boolean)
  {
    this.data.required = required;
  }

  getDescription(): string
  {
    return this.data.description;
  }

  setDescription(description: string)
  {
    this.data.description = description;
  }

  getID(): string
  {
    return this.data.id;
  }

}


export async function getProductFromFirestore(user: any, id: string) : Promise<Product | null>
{
  const ref = firestore.collection("users").doc(user.uid).collection("products").doc(id);

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

  await ref.set(product.data);

}

export async function getAllProductsFromFirestore(user: any): Promise<Product[]>
{
  let ref = firestore.collection("users").doc(user.uid).collection("products");
  let result = await ref.get();

  let data = result.docs.map((doc) => {return doc.data()})

  let products = data.map((d) => new Product(d as ProductData));

  return products;
}

export class Client
{
  data: ClientData;

  constructor(data=null)
  {
    if (data == null)
    {
      this.data={
        id: getRandomId(48),
        firstName: "",
        lastName: "",
        title: "",
        email: ""
      }
    }
    else
    {
      this.data = data;
    }
  }

  getFirstName(): string
  {
    return this.data.firstName;
  }

  setFirstName(name: string)
  {
    this.data.firstName = name;
  }

  getLastName(): string
  {
    return this.data.lastName;
  }

  setLastName(name: string)
  {
    this.data.lastName = name;
  }

  getTitle(): string
  {
    return this.data.title;
  }

  setTitle(name: string)
  {
    this.data.title = name;
  }

  getEmail(): string
  {
    return this.data.email;
  }

  setEmail(mail: string)
  {
    this.data.email = mail;
  }


}


export class Contract
{
  data: ContractData;

  constructor(data: ContractData) {
    this.data = data;
  }

}


export function createNewContract(product: Product, client: Client)
{
  let comps: ContractComponentLinkData[] = [];

  let components = product.getComponents();

  components.forEach((component) => {
    comps.push({
      componentID: component.getID(),
      value: component.getType() == "amount" ? 0 : ""
    })
  });


  let data: ContractData = {
    product: product,
    client: client,
    id: getRandomId(24),
    components: comps,
  }

  return new Contract(data);
}




export type {ProductData, ProductComponentData, ProductComponentType};
