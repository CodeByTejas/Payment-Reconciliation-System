# **Payment Reconciliation System**

A robust and feature-rich system designed to streamline the payment reconciliation process. This project offers advanced analytics, secure authentication, and user-friendly UI/UX enhancements to provide a complete solution for managing and reconciling financial data.

---

## **Features**

### **1. Custom Hook Implementation**
- `usePaymentQueries` to handle all database and query-related logic.
- Separation of concerns for better maintainability.
- Simplified components by offloading complex logic to hooks.

### **2. Authentication System**
- **Login/Logout functionality** with session management.
- **Protected routes** to secure sensitive operations.
- Default admin credentials:  
  **Username**: `admin`  
  **Password**: `admin`.
- Role-based access control (Admin/User roles).

### **3. Analytics Dashboard**
- **Interactive charts** for insights using `Chart.js`:
  - Monthly payment trends.
  - Total amount statistics.
  - Paid vs unpaid amounts.
- **Audit trail**:
  - Logs all user activities with timestamps.
  - Tracks system actions for accountability.

### **4. Enhanced Security**
- Secure routes and role-based access.
- User session management with expiry checks.
- Data validation and improved error handling.

### **5. Database Enhancements**
- User management tables with foreign key relationships.
- Audit logging for tracking actions.
- Improved data integrity with constraints.

### **6. Improved UI/UX**
- Toast notifications for actions.
- Loading states for better user feedback.
- Responsive design improvements.

---

## **Installation**

### **Prerequisites**
- Node.js and npm installed.
- A SQL-compatible database (e.g., MySQL/PostgreSQL).
- A Git client.

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/CodeByTejas/Payment-Reconciliation-System.git
   cd Payment-Reconciliation-System
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database:
   - Set up the database schema as per the `schema.sql` file provided in the repo.
   - Update database credentials in the `.env` file.

4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## **Usage**

### **1. Authentication**
- Log in using the default admin credentials or register as a new user.
- Navigate to protected routes based on role permissions.

### **2. Reconciliation Process**
- Upload payment and invoice data.
- The system will automatically reconcile data and display results in the dashboard.

### **3. Analytics Dashboard**
- Access insights such as monthly trends, paid/unpaid visualizations, and overall statistics.

### **4. Audit Trail**
- View logs of all user actions and system events.

---

## **Outputs**

Sample results from the application are available in the `results` folder:

1. **Output 1**:.
2. **Output 2**:

---

## **Technologies Used**
- **Frontend**: React.js, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL/PostgreSQL
- **Charts**: Chart.js
- **Styling**: CSS, Tailwind CSS

---

## **Future Improvements**
- Integrate more payment gateways for data import.
- Add support for multiple currencies.
- Extend analytics with AI/ML-driven insights.

---

## **Contributing**
Contributions are welcome! Please fork the repository, make your changes, and create a pull request.

---

## **License**
This project is licensed under the MIT License.

---

## **Contact**
For any queries, reach out to:  
**Tejas Sanjay Gupta**  
[GitHub Profile](https://github.com/CodeByTejas)
