import "./style.css";

type StoreItem = {
  id: number;
  type: string;
  name: string;
  image: string;
  price: number;
  discountedPrice?: number;
  dateEntered: string;
  stock: number;
};
type User = {
  firstName: string;
  lastName: string;
  id: string;
  password: string;
  bag: [];
};

type State = {
  page: "home" | "girls" | "guys" | "sale" | "";
  store: StoreItem[];
  users: User[];
  cart: StoreItem[];
  modal: "search" | "bag" | "user" | "";
};

let state: State = {
  page: "home",
  store: [],
  users: [],
  cart: [],
  modal: "",
};

function getStoreItemsFromServer() {
  fetch(`http://localhost:3005/store`)
    .then((response) => response.json())
    .then((data) => {
      state.store = data;
      render();
    });
}

getStoreItemsFromServer();

function getUserFromServer() {
  fetch(`http://localhost:3005/users`)
    .then((response) => response.json())
    .then((data) => {
      state.users = data;
      render();
    });
}
getUserFromServer();

let containerEl = document.querySelector(".container");

function renderHeader() {
  if (!containerEl) return;

  let headerEl = document.createElement("header");
  headerEl.className = "header";

  let hollixtionEl = document.createElement("a");
  hollixtionEl.addEventListener("click", function () {
    state.page = "home";
    render();
  });

  let h1El = document.createElement("h1");
  h1El.textContent = "HOLLIXTON";
  hollixtionEl.append(h1El);

  let grilsLinkEl = document.createElement("a");
  grilsLinkEl.textContent = "Girls";
  grilsLinkEl.addEventListener("click", function () {
    state.page = "girls";
    render();
  });
  let guysLinkEl = document.createElement("a");
  guysLinkEl.textContent = "Guys";
  guysLinkEl.addEventListener("click", function () {
    state.page = "guys";

    render();
  });

  let saleLinkEl = document.createElement("a");
  saleLinkEl.textContent = "Sale";
  saleLinkEl.addEventListener("click", function () {
    state.page = "sale";
    render();
  });

  let linksEl = document.createElement("div");
  linksEl.className = "links";

  let buttonsEl = document.createElement("div");
  buttonsEl.className = "buttons";

  let searchButtonEl = document.createElement("button");
  searchButtonEl.className = "material-symbols-outlined";
  searchButtonEl.textContent = "search";
  searchButtonEl.addEventListener("click", function () {
    state.modal = "search";
    render();
  });

  let userButtonEl = document.createElement("button");
  userButtonEl.className = "material-symbols-outlined";
  userButtonEl.textContent = "person";
  userButtonEl.addEventListener("click", function () {
    state.modal = "user";
    render();
  });

  let bagDivEl = document.createElement("div");
  bagDivEl.className = "bag";
  bagDivEl.addEventListener("click", function () {
    state.modal = "bag";
    render();
  });

  let countEl = document.createElement("div");
  countEl.textContent = "0";
  countEl.className = "count";

  let bagButtonEl = document.createElement("button");
  bagButtonEl.className = "material-symbols-outlined";
  bagButtonEl.textContent = "shopping_bag";

  let navigationEl = document.createElement("div");
  navigationEl.className = "navigation";

  bagDivEl.append(countEl);
  bagDivEl.append(bagButtonEl);
  buttonsEl.append(searchButtonEl, userButtonEl, bagDivEl);
  linksEl.append(grilsLinkEl, guysLinkEl, saleLinkEl);
  navigationEl.append(linksEl, buttonsEl);
  headerEl.append(hollixtionEl, navigationEl);
  containerEl.append(headerEl);
}

function renderGirlsPage() {
  if (!containerEl) return;

  let mainEl = document.createElement("main");
  mainEl.className = "main";

  for (let item of state.store.filter((item) => item.type === "Girls")) {
    let cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.addEventListener("click", function () {
      renderSingleSotoreItem(item, mainEl);
    });

    let imgEl = document.createElement("img");
    imgEl.className = "card-img";
    imgEl.src = item.image;
    
    
    let titleEl = document.createElement("h2");
    titleEl.textContent = item.name;
    
    let cardTextEl2 = document.createElement("h3");
    cardTextEl2.textContent = `£${item.price}`;
    cardTextEl2.className = "real-price";

    let cardTextEl = document.createElement("h3");
    cardTextEl.textContent = `£${item.discountedPrice}`;
    
   
    if(item.discountedPrice){
      cardTextEl.className = "price";
      cardTextEl2.className = "discounted-price";
      let divEL= document.createElement("div");
      divEL.className = "price-discount";
      divEL.append(cardTextEl2, cardTextEl);
      cardEl.append(imgEl, titleEl, divEL);}
    else cardEl.append(imgEl, titleEl, cardTextEl2);
    

    mainEl.append(cardEl);
    containerEl.append(mainEl);
  }
}

function renderGuysPage() {
  if (!containerEl) return;

  let mainEl = document.createElement("main");
  mainEl.className = "main";
 
  for (let item of state.store.filter((item) => item.type === "Guys")) {
    let cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.addEventListener("click", function () {
      renderSingleSotoreItem(item, mainEl);
    });

    let imgEl = document.createElement("img");
    imgEl.className = "card-img";
    imgEl.src = item.image;
    
    
    let titleEl = document.createElement("h2");
    titleEl.textContent = item.name;
    
    let cardTextEl2 = document.createElement("h3");
    cardTextEl2.textContent = `£${item.price}`;
    cardTextEl2.className = "real-price";

    let cardTextEl = document.createElement("h3");
    cardTextEl.textContent = `£${item.discountedPrice}`;
    
   
    if(item.discountedPrice){
      cardTextEl.className = "price";
      cardTextEl2.className = "discounted-price";
      let divEL= document.createElement("div");
      divEL.className = "price-discount";
      divEL.append(cardTextEl2, cardTextEl);
      cardEl.append(imgEl, titleEl, divEL);}
    else cardEl.append(imgEl, titleEl, cardTextEl2);
    

    mainEl.append(cardEl);
    containerEl.append(mainEl);
  }
}

function renderHomePage() {
  if (!containerEl) return;

  let mainEl = document.createElement("main");
  mainEl.className = "main";

  for (let item of state.store) {
    let cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.addEventListener("click", function () {
      renderSingleSotoreItem(item, mainEl);
    });

    let imgEl = document.createElement("img");
    imgEl.className = "card-img";
    imgEl.src = item.image;
    
    
    let titleEl = document.createElement("h2");
    titleEl.textContent = item.name;
    
    let cardTextEl2 = document.createElement("h3");
    cardTextEl2.textContent = `£${item.price}`;
    cardTextEl2.className = "real-price";

    let cardTextEl = document.createElement("h3");
    cardTextEl.textContent = `£${item.discountedPrice}`;
    
   
    if(item.discountedPrice){
      cardTextEl.className = "price";
      cardTextEl2.className = "discounted-price";
      let divEL= document.createElement("div");
      divEL.className = "price-discount";
      divEL.append(cardTextEl2, cardTextEl);
      cardEl.append(imgEl, titleEl, divEL);}
    else cardEl.append(imgEl, titleEl, cardTextEl2);
    

    mainEl.append(cardEl);
    containerEl.append(mainEl);
  }
}

function renderSingleSotoreItem(item: StoreItem, mainEl: HTMLElement) {
  if (!containerEl) return;
  mainEl.textContent = "";

  let cardEl = document.createElement("div");
  cardEl.className = "single-card";

  let imgEl = document.createElement("img");
  imgEl.className = "card-img";
  imgEl.src = item.image;

  let infoEl = document.createElement("div");
  infoEl.className = "info";

  let titleEl = document.createElement("h2");
  titleEl.textContent = item.name;

  let buttonEl = document.createElement("button");
  buttonEl.textContent = "Add to cart";
  buttonEl.className = "single-card-button";

  buttonEl.addEventListener("click", function () {
    state.cart.push(item);
    // renderCart();
  });
  infoEl.append(titleEl, buttonEl);
  cardEl.append(imgEl, infoEl);
  mainEl.append(cardEl);
}

function renderSearchModal() {
  if (!containerEl) return;

  let modalEl = document.createElement("div");
  modalEl.className = "modal";

  let modalContentEl = document.createElement("div");
  modalContentEl.className = "modal-content";

  let modalHeaderEl = document.createElement("div");
  modalHeaderEl.className = "modal-header";

  let h2El = document.createElement("h2");
  h2El.textContent = "Search for your favorite item!";

  let closeButtonEl = document.createElement("button");
  closeButtonEl.textContent = "X";
  closeButtonEl.className = "close-button";
  closeButtonEl.addEventListener("click", function () {
    state.modal = "";
    render();
  });

  let formEl = document.createElement("form");
  formEl.className = "form";

  let inputEl = document.createElement("input");
  inputEl.className = "input";
  inputEl.type = "text";
  inputEl.placeholder = "Search...";

  modalHeaderEl.append(h2El, closeButtonEl);
  formEl.append(inputEl);
  modalContentEl.append(modalHeaderEl, formEl);
  modalEl.append(modalContentEl);

  containerEl.append(modalEl);
}

function renderBagModal() {
  if (!containerEl) return;

  let modalEl = document.createElement("div");
  modalEl.className = "modal";

  let modalContentEl = document.createElement("div");
  modalContentEl.className = "modal-content";

  let modalHeaderEl = document.createElement("div");
  modalHeaderEl.className = "modal-header";

  let h2El = document.createElement("h2");
  h2El.textContent = "Bag";

  let closeButtonEl = document.createElement("button");
  closeButtonEl.textContent = "X";
  closeButtonEl.className = "close-button";
  closeButtonEl.addEventListener("click", function () {
    state.modal = "";
    render();
  });

  let pEl = document.createElement("p");
  pEl.textContent = `Your bag contains ${state.cart.length} items`;
  pEl.className = "info";

  modalHeaderEl.append(h2El, closeButtonEl);
  modalContentEl.append(modalHeaderEl, pEl);
  modalEl.append(modalContentEl);

  containerEl.append(modalEl);
}

function renderUserModal() {
  if (!containerEl) return;

  let modalEl = document.createElement("div");
  modalEl.className = "modal";

  let modalContentEl = document.createElement("div");
  modalContentEl.className = "modal-content";

  let modalHeaderEl = document.createElement("div");
  modalHeaderEl.className = "modal-header";

  let h2El = document.createElement("h2");
  h2El.textContent = "Sign In";

  let closeButtonEl = document.createElement("button");
  closeButtonEl.textContent = "X";
  closeButtonEl.className = "close-button";
  closeButtonEl.addEventListener("click", function () {
    state.modal = "";
    render();
  });

  let formEl = document.createElement("form");
  formEl.className = "form";

  let labelEl = document.createElement("label");
  labelEl.textContent = "Email";

  let inputEl = document.createElement("input");
  inputEl.className = "input";
  inputEl.type = "email";

  let labelEl2 = document.createElement("label");
  labelEl2.textContent = "Password";

  let inputEl2 = document.createElement("input");
  inputEl2.className = "input";
  inputEl2.type = "password";

  let buttonEl = document.createElement("button");
  buttonEl.textContent = "Sign In";
  buttonEl.className = "sign-in-button";

  modalHeaderEl.append(h2El, closeButtonEl);
  formEl.append(labelEl, inputEl, labelEl2, inputEl2, buttonEl);
  modalContentEl.append(modalHeaderEl, formEl);
  modalEl.append(modalContentEl);

  containerEl.append(modalEl);
}

function renderFooter() {
  if (!containerEl) return;

  let footerEl = document.createElement("footer");
  footerEl.className = "footer";

  let h2El = document.createElement("h3");
  h2El.textContent = "HOLLIXTON";

  let h3El = document.createElement("h4");
  h3El.textContent = " United Kingdom ";

  footerEl.append(h2El, h3El);
  containerEl.append(footerEl);
}

function render() {
  if (!containerEl) return;
  containerEl.textContent = "";
  renderHeader();

  if (state.page === "home") renderHomePage();
  if (state.page === "girls") renderGirlsPage();
  if (state.page === "guys") renderGuysPage();

  if (state.modal === "search") renderSearchModal();
  if (state.modal === "bag") renderBagModal();
  if (state.modal === "user") renderUserModal();
  renderFooter();
}
render();
