import {firestore} from "./firebase";

type ProductComponentType = "choice" | "amount" | "addon";
type ProductComponentPriceType = number | "custom" | "cond";

interface ProductComponentData {
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

interface ContractData {
  product: Product,
  client: Client,
  id: string,
  components: ContractComponentLinkData[]
}

interface ContractComponentLinkData {
  componentID: string,
  value: string | number,
  inUse: boolean
}

interface ContractFirebaseData
{
  productID: string,
  clientID: string,
  id: string,
  components: ContractComponentLinkData[];
}

interface ProductData {
  productName: string,
  description: string,
  id: string,
  components: ProductComponentData[]
}

interface ClientData {
  firstName: string,
  lastName: string,
  title: string,
  email: string,
  id: string,
}


const characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-"

function getRandomId(length: number = 48): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    let ran = Math.floor(Math.random() * characters.length);
    result += characters.charAt(ran);
  }


  return result;
}


export class Product {
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


  setProductName(name: string) {
    this.data.productName = name;
  }

  getProductName(): string {
    return this.data.productName;
  }

  addEmptyComponent() {
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

  getComponents(): ProductComponent[] {
    let components = this.data.components; //Raw component data
    return components.map((data) => new ProductComponent(data)); //A new array, but instead of the raw data, we now have the object
  }

  setComponents(components: ProductComponent[]) {
    let data = components.map((component) => component.getData())
    this.data.components = data;
  }

  setComponent(index: number, component: ProductComponent) {
    this.data.components[index] = component.getData();
  }

  getComponentByID(id: string): {component: ProductComponent, index: number} | null
  {
    const components = this.getComponents();

    for (let i = 0; i<components.length; i++)
    {
      const component = components[i];

      if (component.getID() === id) return {component: component, index: i};
    }

    return null;

  }

  getID(): string {
    return this.data.id;
  }

  getDescription(): string {
    return this.data.description;
  }

  setDescription(description: string) {
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

  getChoices() {
    return this.data.choices;
  }

  setChoices(choices: any) {
    this.data.choices = choices;
  }

  addEmptyChoice() {
    this.data.choices?.push({
      name: "New Choice",
      price: 100,
    })
  }

  setChoice(choice: any, index: number) {
    if (this.data.choices) {
      this.data.choices[index] = choice;
    }
  }

  isRequired(): boolean {
    return this.data.required;
  }

  setRequired(required: boolean) {
    this.data.required = required;
  }

  getDescription(): string {
    return this.data.description;
  }

  setDescription(description: string) {
    this.data.description = description;
  }

  getID(): string {
    return this.data.id;
  }

}


export class Client {
  data: ClientData;

  constructor(data: ClientData | null = null) {
    if (data == null) {
      this.data = {
        id: getRandomId(48),
        firstName: "",
        lastName: "",
        title: "",
        email: ""
      }
    } else {
      this.data = data;
    }
  }

  getFirstName(): string {
    return this.data.firstName;
  }

  setFirstName(name: string) {
    this.data.firstName = name;
  }

  getLastName(): string {
    return this.data.lastName;
  }

  setLastName(name: string) {
    this.data.lastName = name;
  }

  getTitle(): string {
    return this.data.title;
  }

  setTitle(name: string) {
    this.data.title = name;
  }

  getEmail(): string {
    return this.data.email;
  }

  setEmail(mail: string) {
    this.data.email = mail;
  }

  getID(): string {
    return this.data.id;
  }


}


export class Contract {
  data: ContractData;

  constructor(data: ContractData) {
    this.data = data;
  }


  /*TODO
  * Instead of storign contracts to the database in a raw format, unlike products and clients,
  * we will store it in a form that references both the Product and the Client indirectly.
  * Additionally, it should store the ContractComponentLinkData in the database.
  * The get and push methods for a contract should therefore create a new contract based on the data fetched.
  *
  *
  * There should however also be the possibility to 'archive' the contract, which means that its raw data is going to be dumped onto the databsae.
  * This is so that the user does not need to worry, whether changing product structure will influence old contracts
  * */

  getProduct(): Product {
    return this.data.product;
  }

  getClient(): Client {
    return this.data.client;
  }

  setComponent(newComp: ContractComponentLinkData, id: string)
  {

  }


  setComponentUsed(componentID: string, used: boolean)
  {
    const components = this.data.components;
    components.forEach((cld) => {
      if (cld.componentID == componentID) cld.inUse = used;
    });
  }

  getComponentLinkData(): ContractComponentLinkData[] | null {
    return this.data.components;
  }

}


export function createNewContract(product: Product, client: Client) {
  let comps: ContractComponentLinkData[] = [];

  let components = product.getComponents();

  components.forEach((component) => {
    comps.push({
      componentID: component.getID(),
      value: component.getType() == "amount" ? 0 : "",
      inUse: component.isRequired()
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


export async function getAllProductsFromFirestore(user: any): Promise<Product[]> {
  let ref = firestore.collection("users").doc(user.uid).collection("products");
  let result = await ref.get();

  let data = result.docs.map((doc) => {
    return doc.data()
  })

  let products = data.map((d) => new Product(d as ProductData));

  return products;
}

export async function getProductFromFirestore(user: any, id: string): Promise<Product | null> {
  const ref = firestore.collection("users").doc(user.uid).collection("products").doc(id);

  if (ref) {
    let snap = await ref.get();
    let product = new Product((snap.data() as ProductData));

    return product;
  }

  return null;
}


export async function pushProductToFirestore(user: any, product: Product) {
  const id = product.getID();

  let ref = firestore.collection("users").doc(user.uid).collection("products").doc(id);

  await ref.set(product.data);

}

export async function pushClientToFirestore(user: any, client: Client) {
  const id: string = client.getID();

  let ref = firestore.collection("users").doc(user.uid).collection("clients").doc(id);

  await ref.set(client.data);
}

export async function getAllClientsFromFirestore(user: any): Promise<Client[]> {
  let ref = firestore.collection("users").doc(user.uid).collection("clients");
  let result = await ref.get();

  let data = result.docs.map((doc) => {
    return doc.data()
  })

  let clients = data.map((d) => new Client(d as ClientData));

  return clients;
}

export async function getClientFromFirestore(user: any, id: string): Promise<Client | null> {
  const ref = firestore.collection("users").doc(user.uid).collection("clients").doc(id);

  if (ref) {
    let snap = await ref.get();

    let client = new Client((snap.data() as ClientData));

    return client;
  }

  return null;
}



export async function getAllContractsFromFirestore(user: any): Promise<Contract[] | null> {
  let ref = firestore.collection("users").doc(user.uid).collection("contracts");
  let result = await ref.get();

  let data = result.docs.map((doc) => {
    return doc.data()
  })


  let contracts: Contract[] = [];
  for (let i = 0; i<data.length; i++)
  {
    const d = data[i] as ContractFirebaseData;

    contracts.push(await getContractFromContractFirebaseData(d, user));

  }


  return contracts;
}

export async function getContractFromFirestore(user: any, id: string) : Promise<Contract | null>
{
  const ref = firestore.collection("users").doc(user.uid).collection("contracts").doc(id);

  if (ref)
  {
     let snap = await ref.get();

     let data = snap.data() as ContractFirebaseData;

     return await getContractFromContractFirebaseData(data, user);
  }

  return null;
}

export async function pushContractToFirestore(contract: Contract, user: any)
{
  const data = mapContractToFirebaseData(contract);

  const id = data.id;

  const ref = firestore.collection("users").doc(user.uid).collection("contracts").doc(id);

  await ref.set(data);
}

function mapContractToFirebaseData(contract: Contract) : ContractFirebaseData
{
  const data: ContractFirebaseData = {
    id: contract.data.id,
    productID: contract.data.product.getID(),
    clientID: contract.data.client.getID(),
    components: contract.data.components
  }

  return data;
}

async function getContractFromContractFirebaseData(data: ContractFirebaseData, user: any)
{
  const productID = data.productID;
  const clientID = data.clientID;

  const components: ContractComponentLinkData[] = data.components;
  const contractID = data.id;

  const product = await getProductFromFirestore(user, productID) as Product;
  const client = await getClientFromFirestore(user, clientID) as Client;

  const contractData: ContractData = {
    product: product,
    client: client,
    id: contractID,
    components: components
  }

  return new Contract(contractData);
}




export type {ProductData, ProductComponentData, ProductComponentType, ContractComponentLinkData, ContractData};
