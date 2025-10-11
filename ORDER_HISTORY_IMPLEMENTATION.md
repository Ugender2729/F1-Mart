# Order History Implementation Guide

## Overview

This document explains the complete implementation of order history functionality that properly saves and retrieves customer information for both authenticated and guest users.

## Key Features

### 1. Customer Information Storage
- **For Guest Users**: Customer information is stored directly in the `orders` table
- **For Authenticated Users**: Customer information is stored in both the `orders` table and linked to the `users` table
- **Fallback Mechanism**: If direct customer fields are empty, the system falls back to data in `delivery_address.customer`

### 2. Database Schema Updates

The following fields have been added to the `orders` table:
- `customer_name` (VARCHAR(255)): Full name of the customer
- `customer_email` (VARCHAR(255)): Email address of the customer
- `customer_phone` (VARCHAR(20)): Phone number of the customer

### 3. Search Functionality

The order history search supports:
- **Email Search**: Find orders by customer email address
- **Phone Search**: Find orders by customer phone number
- **Combined Search**: Search using both email and phone for more precise results

## Implementation Details

### Database Changes

1. **Schema Updates** (`database/update_orders_customer_info.sql`):
   - Makes `user_id` nullable for guest orders
   - Adds customer information fields
   - Creates proper indexes for performance
   - Updates RLS policies for guest order access
   - Adds validation constraints

2. **Customer Information Function**:
   - `get_customer_info()` function provides unified customer data access
   - Prioritizes direct fields over nested data

### Frontend Changes

1. **Order Creation** (`app/checkout/page.tsx`):
   - Now saves customer information for both authenticated and guest users
   - Ensures consistent data structure

2. **Order History Search** (`hooks/useOrderHistory.ts`):
   - Enhanced search with proper customer data handling
   - Includes user data joins for authenticated users
   - Processes results to ensure customer information is available

3. **Order Display** (`app/order-history/page.tsx`):
   - Shows customer information clearly
   - Indicates whether order is from registered or guest user
   - Handles missing data gracefully

### TypeScript Interfaces

Updated interfaces include:
- `Order` interface with customer information fields
- `OrderHistoryResult` interface for search results
- Proper typing for all customer data

## Usage Examples

### 1. Guest User Order Creation
```typescript
const orderData = {
  user_id: null,
  customer_name: "John Doe",
  customer_email: "john.doe@gmail.com",
  customer_phone: "9876543210",
  // ... other order fields
};
```

### 2. Authenticated User Order Creation
```typescript
const orderData = {
  user_id: user.id,
  customer_name: "John Doe", // Still stored for consistency
  customer_email: "john.doe@gmail.com",
  customer_phone: "9876543210",
  // ... other order fields
};
```

### 3. Order History Search
```typescript
// Search by email
await searchOrdersByEmail("john.doe@gmail.com");

// Search by phone
await searchOrdersByMobileNumber("9876543210");

// Search by both
await searchOrdersByMobileOrEmail({
  mobileNumber: "9876543210",
  email: "john.doe@gmail.com"
});
```

## Database Setup

To implement this functionality, run the following SQL script:

```sql
-- Run the database update script
\i database/update_orders_customer_info.sql
```

## Testing

Use the provided test script to verify functionality:

```sql
-- Run the test script
\i database/test_order_history.sql
```

## Security Considerations

1. **Row Level Security (RLS)**:
   - Guest orders are accessible via customer information
   - Authenticated users can only see their own orders
   - Public access is limited to order history lookup

2. **Data Validation**:
   - Email format validation
   - Phone number format validation (10+ digits)
   - Required field constraints

## Performance Optimizations

1. **Indexes**:
   - `idx_orders_customer_email`: For email searches
   - `idx_orders_customer_phone`: For phone searches
   - `idx_orders_customer_name`: For name searches

2. **Query Optimization**:
   - Efficient joins with users table
   - Proper WHERE clauses for filtering
   - Ordered results by creation date

## Error Handling

The implementation includes comprehensive error handling:
- Database connection errors
- Invalid search parameters
- Missing customer information
- Network timeouts

## Future Enhancements

Potential improvements:
1. **Order Status Updates**: Real-time status notifications
2. **Order Tracking**: Integration with delivery services
3. **Customer Analytics**: Order history insights
4. **Bulk Operations**: Multiple order management
5. **Export Functionality**: Order data export

## Troubleshooting

### Common Issues

1. **Orders Not Found**:
   - Verify customer information is correctly saved
   - Check database constraints and RLS policies
   - Ensure proper indexing

2. **Performance Issues**:
   - Check index usage with EXPLAIN ANALYZE
   - Monitor query execution times
   - Consider additional indexes if needed

3. **Data Inconsistencies**:
   - Run the database update script
   - Verify customer information population
   - Check for missing data in existing orders

## Support

For issues or questions regarding the order history implementation:
1. Check the test script results
2. Verify database schema updates
3. Review error logs in the application
4. Test with both guest and authenticated users



