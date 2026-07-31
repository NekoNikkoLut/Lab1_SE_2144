# GearHub — Detailed Notes

This file contains a deeper look at the GearHub mini e-commerce lab project: features, architecture, state management, and design decisions. For quick setup instructions, see **[README.md](./README.md)**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Using the App](#using-the-app)
- [Project Structure](#project-structure)
- [How State Management Works](#how-state-management-works)
- [Testing](#testing)
- [Design Notes](#design-notes)

## Features

- **Product catalog** — 13 pre-loved items across Gaming, Phones, Cameras, Audio, Laptops, Tablets, and more (11 in stock, 2 sold out).
- **Live search** — search bar in the header filters the catalog as you type (brands, gadgets, anything in the product name).
- **Filter sidebar** — narrow the catalog by category, maximum price slider, and sort (price ↑/↓, title).
- **Product detail modal** — click any card to view the full description and an image gallery (thumbnails for products with multiple photos).
- **Shopping cart drawer** — slides in from the right; adjust quantities, remove items, and see the subtotal update live.
- **Cart badge** — the header badge counts **total quantities** (e.g., two of the same item counts as 2), not distinct products.
- **Stock awareness** — in-stock items are labeled *Available*; out-of-stock items show *Sold out*, can't be added, and can't be clicked through to detail.
- **Toast notifications** — a bottom-center toast confirms *"<product> added to cart!"* and a confirmation on checkout.
- **Simulated checkout** — pressing Checkout clears the cart and marks the purchased items as **sold out** for the rest of the session. Refreshing the page resets everything.
- **Responsive layout** — the filter sidebar collapses into a toggle button on mobile; works down to 320px.

## Tech Stack

| Layer        | Technology |
|--------------|------------|
| Framework    | React 19 (Create React App / react-scripts 5.0.1) |
| Language     | TypeScript 4.9.5 |
| Styling      | CSS Modules (`*.module.css`) + CSS custom properties |
| Icons        | `react-icons` (Feather set) |
| State        | Built-in `useReducer` + `createContext` |
| Fonts        | Chakra Petch (display), IBM Plex Sans (body), IBM Plex Mono (utility) |

## Using the App

1. **Browse** — the home page shows the full catalog as product cards (photo, category, name, price, stock status).
2. **Search / filter** — type in the header search box, or use the sidebar to filter by category and max price, and sort the results.
3. **Inspect a product** — click any *Available* card to open the detail modal with description and image thumbnails.
4. **Add to cart** — click **Add to cart** on a card or in the detail modal. A toast confirms it, and the header badge updates.
5. **Review your cart** — click the cart icon (top right) to open the drawer. Bump quantities with **+ / −**, or **Clear cart** to empty it.
6. **Checkout** — press **Checkout**. A confirmation toast appears, the drawer closes, and the purchased items flip to *Sold out* in the grid.
7. **Reset** — refresh the page to restore the original catalog and cart.

> **Tip:** after checkout the items you bought show as *Sold out* until you refresh — this is intended to simulate stock going down without a real backend.

## Project Structure

```
├── public/
│   ├── index.html            # HTML entry (fonts, favicon, theme-color)
│   ├── favicon.svg|png       # generated icons (ticketed-gear mark)
│   ├── icon-192.png|512.png  # PWA icons referenced by manifest.json
│   ├── manifest.json         # PWA manifest
│   └── images/               # local product photos
├── scripts/
│   └── generate-icons.js     # Node script that generates the SVG/PNG icons + logo path
└── src/
    ├── index.tsx             # React entry — mounts <App />
    ├── App.tsx               # Page layout + providers (renders Header, Filters, grid, drawer, toasts)
    ├── App.test.tsx          # smoke test for the storefront
    ├── index.css             # global tokens/theme + base styles
    ├── types/index.ts        # shared types: Product, CartItem, Filters, State, CartAction, Toast
    ├── data/products.ts      # the static product catalog (13 items)
    ├── context/index.ts      # cartReducer, CartProvider, useCart/useToast hooks, selectors
    └── components/
        ├── Header.tsx        # sticky header: logo, search, cart button + badge
        ├── Filters.tsx       # sidebar filters (category, price, sort) + mobile toggle
        ├── ProductGrid.tsx   # responsive grid of ProductCard
        ├── ProductCard.tsx   # individual product tile with add-to-cart
        ├── ProductDetail.tsx # modal with description + image gallery
        ├── CartDrawer.tsx    # sliding cart panel (quantities, subtotal, checkout)
        ├── CartItem.tsx      # one line in the cart with +/- controls
        ├── ToastHost.tsx     # bottom-center toast notifications
        ├── DropDown.tsx      # custom sort dropdown
        └── GearHubLogo.tsx   # SVG "ticketed gear" logo
```

## How State Management Works

Everything lives in **one reducer + context** (see `src/context/index.ts`):

- **`cartReducer(state, action)`** — a pure function handling every action: `ADD_TO_CART`, `REMOVE_FROM_CART`, `UPDATE_QUANTITY`, `CLEAR_CART`, `CHECKOUT`, filter setters, `TOGGLE_CART`, `SET_SELECTED_PRODUCT`, and `ADD/REMOVE_TOAST`.
- **`CartProvider`** — wraps the app in `<CartContext.Provider>`.
- **`useCart()`** — hook giving components access to `{ state, dispatch }`.
- **`useToast()`** — hook that fires a toast notification with a generated id.
- **Selectors** — pure helpers such as `getFilteredProducts`, `getCartItemCount`, `getCartSubtotal`, and `getCartGrandTotal`.

### Key behaviors

| Rule | Where enforced |
|------|----------------|
| Cart badge = total quantities, not distinct products | `getCartItemCount` |
| Out-of-stock products can't be added to the cart | `ADD_TO_CART` guard + disabled buttons |
| Setting a quantity to 0 removes the item | `UPDATE_QUANTITY` |
| Checkout clears the cart and marks purchased items sold out (in-memory) | `CHECKOUT` |
| Sold-out state resets on page refresh | reducer state only (no persistence) |
## Design Notes

- **Dark "depot spec-sheet" aesthetic** 
- **Custom branding** 
- **Accessibility** 
- **Prices**
---

*SE 2144.*
