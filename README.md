# GearHub Mini E-Commerce

A partner-built React + TypeScript single-page store for browsing tech accessories, filtering a product catalog, and managing a shopping cart. The application will use React's `useReducer` and `createContext` for all shared state.

## Run the project

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). 

To create a production build, run:

```bash
npm run build
```

## Current development view

The current screen is a temporary **logic playground**, not the final store design. It is there so the state work can be checked in a browser while the UI/UX is still being built.

Use it to confirm that:

- search, category, maximum-price, and sort filters update the visible catalog;
- adding the same in-stock product increases its quantity;
- the cart badge counts total quantities, not distinct products;
- quantity controls remove an item when it reaches zero;
- subtotal and grand total update with every cart change; and
- out-of-stock products cannot be added.

## Logic structure

- `src/types/index.ts` contains the shared product, state, and reducer-action contracts.
- `src/data/products.ts` is the static catalog (currently eight sample accessories).
- `src/context/index.ts` contains `cartReducer`, `CartProvider`, `useCart`, and the derived product/cart selectors.
- `src/components/LogicPlayground.tsx` is the temporary manual-check interface. It can be replaced by the final UI components while keeping the context API intact.
