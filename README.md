<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# QRestro - Bankend NestJS

> **QResto** is a multilingual digital menu backend built with NestJS and MongoDB. It enables restaurants and similar venues to manage their menus, sections, and items with full internationalization (i18n) support, secure user authentication, customizable themes, and public menu access via unique slugs or QR codes.

---

## 📘 API Documentation (Swagger)

This project includes built-in, auto-generated API documentation using [Swagger](https://swagger.io/), available at:

```
http://localhost:3000/api/docs
```

The Swagger UI provides:

* 📦 Full list of endpoints with parameters and responses
* 🔐 Support for JWT Bearer authentication
* 🌐 Multilingual request examples for menus, venues, sections, and items

> **Note:** After authentication, click the **"Authorize"** button and paste your JWT token as:

```
Bearer <your-token>
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

> **Note:** Replace the commented out values with your actual Google credentials when using Google authentication.

```env
MONGO_URI=mongodb://localhost:27017/qresto
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=647621593846-2e2q95e4dcdjmvs47k077e61vktg7otp.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
APP_BASE_URL=https://yourapp.com
```

## 🧩 Backend Module Overview – QResto

QResto is a modular NestJS backend for managing digital menus for restaurants, cafes, and similar venues. The system is built for scalability, maintainability, and extensibility.

---

## 🧱 Core Modules & Responsibilities

### 🧑‍💼 `UsersModule`

**Purpose:** Manages application users.

| Component         | Responsibility                                   |
| ----------------- | ------------------------------------------------ |
| `user.schema.ts`  | Defines user fields, roles, and auth source info |
| `user.service.ts` | Lookup and manage user data                      |
| `user.module.ts`  | Registers user schema and logic                  |

**Used by:** `AuthModule`, `VenueModule`

---

### 🔐 `AuthModule`

**Purpose:** Handles authentication (Google login + JWT).

| Component            | Responsibility                                          |
| -------------------- | ------------------------------------------------------- |
| `auth.service.ts`    | Verifies Google ID tokens, issues JWTs, manages login   |
| `auth.controller.ts` | Exposes login endpoints (`/auth/google`, `/auth/login`) |
| `auth.module.ts`     | Registers services and JWT strategy                     |

**Used by:** Protects all secure routes with `@UseGuards(AuthGuard('jwt'))`

---

### 🏪 `VenuesModule`

**Purpose:** Manages venue creation and configuration.

| Component             | Responsibility                                               |
| --------------------- | ------------------------------------------------------------ |
| `venue.schema.ts`     | MongoDB model for each venue (name, slug, logo, owner, etc.) |
| `venue.service.ts`    | Handles creation, owner filtering, uniqueness, and updates   |
| `venue.controller.ts` | API endpoints for managing venues (`/venues`)                |
| `venue.module.ts`     | Registers schema, controller, and service                    |

#### `venues` Collection

```ts
@Schema()
export class Venue {
  @Prop({ type: Map, of: String, required: true })
  name: Map<string, string>;
  @Prop({ type: Map, of: String })
  description?: Map<string, string>;
  @Prop({ required: true, unique: true })
  slug: string;
  @Prop()
  logoUrl?: string;
  @Prop({ required: true, ref: 'User' })
  ownerId: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ required: true, default: 'en' })
  defaultLanguage: string;
}
```

---

### 📋 `MenuSectionsModule`

**Purpose:** Groups menu items under categories.

| Component                    | Responsibility                       |
| ---------------------------- | ------------------------------------ |
| `menu-section.schema.ts`     | Defines title and venue relationship |
| `menu-section.service.ts`    | CRUD for sections per venue          |
| `menu-section.controller.ts` | API for section management           |
| `menu-section.module.ts`     | Registers schema and service         |

#### `menuSections` Collection

```ts
@Schema()
export class MenuSection {
  @Prop({ type: Map, of: String, required: true })
  title: Map<string, string>;
  @Prop({ required: true, ref: 'Venue' })
  venueId: string;
  @Prop({ default: 0 })
  order: number;
  @Prop({ required: true, default: 'en' })
  defaultLanguage: string;
}
```

---

### 🍽️ `MenuItemsModule`

**Purpose:** Handles individual menu items.

| Component                 | Responsibility                                   |
| ------------------------- | ------------------------------------------------ |
| `menu-item.schema.ts`     | Defines food/drink items with price, image, etc. |
| `menu-item.service.ts`    | CRUD operations for menu items                   |
| `menu-item.controller.ts` | API for item management                          |
| `menu-item.module.ts`     | Registers schema and business logic              |

#### `menuItems` Collection

```ts
@Schema()
export class MenuItem {
  @Prop({ type: Map, of: String, required: true })
  name: Map<string, string>;
  @Prop({ type: Map, of: String })
  description?: Map<string, string>;
  @Prop()
  price?: number;
  @Prop()
  imageUrl?: string;
  @Prop({ required: true, ref: 'MenuSection' })
  sectionId: string;
  @Prop({ default: true })
  isAvailable: boolean;
  @Prop()
  order?: number;
  @Prop({ required: true, default: 'en' })
  defaultLanguage: string;
}
```

---

### 🎨 `ThemeModule` _(optional)_

**Purpose:** Manages custom styles for each venue’s public page.

| Component             | Responsibility                           |
| --------------------- | ---------------------------------------- |
| `theme.schema.ts`     | Stores primary color, font, layout       |
| `theme.service.ts`    | Create/update per venue                  |
| `theme.controller.ts` | API to modify theme from owner dashboard |
| `theme.module.ts`     | Registers theme-related logic            |

#### `themeSettings` Collection

```ts
@Schema()
export class ThemeSettings {
  @Prop({ required: true, ref: 'Venue' }) venueId: string;
  @Prop() primaryColor?: string;
  @Prop() font?: string;
  @Prop() layoutStyle?: 'classic' | 'modern' | 'compact';
}
```

---

### 🔗 Entity Relationship Diagram

```
User
  └── owns ──> Venue
                 ├── has ──> MenuSection
                 │             └── has ──> MenuItem
                 └── has ──> ThemeSettings (optional)
```

---

### 🧭 Public Route Access

- Menus available at `/[slug]`, e.g. `https://qresto.com/greek-bites`
- Public pages render:
  - Venue info
  - Menu sections & items
  - Themed appearance

---

### 🚀 Future Modules

| Module            | Purpose                              |
| ----------------- | ------------------------------------ |
| `AnalyticsModule` | Page views, menu clicks, heatmaps    |
| `QRCodesModule`   | Generate & manage QR codes per venue |
| `BillingModule`   | Stripe integration, subscriptions    |
| `MultilangModule` | i18n support for menus               |

---

## 📡 API Routes

### 🔐 Auth Routes (`/api/auth`)

- `GET /api/auth/me` – Get authenticated user info
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login with email/password
- `POST /api/auth/google` – Login with Google

---

### 🏢 Venue Routes (`/api/venues`)

- `POST /api/venues` – Create venue (accepts `name` and `description` as language maps; optional `defaultLanguage`)
- `GET /api/venues` – Get all venues (by owner) (supports `?lang=xx` to return translated fields)
- `GET /api/venues/:id` – Get single venue by ID (supports `?lang=xx` to return translated fields)
- `PATCH /api/venues/:id` – Update venue (can update base fields and add/update/remove language translations)
- `DELETE /api/venues/:id` – Delete venue

---

### 📂 Menu Section Routes (`/api/venues/:venueId/sections`)

- `POST /api/venues/:venueId/sections` – Create menu section (accepts `title` as a language map; optional `defaultLanguage`)
- `GET /api/venues/:venueId/sections` – Get all sections for venue (supports `?lang=xx` to return translated titles)
- `GET /api/venues/:venueId/sections/:id` – Get one section (supports `?lang=xx` to return translated title)
- `PATCH /api/venues/:venueId/sections/:id` – Update section (can update `order` and add/update/remove translations)
- `DELETE /api/venues/:venueId/sections/:id` – Delete section

---

### 🍽️ Menu Item Routes (`/api/venues/:venueId/sections/:sectionId/items`)

- `POST /api/venues/:venueId/sections/:sectionId/items` – Create menu item (accepts `name` and `description` as language maps; optional `defaultLanguage`)
- `GET /api/venues/:venueId/sections/:sectionId/items` – Get all items in section (supports `?lang=xx` to return translated fields)
- `GET /api/venues/:venueId/sections/:sectionId/items/:id` – Get single menu item (supports `?lang=xx` to return translated fields)
- `PATCH /api/venues/:venueId/sections/:sectionId/items/:id` – Update menu item (can update base fields and add/update/remove translations)
- `DELETE /api/venues/:venueId/sections/:sectionId/items/:id` – Delete menu item

---

### 🎨 Theme Settings (`/api/venues/:venueId/theme-settings`)

- `GET /api/venues/:venueId/theme-settings` – Get theme settings for venue
- `PATCH /api/venues/:venueId/theme-settings` – Update or create settings
- `DELETE /api/venues/:venueId/theme-settings` – Delete theme settings

---

### 🌐 Public Menu Route (`/api/menu`)

- `GET /api/menu/:slug` – Get full public menu by venue slug (supports `?lang=xx` to return translated venue, sections, and items)

---

### 📷 QR Code Routes (`/api/qrcode`)

- `GET /api/qrcode/:slug` – Returns a **PNG image** of a QR code linking to the venue’s public menu (`/menu/:slug`)

📌 The base URL used in the QR code is configured via the `.env` variable `APP_BASE_URL`

---

## ✅ API To-Do List (Next Steps)

These are the remaining tasks to polish the MVP backend for QResto:

### 🔐 Security & Validation

* [ ] Add ownership checks to all update/delete service methods
* [ ] Implement `@CurrentUser()` decorator for cleaner controller access
* [ ] Add a global exception filter to standardize error responses
* [ ] Add rate limiting using `@nestjs/throttler` for public routes (e.g., `/menu/:slug`, `/qrcode/:slug`)

### 📦 File Upload Support

* [ ] Add support for uploading images (e.g., menu item images, venue logo)

  * [ ] Local upload for dev
  * [ ] Cloud storage support (Cloudinary / S3) for production

### 📄 Pagination & Filtering

* [ ] Add pagination to `GET` endpoints:

  * [ ] `/venues`
  * [ ] `/sections`
  * [ ] `/items`
* [ ] Add sorting/filtering options (e.g., by `isAvailable` or `order`)

### ♻️ Data Handling

* [ ] Support soft deletes (`isDeleted`) instead of physical deletion
* [ ] Consider audit logging for changes (optional)

### 📈 Admin & Stats (Optional)

* [ ] Add API endpoints for analytics:

  * [ ] Menu views
  * [ ] Clicks / interactions

### 🎯 Polish & Deployment

* [ ] Add CORS config and environment-specific security rules
* [ ] Ensure HTTPS is enforced in production
* [ ] Add a health check endpoint (`/health`)
* [ ] Add Swagger response types (`@ApiOkResponse`, etc.) for better docs

