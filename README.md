# HUMSJ Connect - External Affairs Platform

A comprehensive web platform for Haramaya University Muslim Students Jemea (HUMSJ) External Affairs sector, managing Qirat, Charity, and Da'wah programs.

## 🚀 Features

### User Features
- **Sector Registration**: Students can register for Qirat, Charity, or Da'wah programs
- **Charity Fundraising**: 
  - Sponsor application form
  - Monthly student donation registration
- **Sector Information**: Detailed pages for each sector with historical events

### Admin Features
- **User Management**: View, add, edit, and delete registrations
- **Sponsor Management**: Track and manage sponsor applications
- **Donation Management**: Monitor monthly donation commitments
- **Data Export**: Export all data to CSV format
- **Real-time Updates**: Live data synchronization with Firebase

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Firebase Firestore
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: TanStack Query

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase account
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdulmalik-73/humsj-connect.git
   cd humsj-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Update `src/lib/firebase.ts` with your Firebase config (if needed)
   - Current project: `humsj-external-affairs`

4. **Run development server**
   ```bash
   npm run dev
   ```
   Visit: `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔥 Firebase Setup

### Deploy Firestore Rules

**CRITICAL**: Deploy these rules for CRUD operations to work.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `humsj-external-affairs`
3. Navigate to **Firestore Database** → **Rules**
4. Copy and paste the rules from `firestore.rules`
5. Click **Publish**

Or use Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

### Firestore Collections

- `registrations_qirat` - Qirat sector participants
- `registrations_charity` - Charity volunteers
- `registrations_dawa` - Da'wah participants
- `sponsors` - Sponsor applications
- `monthlyDonations` - Monthly donation commitments

## 🔐 Admin Access

- **URL**: `/admin`
- **Password**: `humsj2024` (change in `src/pages/Admin.tsx`)

### Admin Capabilities
- ✅ View all registrations
- ✅ Add new users manually
- ✅ Edit user information
- ✅ Delete users
- ✅ Manage sponsors (view, update status, delete)
- ✅ Manage donations (view, update status, delete)
- ✅ Export data to CSV

## 📝 Form Validation Rules

### Name Field
- Only letters and spaces allowed
- 2-100 characters
- ❌ Numbers not allowed

### Department Field
- Only letters and spaces allowed
- 2-100 characters
- ❌ Numbers not allowed

### Student ID Field
- Any format accepted (letters, numbers, special characters)
- 1-50 characters

## 🗓️ Historical Timeline

All sector events are dated between **2000-2018 E.C** (Ethiopian Calendar)

### HUMSJ Foundation
- **1983 E.C** - Haramaya University Muslim Students Jemea established

### Sector Formation
- **2000-2018 E.C** - Qirat, Charity, and Da'wah sectors formally organized

## 📁 Project Structure

```
humsj-connect/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── dashboard/       # Admin & registration components
│   │   ├── home/            # Homepage components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & Firebase config
│   ├── pages/               # Page components
│   ├── types/               # TypeScript types
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── firestore.rules          # Firebase security rules
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect to Vercel or upload dist folder
```

### Netlify
```bash
npm run build
# Deploy dist folder
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 🧪 Testing

### Test Form Validation
1. Go to `/dashboard`
2. Try entering "Ahmed123" in name field → Should show error
3. Try entering "Computer Science" → Should work ✅

### Test Admin CRUD
1. Go to `/admin` (password: humsj2024)
2. Add a user → Should work ✅
3. Edit a user → Should work ✅
4. Delete a user → Should work ✅

## 📄 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/qirat` | Qirat sector information |
| `/charity` | Charity sector + fundraising |
| `/dawa` | Da'wah sector information |
| `/dashboard` | User registration portal |
| `/admin` | Admin panel (password protected) |

## 🔒 Security Notes

Current Firebase rules allow all operations for development. For production:
1. Implement Firebase Authentication
2. Add role-based access control
3. Restrict admin operations to authenticated admins
4. Enable Firebase App Check

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Contact

- **Project**: HUMSJ External Affairs
- **Repository**: https://github.com/Abdulmalik-73/humsj-connect
- **Firebase Project**: humsj-external-affairs

## 📜 License

This project is for HUMSJ (Haramaya University Muslim Students Jemea) use.

## 🙏 Acknowledgments

- HUMSJ Leadership Team
- External Affairs Sector Members
- All Contributors

---

**Built with ❤️ for HUMSJ Community**

**Last Updated**: December 24, 2025
