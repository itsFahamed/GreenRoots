# GreenRoots — Urban Plant & Garden Shop

A modern plant and garden eCommerce platform where users can explore and purchase rare tropicals, succulents, handcrafted pots, and precision garden tools.

## Live URL

https://green-roots-six.vercel.app/

## Key Features

- **Plant Product Catalog** — Browse 8+ curated plant essentials across 5 categories
- **Hero Slider** — Auto-rotating showcase for tropicals, succulents, and tools
- **Popular Products** — Home page highlights 3 trending items with image, rating, and pricing
- **Plant Care Tips** — Practical watering, light, and pest-prevention guidance
- **Featured Growers** — Showcase of 4 trusted plant suppliers and brands
- **Protected Product Details** — Full product detail page accessible only when logged in
- **Proxy Auth Guard** — Redirects unauthenticated users before protected routes render
- **Authentication** — Email/password via BetterAuth
- **Social Login** — Google OAuth via BetterAuth
- **User Profile** — View profile data (name, photo, email, join date)
- **Update Information** — Edit display name and profile photo URL
- **Responsive Design** — Fully responsive on mobile, tablet, and desktop
- **Emerald Botanical Theme** — Custom green palette with animate.css animations

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **DaisyUI v5**
- **BetterAuth** (email/password)
- **MongoDB** (via BetterAuth adapter)
- **animate.css** (animations)
- **react-hook-form** (form handling)
- **sonner** (toast notifications)
- **react-icons** (icons)

## npm Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework with App Router |
| `better-auth` | Authentication (email/password) |
| `@better-auth/mongo-adapter` | MongoDB adapter for BetterAuth |
| `mongodb` | MongoDB driver |
| `animate.css` | CSS animations |
| `react-hook-form` | Form state management |
| `sonner` | Toast notifications |
| `react-icons` | Icon library |
| `daisyui` | Tailwind component library |
| `tailwindcss` | Utility-first CSS |

## Environment Variables

Create a `.env.local` file in the root:

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

For Vercel (or any production deployment), set `BETTER_AUTH_URL` and
`NEXT_PUBLIC_APP_URL` to your deployed site URL, for example:

```env
BETTER_AUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

Also set the Google OAuth credentials in your deployment environment:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── (app)/
│   ├── page.jsx              # Home page (hero, popular products, care tips, brands)
│   ├── Products/             # Product catalog with search & filter
│   ├── ProductDetails/[id]/  # Protected product detail page
│   ├── Login/                # Email & password login
│   ├── Registration/         # Register with name, email, photo URL, password
│   └── Profile/
│       ├── page.jsx          # User profile page
│       └── UpdateInfo/       # Edit name & photo URL
├── Components/
│   ├── Navbar/               # Sticky navbar with auth state
│   ├── Footer/               # Footer with contact, social, links
│   ├── Banner/               # Summer sale hero slider
│   ├── HomeHighlights/       # Popular Products section
│   ├── SubjectChips/         # Category filter chips
│   └── ResourcesCatalog/     # Product grid with search & sort
├── api/
│   ├── auth/[...all]/        # BetterAuth handler
│   └── resources/            # Products API endpoint
└── globals.css               # Tailwind + DaisyUI + animate.css
```
