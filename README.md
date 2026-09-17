# signWizardProject


# 🚀 Enterprise Multi-Step Signup Wizard

An industrial-grade, highly polished multi-step onboarding wizard web application built with modern frontend practices, robust real-time validation, and high-end glassmorphism styling.

---

## ✨ Key Features

* **Progressive Multi-Step Workflow:** Clean, seamless transitions across setup screens (Welcome, Terms & Conditions, Account Credentials, Personal Details, Location Preferences, and Review Summary).
* **Real-time Field Validation:** Instant Regex and boundary checks for email format, password strength, and length requirements with immediate error feedback.
* **Smart Edge-Case Handling:** Dynamic warning notifications triggered based on user input (e.g., detecting user age under 18 to display a parental consent advisory notice).
* **Cross-Field Dependencies:** Dynamic state-to-city synchronization where selecting a specific region instantly unlocks and populates matching local city options.
* **Async Submission & Loading States:** Simulated network latency with interactive button text changes and an animated CSS loading spinner to prevent duplicate submissions.
* **Modern Glassmorphism UI:** Frosted-glass card design paired with a custom background layout and smooth transition animations for a professional SaaS feel.

---

## 🛠️ Tech Stack

* **Markup:** HTML5 (Semantic elements, accessible labels)
* **Styling:** Plain CSS3 (Custom properties/variables, Flexbox, backdrop-filter glassmorphism, responsive media handling)
* **Logic:** Vanilla JavaScript (ES6 Modules architecture, native state management object)

---

## 📂 Project Structure

```text
├── index.html       # Main application markup and container structure
├── styles.css       # Complete stylesheet, glassmorphism layout, and animations
└── script.js        # Core wizard logic, validation functions, and event handlers