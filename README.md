# WebdriverIO Project

## Description

This project uses WebdriverIO + TypeScript to automate testing of web applications. The tests include checking various features of the Saucedemo site, such as login, checkout, product sorting, and social media link verification. For better testing, the ability to run tests in different screen sizes has been added: 
* web: { width: 1280, height: 800 },
* tablet: { width: 768, height: 1024 },
* mobile: { width: 375, height: 812 };

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```

2. Navigate to the project directory:
    ```bash
    cd your-repository
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

## Running Tests

### Locally

To run the tests locally, use the following command:
```bash
npx wdio run wdio.conf.ts
