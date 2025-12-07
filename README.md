# Fynd E-Commerce Website

## Localhost URL

Visit the website at: [http://localhost:6001/](http://localhost:6001/)

---

## Getting Started

### Dependency Installation

```bash
npm install
```

### Start Command

```bash
npm run dev
```

The site will run at http://localhost:6001/

---

## Page Overview

### Home Page (`src/pages/Home.jsx`)
- This is the main landing page.
- Displays a gradient header with a search bar and a sticky navbar for categories ("All" by default).
- When "All" is active, shows 10 products per category with cards and no filters/pagination.
- Typing in the search bar uses **debouncing** to fetch real-time autocomplete suggestions.
- Selecting any category or entering a search triggers the filters and shows products in a grid, sortable and paginated.

### Product Info Page (`src/pages/ProductInfo.jsx`)
- Shows detailed information for a specific product.
- Includes title, all images in a gallery, category, description, price, discount, and final price.
- "Buy Now" button transitions to the order confirmation page.

### Order Placed Page (`src/pages/OrderPlaced.jsx`)
- Presents an order success animation and message.
- Instructs user that an order confirmation email was sent and redirects to home after a short pause.

---

## Key Features

- **Debouncing for Autocomplete**: The search input uses intelligent debouncing to limit autocomplete suggestions to meaningful user input, reducing unnecessary API calls.
- **Filters and Sort By**: Filter products by min/max price, minimum discount, and sort results by price, discount, or newest. All filters and sorts reflect in the URL for easy sharing/bookmarking.
- **Category Navigation**: Sticky responsive navbar with "All" and available categories always visible.
- **Responsive UI**: Modern responsive design with professional use of Tailwind CSS.
- **Loading states**: All network actions show spinners (full-screen or in-button) for great UX.

---

## Example Website Images

View example screenshots here:
[Google Drive Folder](https://drive.google.com/drive/folders/1WcR7JDJmNyPG2X7lxANlwhh91-cIcfoB)
