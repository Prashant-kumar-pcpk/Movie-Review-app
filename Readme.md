
# 🎬 Movie Review App

A modern and interactive **Movie Review Application** built using React JS. This app allows users to browse movies, search and filter them, view detailed information, and rate movies using a star-based system.

---

## 🚀 Live Demo

👉 *(Add your deployed link here – Netlify )*

---

## 📌 Project Overview

The Movie Review App focuses on:

* Displaying movie data in a clean UI
* Handling user input (search, filter, rating)
* Managing state using React Hooks
* Providing an engaging user experience

---

### 🎥 Movie Listings

* Display a collection of movies
* Show:

  * Movie title
  * Poster image
  * Release year
  * Genre
* Responsive grid layout for all screen sizes

---

### 🔍 Search & Filter

* Search movies by title in real-time
* Filter movies based on:

  * Genre
  * Year
  * Rating
* Instant UI updates

---

### 📄 Movie Details

* Click on a movie card to view:

  * Description
  * Cast
  * Director
  * Runtime
  * Release date
* Clean and readable layout

---

### ⭐ Rating System

* Rate movies using a 1–5 star system
* Display average rating
* Dynamic UI updates based on user rating

---

### 👤 User Experience

* Smooth browsing experience
* Easy navigation
* Interactive UI
* Mobile-friendly design

---

## 🛠️ Tech Stack

* ⚛️ React JS
* 🎨 Tailwind CSS
* 🪝 React Hooks (useState, useEffect)
* 🌐 OMDB API / Mock JSON Data

---

## 📁 Folder Structure

```bash
movie-review-app/
│── src/
│   ├── components/    
│   │   ├── MovieCard.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Filter.jsx
│   │   └── Rating.jsx
│   ├── data/
│   │   └── movies.jsx
│   ├── hooks
│   │   ├── userPersistedRating.jsx
│   ├── layout
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   ├── services
│   │   ├── omdb.jsx
│   ├── utils
│   │   └── rating.jsx  
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
│── index.html
│── package-lock.json
│── package.json
│── README.md
│── postcss.config.cjs
│── tailwind.config.js
│── vite.config.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/movie-review-app.git
```

---

### 2️⃣ Navigate to Project

```bash
cd movie-review-app
```

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

👉 Open in browser:

```
http://localhost:5173
```

---

## 🌐 API Integration (Optional)

You can use:

### 🎬 OMDB API

* Get movie data dynamically
* Requires API key

Example:

```js
fetch(`https://www.omdbapi.com/?s=batman&apikey=------`)
```
i am creating the omdb.js file but we can't use this api in this project. 
---

### 📦 Mock Data

* Use local JSON file
* Faster development
* No API dependency

---

## 🎨 UI Highlights

* Responsive design 📱
* Tailwind-based styling 🎨
* Smooth hover effects ✨
* Clean card layout 🎴
* Gradient backgrounds 🌈

---

## 🧠 Key Concepts Used

* React Component Structure
* State Management (useState)
* Side Effects (useEffect)
* Props Passing
* Conditional Rendering
* Event Handling

---

## 🚀 Future Enhancements

* 💬 User reviews/comments
* 🌍 Full API integration
* 🎞 Pagination / Infinite scroll

---

## 📸 Screenshots

👉 *(Add screenshots here)*

---

## 👨‍💻 Author

**Prashant Kumar**

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork the project
* 📢 Share with others

---
