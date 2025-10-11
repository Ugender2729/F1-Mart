# WhatsApp Integration Configuration

## Overview
F1 Mart now includes a floating WhatsApp button that allows customers to quickly reach out and place orders via WhatsApp chat.

## Features
- ✅ Floating button with pulse animation
- ✅ Hover tooltip with call-to-action
- ✅ Mobile-optimized bottom banner
- ✅ Pre-filled message for easy ordering
- ✅ Opens WhatsApp web/app based on device

## How to Configure

### 1. Update WhatsApp Phone Number

Open `components/WhatsAppButton.tsx` and update the phone number:

```typescript
// Line 10-11
const phoneNumber = '919876543210'; // Change this to your number
```

**Format:** Country code (91 for India) + 10-digit mobile number without spaces or special characters

**Examples:**
- `919876543210` for +91 9876543210
- `918123456789` for +91 8123456789
- `917001234567` for +91 7001234567

### 2. Customize Welcome Message

Update the pre-filled message that appears when users click the button:

```typescript
// Line 12
const message = encodeURIComponent('Hi! I want to place an order from F1 Mart 🛒');
```

**Examples:**
- `'Hello! I need help with my order'`
- `'Hi! I want to order groceries'`
- `'Hello, I have a question about your products'`

### 3. Customize Button Appearance

#### Change Colors
```typescript
// Line 31 - Button colors
bg-gradient-to-br from-green-400 to-green-600
hover:from-green-500 hover:to-green-700
```

Available color schemes:
- **Green** (WhatsApp default): `from-green-400 to-green-600`
- **Blue**: `from-blue-400 to-blue-600`
- **Purple**: `from-purple-400 to-purple-600`
- **Orange**: `from-orange-400 to-orange-600`

#### Change Position
```typescript
// Line 24 - Position
className="fixed bottom-6 right-6 z-50"
```

Options:
- Bottom right: `bottom-6 right-6`
- Bottom left: `bottom-6 left-6`
- Top right: `top-6 right-6`
- Top left: `top-6 left-6`

### 4. Disable Mobile Banner (Optional)

If you want only the floating button without the mobile bottom banner, remove or comment out this section in `components/WhatsAppButton.tsx`:

```typescript
// Lines 46-58
{/* Mobile Sticky Bottom Banner - Alternative for mobile users */}
<div className="md:hidden fixed bottom-0 left-0 right-0 z-40...">
  ...
</div>
```

## Testing

### Test on Different Devices

1. **Desktop Browser**
   - Click the button → Opens WhatsApp Web
   - Ensure the correct number and message appear

2. **Mobile Browser**
   - Click the button → Opens WhatsApp app
   - Test both floating button and bottom banner

3. **Without WhatsApp**
   - Should prompt to install WhatsApp or open web.whatsapp.com

## WhatsApp Business API (Optional Upgrade)

For advanced features like automated responses, chatbots, and analytics, consider upgrading to WhatsApp Business API:

1. **WhatsApp Business Account**
   - Sign up at [business.whatsapp.com](https://business.whatsapp.com)
   - Verify your business

2. **Integration Options**
   - Twilio WhatsApp API
   - MessageBird
   - 360dialog
   - Official WhatsApp Business API

3. **Benefits**
   - Automated greetings
   - Quick replies
   - Order tracking via WhatsApp
   - Analytics and insights

## Best Practices

1. **Response Time**
   - Monitor WhatsApp messages regularly
   - Set up auto-replies for off-hours
   - Target response time: < 5 minutes

2. **Message Templates**
   - Create templates for common queries
   - Product catalogs
   - Order confirmations
   - Delivery updates

3. **Customer Service**
   - Train staff on WhatsApp etiquette
   - Use proper formatting (bold, italic)
   - Share product images/videos
   - Send location for delivery updates

## Troubleshooting

### Button Not Appearing
- Check if `WhatsAppButton` is imported in `app/layout.tsx`
- Clear browser cache and reload
- Check browser console for errors

### Wrong Number Format
- Ensure no spaces, hyphens, or special characters
- Must start with country code (91 for India)
- Total length: 12 digits (91 + 10 digits)

### Not Opening WhatsApp
- Check if phone number is correct
- Verify the number is active on WhatsApp
- Test the direct link: `https://wa.me/919876543210`

## Support

For issues or questions:
- Email: support@f1mart.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/f1-mart/issues)

---

**Happy Chatting! 💬**

