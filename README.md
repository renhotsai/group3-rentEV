# RentEV - Electric Vehicle Rental Platform

A mobile application platform for electric vehicle rentals, consisting of separate apps for vehicle owners and renters.

## Project Structure

This repository contains two React Native applications built with Expo:

- **OwnerApp_G03** - Mobile application for EV owners to list and manage their vehicles
- **RenterApp_G03** - Mobile application for users to rent electric vehicles

## Applications Overview

### Owner App
The Owner App allows electric vehicle owners to:
- List their vehicles for rent
- Manage rental requests
- Track vehicle usage and earnings

### Renter App  
The Renter App allows users to:
- Browse available electric vehicles
- Make rental requests
- Manage their bookings

## Technology Stack

- **Framework**: React Native with Expo SDK 50
- **Language**: JavaScript
- **Platform Support**: iOS, Android, and Web
- **Dependencies**:
  - React 18.2.0
  - React Native 0.73.6
  - Expo Status Bar
  - Babel Core (dev dependency)

## Prerequisites

Before running the applications, ensure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- Expo CLI installed globally: `npm install -g expo-cli`
- Expo Go app on your mobile device (for testing)

## Installation & Setup

### Owner App

1. Navigate to the Owner App directory:
   ```bash
   cd OwnerApp_G03/OwnerApp_G03
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Renter App

1. Navigate to the Renter App directory:
   ```bash
   cd RenterApp_G03/RenterApp_G03
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

For both applications:

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## Development Status

Both applications are currently in initial development stage with basic Expo boilerplate setup. The main App.js files contain starter templates ready for development.

## Project Configuration

Each app includes:
- **App Icons**: Custom icons for iOS, Android, and web platforms
- **Splash Screens**: Loading screens for app initialization
- **Cross-platform Support**: Configured for iOS, Android, and web deployment
- **Adaptive Icons**: Android adaptive icon support

## Getting Started with Development

1. Choose either the Owner App or Renter App directory
2. Follow the installation steps above
3. Scan the QR code with Expo Go app or run on simulator
4. Start editing the App.js file to begin development

## Team

Group 3 - RentEV Development Team

## License

This project is private and intended for educational purposes.