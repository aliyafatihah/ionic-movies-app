# 🎬 Movie App (Cerita)

A mobile application that allows users to search for movies, save their favourites, and manage personal notes for future reference.

The app integrates with the OMDb API for movie search and uses Firebase Realtime Database to store liked movies and user-added descriptions.

---

## ✨ Features

- Search movies using the OMDb API
- Like and unlike movies
- View saved movies in a dedicated page
- Add, edit, and delete personal descriptions for saved movies
- Real-time data storage using Firebase Realtime Database

---

## 🧠 What This Project Demonstrates

- API integration and dynamic search functionality
- State management across multiple pages
- CRUD operations with Firebase Realtime Database
- Reusable components and services
- Navigation using tabs, pages, and modals

---

## 📱 App Structure

The app consists of:
- 6 pages
- 2 modal components
- 1 service

### Pages Overview

**Home Page (Tabs)**
- Contains two tabs:
  - Cerita Page
  - Saved Page

**Cerita Page**
- Search bar for movie queries
- Filter functionality
- Displays movie results from the OMDb API
- Each movie row includes:
  - Poster
  - Title
  - Release year
  - Heart (like/unlike) button

**Cerita Details Page**
- Displays detailed movie information
- Includes a heart button to save or remove the movie

**Saved Page**
- Displays all liked movies stored in Firebase
- Each item includes:
  - Edit button
  - Dislike (remove) button

**Saved Movie Details Page**
- Allows users to:
  - Add or edit a personal description
  - Update saved movie details

---

## ❤️ Like / Unlike Behaviour

- Pressing the outline heart:
  - Saves the movie to Firebase
  - Changes the heart icon to filled

- Pressing the filled heart:
  - Removes the movie from Firebase
  - Changes the heart icon back to outline

This behaviour is consistent across both the movie list and movie details pages.

---

## 🛠 Tech Stack

- Ionic / Angular
- TypeScript
- OMDb API
- Firebase Realtime Database

---

## 📸 Screenshots

_Coming soon_

---

## 🚀 How to Run the Project

1. Clone the repository
   ```bash
   git clone https://github.com/aliyafatihah/ionic-movies-app.git
2. Install dependencies
   ```bash
   npm install
3. Run the app
   ```bash
   ionic serve
