<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156730651-f3b53bfa-5be0-48fd-9a70-a4ef778ce89e.png" alt="The Wallet logo">
</p>


<p align="center">
    <strong>Try me following this link :</strong>
    <br>
    <a href="https://the-crypto-wallet.vercel.app/">The Wallet App</a>
</p>
<br>

**Author** - Mike Fernandez
## Table of contents

<!-- TOC -->

- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [Visualize cryptocurrency / percentage](#visualize-cryptocurrency--percentage)
  - [Add a cryptocurrency to the wallet](#add-a-cryptocurrency-to-the-wallet)
  - [Modify / Delete a cryptocurrency](#modify--delete-a-cryptocurrency)
    - [Modify cryptocurrency's amount :](#modify-cryptocurrencys-amount-)
    - [Delete cryptocurrency item :](#delete-cryptocurrency-item-)
  - [Show cryptocurrency history](#show-cryptocurrency-history)
  - [Hide cryptocurrency's amount](#hide-cryptocurrencys-amount)
  - [Change theme](#change-theme)
- [Upcoming features](#upcoming-features)
- [Possible evolutions](#possible-evolutions)
- [License](#license)

<!-- /TOC -->

---

## Introduction
The objective of this project is to propose a simple graphical representation of a cryptocurrency's wallet content.

## Installation

Use npm to install and run the project.

```npm install -y && npm start```

## Usage

### Visualize cryptocurrency / percentage

To visualize a cryptocurrency name or percentage put your **mouse in or out** of the cryptocurrency's element of the chart.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156734066-fddbf75e-e8e6-475a-ac58-4db9f3a2334f.gif" alt="Visualize cryptocurrency Example">
</p>

---

### Add a cryptocurrency to the wallet

To add a cryptocurrency go down to the input field and add its **name or symbol and an amount**.
***(It will add it to your wallet taking into account its current price and will automatically update the chart)***

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156733889-04959203-d596-4d5c-befd-37d55f13f181.gif" alt="Add a cryptocurrency Exmaple">
</p>

---

### Modify / Delete a cryptocurrency

#### Modify cryptocurrency's amount :
To modify a cryptocurrency's amount **click on the modify** button linked to the cryptocurrency and choose the new amount.

#### Delete cryptocurrency item : 
To delete a cryptocurrency **click on the delete** button linked to the cryptocurrency and confirm.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156733937-7d6883c1-710e-4a14-93a9-3a25b3d76066.gif" alt="Modify / Delete a cryptocurrency Example">
</p>

---

###  Show cryptocurrency history

To check the history of a cryptocurrency just **click on it**.
It will show you all amount changes that have been made since the cryptocurrency was added.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156733999-3509894b-be93-43b9-9b6b-1a7acdf35970.gif" alt="Show cryptocurrency history Example">
</p>

---

### Hide cryptocurrency's amount

If you don't want to show the value of your wallet you can **click on the eye icon** present on the top of the page to hide all cryptocurrency's amount and values.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156734012-f2556ad9-41f9-498d-a1ea-291e4866a56f.gif" alt="Hide cryptocurrency's amount Example">
</p>

---

### Change theme
    
You can change the default theme of the app by **clicking oh the sun icon** present on the top of the page.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156734021-51a18826-f01a-4da1-8437-6dd1035a0b0f.gif" alt="Change theme example">
</p>

## Upcoming features
- [ ] Handle fetch() errors
- [ ] Optimisation (useMemo, useCallback)
- [x] Put asynchronous functions into an Action Creator
- [x] Create a custom hook for Form Inputs
- [ ] Add items limit
- [ ] Improve responsiveness and theme background

## Possible evolutions
- Add cryptocurrencies value flucuations per day
- Authentification system
- Retrieve wallet info from centralized exchanges (Binance, Kucoin, FTX, ...)
- Filtering system (price, percentage, TVL, ...)
- Drag and drop to change items order
- Add a subgraph for small cryptocurrencies amounts

## License
[MIT](https://choosealicense.com/licenses/mit/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

