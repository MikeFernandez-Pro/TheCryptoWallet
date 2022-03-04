<p align="center">
    <img width="300" src="https://user-images.githubusercontent.com/79382274/156652167-ba417553-6d5e-4a2b-ab1e-bbc844dba1dd.png" alt="The Wallet logo">
</p>

<p align="center">
    <strong>Try me following this link :</strong>
    <br>
    <a href="https://the-crypto-wallet.vercel.app/">The Wallet App</a>
</p>
<br>

|||
|-------|-----------------|
|Author |Mike Fernandez|
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
  - [Check modification history](#check-modification-history)
  - [Hide cryptocurrency's amount](#hide-cryptocurrencys-amount)
  - [Change theme](#change-theme)
- [What remains to do](#what-remains-to-do)
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
    <img src="https://user-images.githubusercontent.com/79382274/156586244-eb7d6412-d486-4998-b82f-c5ffa7221008.gif">
</p>

---

### Add a cryptocurrency to the wallet

To add a cryptocurrency go down to the input field and add its **name or symbol and an amount**.
***(It will add it to your wallet taking into account its current price and will automatically update the chart)***

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156574166-042abb05-c47d-4055-a8b4-5fdf3fd920c6.gif">
</p>

---

### Modify / Delete a cryptocurrency

#### Modify cryptocurrency's amount :
To modify a cryptocurrency's amount **click on the modify** button linked to the cryptocurrency and choose the new amount.

#### Delete cryptocurrency item : 
To delete a cryptocurrency **click on the delete** button linked to the cryptocurrency and confirm.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156577573-92dab443-be61-450c-ae24-3a99a512652b.gif">
</p>

---

### Check modification history

To check the history of a cryptocurrency just **click on it**.
It will show you all amount changes that have been made since the cryptocurrency was added.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156580545-817934b5-7871-4699-9b4e-93135274ebea.gif">
</p>

---

### Hide cryptocurrency's amount

If you don't want to show the value of your wallet you can **click on the eye icon** present on the top of the page to hide all cryptocurrency's amount and values.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156582260-e73af155-6a90-4789-b8f4-508a43d03ef6.gif">
</p>

---

### Change theme
    
You can change the default theme of the app by **clicking oh the sun icon** present on the top of the page.

<p align="center">
    <img src="https://user-images.githubusercontent.com/79382274/156582731-eb49c7f5-8d6b-464a-bb33-dedbf7421df4.gif">
</p>

## What remains to do
- Handle fetch errors
- Optimisation (useMemo, useCallback)
- Put asynchronous functiosn into an Action Creator
- Create a custom hook for form inputs
- Add max items
- Improve responsiveness

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

