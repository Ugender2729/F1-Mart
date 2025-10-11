# F1 Mart - Fresh and Fast Delivery

A modern, full-stack grocery delivery application built with Next.js, Supabase, and TypeScript. F1 Mart provides fresh and fast delivery of groceries with a complete e-commerce experience.

## 🚀 Features

### 🛒 **E-commerce Functionality**
- **Product Catalog**: Browse thousands of fresh groceries
- **Smart Search**: Find products quickly with advanced filtering
- **Shopping Cart**: Add/remove items with real-time updates
- **Wishlist**: Save favorite products for later
- **Categories**: Organized product categories for easy browsing
- **Combo Deals**: 15+ curated product bundles with 20% discount 🎁
- **WhatsApp Ordering**: One-click WhatsApp chat for quick orders 💬

### 📱 **User Authentication**
- **Mobile-based Login**: Sign in with mobile number + last 6 digits
- **Guest Checkout**: Order without creating an account
- **User Profiles**: Manage personal information and preferences
- **Admin Dashboard**: Complete admin panel for store management

### 📦 **Order Management**
- **Order History**: Track all your orders with mobile number/email
- **Order Details**: Complete order information and tracking
- **Status Updates**: Real-time order status (pending, confirmed, shipped, delivered)
- **Guest Order Lookup**: Find orders using mobile number or email
- **Order Verification**: 1-minute verification window after delivery to prevent fraud 🔐
- **Feedback System**: Help us improve with structured feedback collection 💬

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Beautiful transitions and hover effects
- **Accessibility**: Built with accessibility best practices

### 🗄️ **Database & Storage**
- **Supabase Integration**: Real-time database with PostgreSQL
- **Order Storage**: Both database and localStorage backup
- **Customer Data**: Secure storage of customer information
- **Product Management**: Complete CRUD operations for products

## 🛠️ **Tech Stack**

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/f1-mart.git
   cd f1-mart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Run the SQL scripts in the `database/` folder in your Supabase SQL editor
   - Start with `schema.sql` for the basic structure
   - Run `fix_orders_table.sql` for order history functionality

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Configure WhatsApp (Optional)**
   - Open `components/WhatsAppButton.tsx`
   - Update the phone number with your WhatsApp number
   - See `WHATSAPP_CONFIGURATION.md` for detailed instructions

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 **Project Structure**

```
f1-mart/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── orders/            # Order management
│   ├── order-history/     # Order history lookup
│   ├── products/          # Product catalog
│   └── admin/             # Admin dashboard
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   ├── cart/             # Cart components
│   └── products/         # Product components
├── context/              # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility libraries
├── database/             # Database schemas and migrations
└── types/                # TypeScript type definitions
```

## 🔧 **Key Features Implementation**

### Order History with Mobile/Email
- **Database Schema**: Orders table with customer information columns
- **Search Functionality**: Find orders by mobile number or email
- **Guest Support**: Orders saved for non-registered users
- **Real-time Updates**: Order status tracking

### Mobile Authentication
- **Simple Login**: Mobile number + last 6 digits as password
- **Auto Account Creation**: Automatic user registration
- **Guest Orders**: Support for non-registered customers

### Admin Dashboard
- **Product Management**: Add, edit, delete products
- **Category Management**: Manage product categories
- **Order Management**: View and update order status
- **Analytics**: Sales and performance metrics

## 🚀 **Deployment**

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Use the `netlify-deploy/` folder
2. Follow the deployment instructions in `NETLIFY_DEPLOYMENT.md`

### Manual Deployment
1. Build the project: `npm run build`
2. Start production server: `npm start`

## 📱 **Mobile App Features**

- **Responsive Design**: Optimized for all screen sizes
- **Touch-friendly**: Mobile-first design approach
- **Fast Loading**: Optimized performance
- **Offline Support**: Basic offline functionality

## 🔒 **Security Features**

- **Input Validation**: Comprehensive form validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Sanitized user inputs
- **Secure Authentication**: Supabase Auth integration

## 📊 **Database Schema**

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  items JSONB,
  total DECIMAL(10,2),
  status VARCHAR(50),
  payment_method VARCHAR(50),
  delivery_address JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 **Support**

For support, email help@f1mart.com or create an issue in the GitHub repository.

## 🎯 **Roadmap**

- [x] WhatsApp integration for quick orders ✅
- [x] Combo deals with 20% discount ✅
- [x] Order verification system (1-minute window) ✅
- [x] Customer feedback collection system ✅
- [ ] Custom combo builder
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Inventory management
- [ ] Delivery tracking
- [ ] WhatsApp Business API for automated responses

---

**F1 Mart** - Fresh and Fast Delivery 🚀