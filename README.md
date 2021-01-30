# Ether University

Deployed live to [ether.university](https://ether.university/). Based on https://github.com/gatsbyjs/gatsby-starter-default

## Quick Start

1. Clone repository: `git clone https://github.com/etheruniversity/etheruniversity`.
1. Change into the repository directory: `cd etheruniversity`.
1. Install dependencies: `yarn install`.

### Frontend

1. Start Gatsby development server: `yarn start`.
1. The site will be running at http://localhost:8000.

### Smart Contracts

1. Install Ganache: `brew install --cask ganache`
1. Open Ganache from `/Applications/Ganache.app`
1. Start Ganache quickstart personal blockchain
1. Run `yarn truffle migrate --network development` to deploy smart contracts on personal blockchain
   > When updating in development, run `yarn truffle migrate --network development --reset` to replace existing contracts. Make sure to replace the old contract address with the new one in `.env.development`.

To deploy to a real testnet, run something like `yarn truffle migrate --network goerli [--reset]` (adding `--reset` runs migrations from the start and replaces existing contracts).

To upload verified contract code to [Etherscan](https://etherscan.io), run something like `yarn truffle run verify Achievement Ethereum101 Compound101 --network goerli`.

## Repository Structure

- `migrations`: contains Truffle migrations
- `src/ABIs`: contains smart contract [ABIs](https://docs.soliditylang.org/en/v0.8.0/abi-spec.html)
- `src/components`: contains shared components used across the application
- `src/contracts`: contains smart contract code
  - `Migrations.sol` is a Truffle-specific contract required for the migrations feature. See [Truffle docs on migrations](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations#initial-migration) for more details.
- `src/hooks`: contains shared hooks used across the application
  - Notably, this directory includes the `useAccount` and `useWeb3` hooks which allow React to access web3.
- `src/images`: contains images used in the application
- `src/pages`: contains the actual pages of the application.
  - A file named `pagepath.tsx` in this directory will be accessible at `/pagepath`.

## Configuration

Configuration occurs through environment variables. Create a `.env.development` file at the project root and Gatsby will automatically load the variables.

### Required Variables

#### Frontend

The variable names are prefixed with `GATSBY_` so they are accessible in browser JavaScript. See the [Gatsby docs on environment variables](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/) for more details.

- `GATSBY_INFURA_PROJECT_ID`: the Infura project id.
- `GATSBY_TESTNET_NAME`: the name of the testnet we are deploying to. For mainnet, set this value to `mainnet`.
- `GATSBY_ACHIEVEMENT_CONTRACT_ADDRESS`: the address of the Ether University Achievement NFT contract.
- `GATSBY_ETHEREUM101_CONTRACT_ADDRESS`: the address of the Ethereum 101 tutorial contract.

Alternatively, set the `GATSBY_PRIVATE_NODE` variable instead of `GATSBY_INFURA_PROJECT_ID` to access a private node directly rather than through Infura. Something like `GATSBY_PRIVATE_NODE=http://myprivatenode.com:8645`.

#### Smart Contracts

- `INFURA_PROJECT_ID`: the Infura project id to access testnets to deploy contracts to
- `PRIVATE_KEY`: private key of the address to deploy contracts from. Make sure it has some testnet ETH
- `ETHERSCAN_API_KEY`: used to upload verified source code to [etherscan.io](https://etherscan.io)

### Example

Here's an example `.env.development` file.

```
GATSBY_TESTNET_NAME="goerli"
GATSBY_INFURA_PROJECT_ID="somenumbersandletters"
GATSBY_ACHIEVEMENT_CONTRACT_ADDRESS="0xCONTRACTADDRESS"
GATSBY_ETHEREUM101_CONTRACT_ADDRESS="0xOTHERCONTRACTADDRESS"

INFURA_PROJECT_ID="somenumbersandletters"
PRIVATE_KEY="longstringofnumbersandletters"
ETHERSCAN_API_KEY="morenumbersandletters"
```

## Stack

- TypeScript
- Gatsby
- React
- [ethereum.org](https://ethereum.org/) Components

  > We use the same components used on [ethereum.org](https://ethereum.org/), imported from the [ethereum-org-website](https://github.com/ethereum/ethereum-org-website) repository. `Layout.tsx` imports the required `<Provider>` components for the components to work correctly. You don't have to import the providers anywhere else. Import components from `ethereum-org-website/src/components`. Here's an example using [ethereum.org](https://ethereum.org/)'s `<ButtonLink>` component:
  >
  > ```js
  > import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
  >
  > const ButtonLinkToPage2 = () => (
  >   <ButtonLink to="/page-2/">Page 2</ButtonLink>
  > )
  > ```

- [Truffle](https://www.trufflesuite.com/truffle)
  - Truffle is a smart contract development framework
- [Ganache](https://www.trufflesuite.com/ganache)
  - Ganache allows one to create their own personal Ethereum blockchain

## Infrastructure

- [Vercel](https://vercel.com/) hosts the web frontend
- [Infura](https://infura.io/) allows us to access the Ethereum blockchain

# Gatsby Default Starter README

<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's default starter
</h1>

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.com/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```shell
    # create a new Gatsby site using the default starter
    gatsby new my-default-starter https://github.com/gatsbyjs/gatsby-starter-default
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-default-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gatsbyjs/gatsby-starter-default)

<!-- AUTO-GENERATED-CONTENT:END -->
