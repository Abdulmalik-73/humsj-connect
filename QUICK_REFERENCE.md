# Quick Reference Guide

## 🚀 Quick Start

### Run Development Server
```bash
cd humsj-connect-main
npm run dev
```
Visit: `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🔑 Admin Access

**URL**: `/admin`  
**Password**: `humsj2024`

## 📍 All Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with overview |
| Qirat | `/qirat` | Qirat sector information |
| Charity | `/charity` | Charity sector + fundraising forms |
| Da'wah | `/dawa` | Da'wah sector information |
| Alumni | `/external-affairs` | Alumni listing (2000-2018) |
| Dashboard | `/dashboard` | User registration portal |
| Admin | `/admin` | Admin panel (password protected) |

## 🎯 Key Features

### 1. Charity Fundraising
- **Sponsor Form**: Organizations/individuals can sponsor
- **Monthly Donations**: Students can commit to monthly giving
- **Location**: `/charity` page, scroll to "Support Our Cause"

### 2. External Affairs Alumni
- **Male/Female sections**: Toggle between genders
- **Search**: By name or field of study
- **Filter**: By year (2000-2018)
- **Add Data**: Edit `src/pages/ExternalAffairs.tsx`

### 3. Admin Panel
- **View**: All registrations, sponsors, donations
- **Edit**: Update user information
- **Delete**: Remove records
- **Add**: Manually add new users
- **Export**: Download CSV files
- **Status**: Update sponsor/donation status

## 📝 Form Validation

### Registration Forms
- **Name**: 2-100 characters (accepts numbers)
- **Student ID**: Any format, 1-50 characters
- **Department**: 2-100 characters
- **Phone**: 10-20 characters

### Sponsor Form
- **Name**: Required
- **Organization**: Optional
- **Email**: Required, valid email
- **Phone**: Required
- **Amount**: Required, number

### Monthly Donation Form
- **Student Name**: Required
- **Student ID**: Required, any format
- **Email**: Required, valid email
- **Phone**: Required
- **Monthly Amount**: Required, number
- **Start Date**: Required, date

## 🔥 Firebase Collections

- `registrations_qirat` - Qirat participants
- `registrations_charity` - Charity volunteers
- `registrations_dawa` - Da'wah participants
- `sponsors` - Sponsor applications
- `monthlyDonations` - Monthly donations

## 📊 Admin Operations

### Add User
1. Click "Add User" button
2. Select sector
3. Fill form
4. Submit

### Edit User
1. Click pencil icon
2. Update fields
3. Save changes

### Delete Record
1. Click trash icon
2. Confirm deletion

### Export Data
1. Click "Export CSV"
2. File downloads automatically

### Update Status (Sponsors/Donations)
1. Click status dropdown
2. Select new status
3. Auto-saves

## 🎨 Customization

### Change Admin Password
**File**: `src/pages/Admin.tsx`  
**Line**: `const ADMIN_PASSWORD = "humsj2024";`

### Add Alumni Data
**File**: `src/pages/ExternalAffairs.tsx`  
**Format**:
```typescript
const alumniData = {
  male: [
    { year: 2000, name: "Name", field: "Field" },
  ],
  female: [
    { year: 2000, name: "Name", field: "Field" },
  ]
};
```

### Update Establishment Date
**File**: `src/components/home/AboutSection.tsx`  
**Current**: 1983 E.C

## 🛠️ Troubleshooting

### Build Errors
```bash
npm install
npm run build
```

### Firebase Connection Issues
Check `src/lib/firebase.ts` configuration

### Admin Login Not Working
- Clear browser cache
- Check password in `src/pages/Admin.tsx`
- Clear session storage

### Data Not Showing
- Check Firebase Console
- Verify collection names
- Check browser console for errors

## 📱 Mobile Responsive

All pages are fully responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security Checklist

- [ ] Change admin password
- [ ] Configure Firebase security rules
- [ ] Set up authentication (production)
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement CORS properly

## 📞 Support

For issues or questions:
1. Check Firebase Console for data
2. Check browser console for errors
3. Review documentation files
4. Check Firebase connection

## 📚 Documentation Files

- `README.md` - Project overview
- `FEATURES_GUIDE.md` - Detailed feature documentation
- `ADMIN_FEATURES_SUMMARY.md` - Admin panel guide
- `HOW_TO_ADD_ALUMNI.md` - Alumni data guide
- `IMPLEMENTATION_SUMMARY.md` - Technical summary
- `QUICK_REFERENCE.md` - This file

## ✅ All Fixed Issues

✔️ HUMSJ establishment date: 1983 E.C  
✔️ Username accepts numbers  
✔️ Student ID accepts any format  
✔️ Admin can add users  
✔️ Admin can edit users  
✔️ Admin can delete users  
✔️ Admin can manage sponsors  
✔️ Admin can manage donations  
✔️ CSV export functionality  
✔️ Real-time data updates  
✔️ Status management  
✔️ Confirmation dialogs  

---

**Last Updated**: December 24, 2025  
**Version**: 2.0  
**Status**: Production Ready ✅
