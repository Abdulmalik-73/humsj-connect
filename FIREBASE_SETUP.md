# Firebase Setup Guide for HUMSJ External Affairs

## Current Configuration

Your Firebase project is already configured in the code:
- **Project ID**: `humsj-external-affairs`
- **Collections**: `registrations_qirat`, `registrations_charity`, `registrations_dawa`

## Step 1: Publish Firestore Security Rules

To make the registration forms work, you need to publish the security rules in Firebase Console:

1. Go to: https://console.firebase.google.com/project/humsj-external-affairs/firestore/rules

2. Copy and paste these rules:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Qirat Sector Registrations
    match /registrations_qirat/{document=**} {
      // Anyone can create (register)
      allow create: if true;
      // Anyone can read (for now - change in production)
      allow read: if true;
      // No one can update or delete
      allow update, delete: if false;
    }
    
    // Charity Sector Registrations
    match /registrations_charity/{document=**} {
      // Anyone can create (register)
      allow create: if true;
      // Anyone can read (for now - change in production)
      allow read: if true;
      // No one can update or delete
      allow update, delete: if false;
    }
    
    // Da'wah Sector Registrations
    match /registrations_dawa/{document=**} {
      // Anyone can create (register)
      allow create: if true;
      // Anyone can read (for now - change in production)
      allow read: if true;
      // No one can update or delete
      allow update, delete: if false;
    }
  }
}
```

3. Click **"Publish"** button

## Step 2: Verify Firestore Database

1. Go to: https://console.firebase.google.com/project/humsj-external-affairs/firestore/databases

2. Make sure you have a Firestore database created (not Realtime Database)

3. If not created, click "Create database" and choose:
   - **Start in production mode** (we'll add rules manually)
   - **Location**: Choose closest to Ethiopia (europe-west or asia-south)

## Step 3: Test Registration Forms

1. Open your website: http://localhost:8080
2. Go to Dashboard page
3. Try submitting a registration form
4. Check Firebase Console to see if data appears in the collections

## Admin Panel Access

- **URL**: http://localhost:8080/admin
- **Password**: `humsj2024`
- **Note**: Change this password before deploying to production!

## Collections Structure

Each registration creates a document with:
- `name`: Student full name
- `studentId`: Student ID number
- `department`: Department name
- `phone`: Phone number
- `sector`: Which sector (qirat/charity/dawa)
- `sectorQuestion`: The question asked
- `sectorAnswer`: Student's answer
- `createdAt`: Timestamp

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. The current rules allow anyone to read data. For production, change to:
```
allow read: if request.auth != null;
```

2. Change the admin password in `src/pages/Admin.tsx`

3. Consider implementing Firebase Authentication for admin access

## Troubleshooting

**Forms not submitting?**
- Check if Firestore rules are published
- Check browser console for errors
- Verify Firebase project ID matches in `src/lib/firebase.ts`

**Data not appearing in Admin panel?**
- Make sure Firestore rules allow read access
- Check if collections exist in Firebase Console
- Verify internet connection

## Contact Information

- **External Affairs Amir**: Mehadi Jemal - +251 938 979 492
- **General Amir**: Musab Abdurahman - +251 925 237 453

## Sector Amirs

- **Qirat**: Mohammed Ahmadu - +251 929 230 120
- **Charity**: Muhajir Mohammed - +251 964 544 620
- **Da'wah**: Ramadan Aliyii - +251 975 309 779
