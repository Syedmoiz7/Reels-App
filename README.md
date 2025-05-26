# Instagram Reels Clone App (React Native)

This is a React Native application that replicates the basic functionality of Instagram Reels. It includes user authentication using `react-native-firebase`, and a vertical scrollable video feed similar to Instagram Reels, built using Redux Toolkit, Firebase Authentication, and React Native Video.

## 📱 Features

- 🔐 **User Authentication**
  - Register/Login using email and password
  - Firebase Authentication via `@react-native-firebase/auth`
  - Auth state management with Redux Toolkit

- 🎥 **Reels Feed**
  - Scrollable list of vertical full-screen videos
  - Each reel includes: username, caption, like/comment/share icons
  - UI styled closely to Instagram Reels

- 🔄 **User Session**
  - Auth state is persistent
  - Logged-in users see Reels
  - Users can sign out and will be redirected to login

## 🛠️ Tech Stack

- **React Native**
- **React Navigation**
- **Redux Toolkit**
- **Firebase Auth** (`@react-native-firebase/auth`)
- **Video Player** (`react-native-video`)
- **Animations** (`react-native-reanimated`)
- **Vector Icons** (`react-native-vector-icons`)
- **TypeScript**

