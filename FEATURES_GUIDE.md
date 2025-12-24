# New Features Guide

## 1. Enhanced Charity Fundraising System

The Charity page now includes two separate fundraising forms connected to Firebase:

### A. Sponsor Form
- **Purpose**: For organizations and individuals who want to sponsor programs
- **Fields**:
  - Full Name (required)
  - Organization (optional)
  - Email (required)
  - Phone Number (required)
  - Sponsorship Amount in ETB (required)
  - Message (optional)
- **Firebase Collection**: `sponsors`
- **Data Stored**: All form fields + timestamp + status (pending)

### B. Monthly Student Donation Form
- **Purpose**: For students who want to commit to monthly donations
- **Fields**:
  - Student Name (required)
  - Student ID (required)
  - Email (required)
  - Phone Number (required)
  - Monthly Amount in ETB (required)
  - Start Date (required)
  - Additional Notes (optional)
- **Firebase Collection**: `monthlyDonations`
- **Data Stored**: All form fields + timestamp + status (active)

### How to Access
1. Navigate to `/charity` page
2. Scroll to the "Support Our Cause" section
3. Click either "Become a Sponsor" or "Monthly Student Donation"
4. Fill out the form and submit

### Viewing Submitted Data
You can view the submitted data in your Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `humsj-external-affairs`
3. Navigate to Firestore Database
4. Look for collections: `sponsors` and `monthlyDonations`

---

## 2. External Affairs Alumni Section

A dedicated page for listing all external affairs alumni from 2000 to 2018.

### Features
- **Gender Separation**: Toggle between Male and Female alumni
- **Search Functionality**: Search by name or field of study
- **Year Filtering**: Filter alumni by graduation year (2000-2018)
- **Organized Display**: Alumni grouped by year with clean card layout

### How to Add Alumni Data

Edit the file: `src/pages/ExternalAffairs.tsx`

Find the `alumniData` object at the top of the file:

```typescript
const alumniData = {
  male: [
    { year: 2000, name: "Ahmed Ali Hassan", field: "Islamic Studies" },
    { year: 2001, name: "Mohammed Ibrahim", field: "Arabic Language" },
    // Add more male alumni here
  ],
  female: [
    { year: 2000, name: "Fatima Ahmed", field: "Islamic Studies" },
    { year: 2001, name: "Aisha Mohammed", field: "Quranic Studies" },
    // Add more female alumni here
  ]
};
```

### Data Format
Each alumni entry should have:
- `year`: Graduation year (number between 2000-2018)
- `name`: Full name of the alumnus/alumna (string)
- `field`: Field of study (string, optional)

### Example
```typescript
{ year: 2015, name: "Abdullah Rahman", field: "Islamic Jurisprudence" }
```

### How to Access
- Navigate to `/external-affairs` page
- Or click "Alumni" in the navigation menu

---

## Firebase Collections Structure

### Collection: `sponsors`
```javascript
{
  name: string,
  organization: string,
  email: string,
  phone: string,
  amount: number,
  message: string,
  createdAt: Timestamp,
  status: "pending"
}
```

### Collection: `monthlyDonations`
```javascript
{
  studentName: string,
  studentId: string,
  email: string,
  phone: string,
  monthlyAmount: number,
  startDate: string,
  notes: string,
  createdAt: Timestamp,
  status: "active"
}
```

---

## Testing the Features

### Test Charity Forms
1. Go to `http://localhost:5173/charity`
2. Click "Become a Sponsor"
3. Fill out the form with test data
4. Submit and check Firebase Console for the new entry
5. Repeat for "Monthly Student Donation"

### Test External Affairs Page
1. Go to `http://localhost:5173/external-affairs`
2. Add some test alumni data in the code
3. Test the search functionality
4. Test the year filters
5. Toggle between male and female sections

---

## Next Steps

1. **Add Alumni Data**: Collect and add all alumni names from 2000-2018
2. **Admin Dashboard**: Consider creating an admin interface to manage sponsors and donations
3. **Email Notifications**: Set up email notifications when new sponsors/donations are submitted
4. **Payment Integration**: Integrate payment gateway for online donations
5. **Export Functionality**: Add ability to export alumni lists to PDF/Excel
