
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
    - This project used gitflow workflow, also commonly known as feature-branching, to utilize the full capabilities of git. The project main branch is reserved for deployment, where testing infrastructure and a continuous integration/continuous deployment methodology, such as github actions, can be employed. This is to ensure maximum uptime of an in production app, and ensure we minimize bugs going into production. The develop branch is then used for handling the job of merging new features into the existing codebase. Develop in its default state maintains an exact copy of the main branch, so that merge conflicts and failing tests can be handled before being pushed to production. It also allows a fresh state for developers to branch off of. It also allows for hotfix branches which can test bugs found in production to make sure they're patched before merging into main.
    - <show diagram of the flow over time>
    - <show terminal screen grab of this process>

## Backend
  - Django Rest Framework, PostgreSQL, Ethereum
  - For the backend, I chose Django Rest Framework and PostgreSQL. Django is a very robust, full featured framework. It is well documented, there is a lot of built-in functionality and support for common use cases. It's also opinionated enough to allow for total control and customization. As such, Django and in this case the REST implementation, Django Rest Framework, allow for rapidly developing minimum viable products, prototypes, testing out features. The structure breaks features into seperate apps within the project and can even hold multiple sites within the project. This aligns really well with an agile iterative development workflow. New sprint, new app started within the project, new feature branch for it, and suddenly the code is very modular and extensible without stepping on the toes of other parts of the codebase, or even entire sites that other teams may we working on.

## Frontend
  - NodeJS, NextJS, useDapp, Redux, RTK, Redux-Persist, RTK-Query, ethers, React-Bootstrap, Scss
  
## Blockchain
  - Ethereum, Solidity, useDapp, ethers,

# Design Patterns

### Headless MVT pattern, REST pattern, Django Rest Framework
  - The MVT design pattern is what drives Django, similar to the original MVC pattern. In this case, it's considered a headless MVT pattern, because we're using a REST API implementation to interface with our frontend, rather than serving templates or react within the actual django backend itself. Model refers to our data model, wi

### Finite State Machine pattern: Redux
  - Maintaining statefulness
  
### Data persistence: Redux-Persist
  - While redux handles how to structure the state of our data, what it doesn't do is persist the data across sessions. This is commonly referred to as hydration and rehydration. The redux-persist library allows for the persistence of data. For example, without redux-persist, when we would navigate away from the web app and come back, our state would not always be saved. If you think about the modern user experience, users expect this functionality. They don't want to be constantly reloggingi in, or repeating flows they've already completed. Redux-persist allows for data-persistence even when leaving over time. If you didn't clear your cache, and came back months later, as long as it was within the time period of the JWT refresh token expiration timeline, you'd still be logged in and able to continue on with where you left off.
  
### Factory Pattern, RTK-Query

# Developer

# Problems

# Future Iterations

Bibliography:
[1] https://www.taniarascia.com/react-architecture-directory-structure/
[2] https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

https://github.com/Bearle/django-web3-auth
https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
