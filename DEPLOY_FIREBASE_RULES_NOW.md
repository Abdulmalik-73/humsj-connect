# 🚨 DEPLOY FIREBASE RULES NOW

## Why CRUD Operations Are Not Working

The delete and update operations are failing because Firebase security rules are blocking them.

## ✅ Quick Fix (5 Minutes)

### Step 1: Open Firebase Console
Go to: https://console.firebase.google.com/

### Step 2: Select Your Project
Click on: **humsj-external-affairs**

### Step 3: Go to Firestore Rules
1. Click "Firestore Database" in left sidebar
2. Click "Rules" tab at the top

### Step 4: Copy These Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Qirat Sector Registrations
    match /registrations_qirat/{document=**} {
      allow create: if true;
      allow read: if true;
      allow update: if true;
      allow delete: if true;
    }
    
    // Charity Sector Registrations
    match /registrations_charity/{document=**} {
      allow create: if true;
      allow read: if true;
      allow update: if true;
      allow delete: if true;
    }
    
    // Da'wah Sector Registrations
    match /registrations_dawa/{document=**} {
      allow create: if true;
      allow read: if true;
      allow update: if true;
      allow delete: if true;
    }
    
    // Sponsors
    match /sponsors/{document=**} {
      allow create: if true;
      allow read: if true;
      allow update: if true;
      allow delete: if true;
    }
    
    // Monthly Donations
    match /monthlyDonations/{document=**} {
      allow create: if true;
      allow read: if true;
      allow update: if true;
      allow delete: if true;
    }
  }
}
```

### Step 5: Publish
Click the blue "Publish" button

### Step 6: Test
1. Go to your admin panel: `/admin`
2. Try to delete a user
3. Should work now! ✅

## 📸 Visual Guide

```
Firebase Console
    ↓
Select "humsj-external-affairs"
    ↓
Click "Firestore Database"
    ↓
Click "Rules" tab
    ↓
Paste the rules above
    ↓
Click "Publish"
    ↓
Done! ✅
```

## ⏱️ Time Required
**5 minutes**

## 🎯 Result
- ✅ Edit users will work
- ✅ Delete users will work
- ✅ Update sponsors will work
- ✅ Delete donations will work

---

**This is the ONLY step needed to fix CRUD operations!**
