#  ROOH VEERE - Perfume E-Commerce Application

A premium, high-end React Native cross-platform mobile and web application dedicated to luxury fragrances. Built using the latest React Native standards and powered by a real-time Cloud Firebase architecture, **ROOH VEERE** solves the real-world problem of delivering a seamless, minimal, and blazing-fast shopping experience for high-end digital commerce.

---

##  Live Production Deployment
The application has been successfully deployed and optimized for cross-platform web browsers. 
🔗 **Experience Luxury Live:** [https://roohveere-luxury.vercel.app](https://roohveere-luxury.vercel.app)

---

##  Core Features & Functionalities

* **Omnichannel Live Search Engine:** Features a real-time dynamic query parser that filters product nodes instantly on user input using case-insensitive string evaluation.
* **Adaptive Cross-Platform Authentication:** Secure user enrollment and session management utilizing Firebase Auth, dynamically switching persistence modules depending on the client platform (Web/Mobile).
* **Dynamic Gender-Based Catalog Filtering:** Optimized array-splitting sorting algorithms to instantaneously isolate and render "For Him" and "For Her" premium signature collections.
* **Dual-Point Decoupled Cart Insertion:** Access nodes built into both the main macro product catalog layout and micro deep-linked detail screens for maximum conversion rates.
* **Global State Management (Cart Matrix):** An internal context engine managing runtime cart vectors, computing quantities, and tracking aggregate pricing metrics linearly.
* **Live Cloud Firestore Order Ingestion:** Real-time data pipeline syncing client delivery manifests directly to a secure cloud NoSQL database structure with atomic server-side timestamps.

---

##  System Architecture & Logic Analysis

### 1. Central State Control (`CartContext.js`)
The data backbone of the application leverages the React Context API. Duplicate product entries are intercepted dynamically at runtime via a matching look-up algorithm (`.find()`). Instead of spawning layout rows, it safely updates the product matrix linearly:
$$\text{Quantity}_{\text{new}} = \text{Quantity}_{\text{current}} + 1$$

Grand totals are computed reactively across state updates using matrix reduction arrays:
$$\text{Grand Total} = \sum_{i=1}^{n} (\text{Price}_i \times \text{Quantity}_i)$$

### 2. Search Engine String Matching (`HomeScreen.js`)
The real-time catalog matrix updates on keyboard event streams by evaluating text inputs against dataset keys linearly:
```javascript
const filteredSearch = databaseProducts.filter(product => 
  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.brand.toLowerCase().includes(searchQuery.toLowerCase())
);
