# <img src="https://github.com/sssshefer/dutch-auction/assets/63253440/63996727-5dff-4814-9286-12eaa19a2384" height="72"/> Dutch Auction Smart Contract

This project implements a basic auction system using a Solidity smart contract, with tests written in TypeScript using Hardhat and Chai.

## Table of Contents

- [Introduction](#introduction)
- [Implementation](#implementation)
  - [Features and Functionality](#features-and-functionality)
  - [Tests](#tests)
- [Running the Project Locally](#running-the-project-locally)
  - [Useful Commands](#useful-commands)

## Introduction

This project is a smart contract for an auction system implemented in Solidity. The contract allows users to create auctions with a starting price, discount rate, item description, and duration. Bidders can participate in the auction by sending bids, and the contract ensures that the highest bid wins when the auction ends.

## Implementation

### Features and Functionality

- **Create Auction:** Allows users to create an auction with a specified starting price, discount rate, item description, and duration.
- **Get Current Price:** Calculates the current price of the auctioned item based on the time elapsed and the discount rate.
- **Buy Item:** Allows users to buy the auctioned item by sending the required amount of Ether. The auction ends once the item is bought.

### Tests

The project includes a comprehensive test suite written in TypeScript using the Hardhat framework and the Chai assertion library.

## Running the Project Locally

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Compile the smart contract using `npx hardhat compile`.
4. Run the tests using `npx hardhat test`.

### Useful Commands

- `npx hardhat compile`: Compile the smart contracts.
- `npx hardhat test`: Run the test suite.
- `npx hardhat node`: Start a local Ethereum node.
- `npx hardhat run scripts/deploy.js`: Deploy the smart contract.
