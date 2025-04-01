# Getting Started with Google Places Application

Welcome to your new React Native project! This guide will walk you through the process of setting up and running your application on iOS. Please follow the steps carefully to ensure a smooth setup process.

> **Note**: Before proceeding, ensure you have completed the React Native Environment Setup guide. This will ensure that all the necessary dependencies are installed on your system

## Step 1: Install Project Dependencies

To get started, you need to install the necessary dependencies for your React Native application. You can do this by running the following command in your terminal.

```sh
# Using npm
npm install

# OR using Yarn
yarn
```

This will download and install all the dependencies specified in your package.json file.

## Step 2: Install iOS Bundles

Currently, this application is configured to run on iOS only. To set up the required native iOS dependencies, follow these steps:

### Navigate to the ios directory in your project:

```sh
cd ios
```

### Install the necessary CocoaPods dependencies:

```sh
pod install
```

### Return to the root of your project:

```sh
cd ..
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

## Step 3: Run the Application

Once the dependencies are installed and CocoaPods setup is complete, you can start the application. To do this, use one of the following commands:

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

This will build and launch the app in the iOS Simulator or on your connected iOS device. If everything is set up correctly, you should see your new app running.

## Step 3: Modify your app

Once the app is running, you can begin modifying it according to your needs.

Open the App.tsx file located in the root of your project.

Make the desired changes in the code.

Thanks to Fast Refresh, your changes will automatically reflect in the simulator or on the device as soon as you save the file, allowing for a seamless development experience.
