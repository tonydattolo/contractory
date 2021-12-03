
Table of Contents:
- [Abstract](#abstract)
- [Tech Stack](#tech-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Design Patterns](#design-patterns)
    - [MVT pattern, REST pattern, Django Rest Framework](#mvt-pattern-rest-pattern-django-rest-framework)
    - [Finite State Machine pattern, Redux, Redux-Persist](#finite-state-machine-pattern-redux-redux-persist)
    - [Factory Pattern, RTK-Query](#factory-pattern-rtk-query)
- [Problems](#problems)
- [Future Iterations](#future-iterations)




# Abstract

Prototype MVP for a No-Code Web3 Smart Contract as a Service Platform on Ethereum.

# Tech Stack

## Development Environment and Process
  - VSCode, Ubuntu, pipenv, npm
    - The IDE used for this project was VSCode. The extension library and customization functionality ensures maximization of our productivity. Keybindings, native or extension support for every necessary language, framework, tool, etc is available. There is a robust directory manager sidebar that allows us view the codebase directory structure as it scales. When dealing with React for example, there are many approaches to directory structure [1]. This might seem unimportant, but as the project grows sufficiently large over time, the directory structure becomes more important. Visibility into that aspect, allows our developers to keep this front of mind as necssary. If there starts to be dozens of custom components, we might want to break component directory into different features, or pages, or type of component, etc.
    - The debian based Linux distro, Ubuntu, was used for the entirety of the project. Linux improves developer productivity by allowing for more direct control of over the development environment, customization, and first class integration support. For example, built-in PostgreSQL support, or installing compiled binaries for PDF generation libraries, or installation and management of enviroments like NodeJS.
  - <show example screenshots of development directory, workflow, etc.>

  - Gitflow Workflow [2]
    - This project used gitflow workflow, also commonly known as feature-branching, to utilize the full capabilities of git. The project main branch is reserved for deployment, where testing infrastructure and a continuous integration/continuous deployment methodology, such as github actions, can be employed. This is to ensure maximum uptime of an in production app, and ensure we minimize bugs going into production. The develop branch is then used for handling the job of merging new features into the existing codebase. 

## Backend
  - Django Rest Framework, PostgreSQL, Ethereum

## Frontend
  - NodeJS, NextJS, useDapp, Redux, RTK, Redux-Persist, RTK-Query, ethers, React-Bootstrap, Scss

# Design Patterns

### MVT pattern, REST pattern, Django Rest Framework

### Finite State Machine pattern, Redux, Redux-Persist

### Factory Pattern, RTK-Query

# Developer

# Problems

# Future Iterations

Bibliography:
[1] https://www.taniarascia.com/react-architecture-directory-structure/
[2] https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

https://github.com/Bearle/django-web3-auth
https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
