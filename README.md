# 🎬 Tickitz – Cinema Booking App (ReactJS)

**Tickitz** is a sleek and responsive movie booking app built with **React**. Powered by the [TMDB API](https://www.themoviedb.org/documentation/api), it offers a smooth and intuitive cinema discovery experience.

Built using modern tools like **React Router** and **Vite**, Tickitz combines dynamic data with a clean and modular UI.

---

## 📸 Preview

| Home | Upcoming | Now Showing | Movie Detail |
|------|----------|-------------|---------------|
| ![Home](public/assets/homepage.png) | ![Upcoming](public/assets/upcoming.png) | ![Now Showing](public/assets/nowshowing.png) | ![Movie Detail](public/assets/moviedetail.png) |

---

## ✨ Features

- 🔥 **Now Playing Section**  
  View movies currently in cinemas, including posters, titles, and two genre tags.

- 🎯 **Upcoming Movies Section**  
  Discover upcoming releases with release dates and dynamic genre filters.

- 🎞️ **Movie List Page**  
  Browse a full grid of movies dynamically fetched from the TMDB API.

- 🔍 **Movie Details Page**  
  View detailed information for each movie using clean route structures.

- 👤 **User Authentication**  
  Sign up, log in, and manage sessions with basic authentication flow.

- 🎟️ **Buy Tickets**  
  Choose and book movie tickets directly through the app.

- 📝 **Edit Profile**  
  Update user details like name, email, or password in the profile section.

- 📜 **Transaction History**  
  View past ticket purchases and booking history from the user profile.

- 📱 **Responsive UI**  
  Optimized for desktop and mobile viewing with tailwind CSS.

---

## 🚀 Getting Started

### 📦 Manual Setup

#### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Git](https://git-scm.com/)

#### 2. Clone the repository

```bash
git clone https://github.com/ranandasatria/fgo24-react-tickitz.git
cd fgo24-react-tickitz
```

#### 3. Install dependencies

```bash
npm install
```

> 💡 You can use `npm ci` if you want a clean install based on the lock file.

#### 4. Start the development server

```bash
npm run dev
```

Your app should now be running at:

```
http://localhost:8080
```

#### 5. (Optional) Build for production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

### 🐳 Docker Setup (Optional)

#### 1. Build the Docker image

```bash
docker build . -t tickitz-app
```

#### 2. Run the container

```bash
docker run -d -p 8080:80 tickitz-app
```

#### 3. Open your browser

```
http://localhost:8080
```

> 💡 Stop the container with:
> ```bash
> docker ps
> docker stop <container_id>
> ```

---

## 🛠️ Dependencies

- **React** – Core UI framework  
- **React Router** – Navigation and routing  
- **Vite** – Lightning-fast bundler and dev server  
- **TMDB API** – Movie database and metadata  
- **Tailwind-inspired CSS** – Utility-first styling for responsive UI 

---

## 🤝 How to Contribute

Want to improve or extend the project?

1. **Fork** this repo
2. Create a **feature branch**  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**  
   ```bash
   git commit -m "Add: Your feature name"
   ```
4. **Push your branch**  
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** and describe your changes

---

## 📄 License

This project is licensed under the **MIT License**.  


---

## 🏷️ Credits

Movie data provided by [TMDB API](https://www.themoviedb.org/documentation/api).  
This project is developed for learning and educational purposes.

---

## ©️ Copyright

&copy; 2025 Kodacademy

