# Form Validation Rules

## 📋 Quick Reference

### ✅ Name Field
```
Allowed: Letters and spaces only
Examples:
  ✅ "Ahmed Ali"
  ✅ "Mohammed Hassan"
  ✅ "Fatima Ibrahim"
  ❌ "Ahmed123"
  ❌ "Ali2024"
  ❌ "User@123"
```

### ✅ Department Field
```
Allowed: Letters and spaces only
Examples:
  ✅ "Computer Science"
  ✅ "Islamic Studies"
  ✅ "Business Administration"
  ❌ "CS101"
  ❌ "Department2"
  ❌ "IT-2024"
```

### ✅ Student ID Field
```
Allowed: Any format (letters, numbers, special characters)
Examples:
  ✅ "HU/1234/15"
  ✅ "HUMSJ2024"
  ✅ "12345"
  ✅ "STU-2024-001"
```

### ✅ Phone Field
```
Allowed: Any format
Examples:
  ✅ "+251 912 345 678"
  ✅ "0912345678"
  ✅ "+251912345678"
```

## 🔍 Where Validation Applies

### 1. Registration Form (`/dashboard`)
- User registration for Qirat, Charity, Da'wah
- Validates name and department on submit

### 2. Admin Add User (`/admin`)
- Manual user addition by admin
- Validates name and department before saving
- Shows error toast if invalid

### 3. Admin Edit User (`/admin`)
- Editing existing user information
- Validates name and department before updating
- Shows error toast if invalid

## 🚫 Common Errors

### "Name must contain only letters and spaces"
**Cause**: Numbers or special characters in name field
**Fix**: Remove numbers and special characters
```
Wrong: "Ahmed123"
Right: "Ahmed Ali"
```

### "Department must contain only letters and spaces"
**Cause**: Numbers or special characters in department field
**Fix**: Remove numbers and special characters
```
Wrong: "CS101"
Right: "Computer Science"
```

## 💡 Tips

1. **Name Field**: Use full names with spaces
   - Good: "Ahmed Ali Hassan"
   - Bad: "Ahmed_Ali" or "Ahmed123"

2. **Department Field**: Use full department names
   - Good: "Computer Science"
   - Bad: "CS" or "CS101"

3. **Student ID**: Can be any format you prefer
   - "HU/1234/15" ✅
   - "HUMSJ2024" ✅
   - "12345" ✅

## 🧪 Testing

### Test Invalid Name
1. Go to `/dashboard`
2. Enter "Ahmed123" in name field
3. Try to submit
4. Should see error message

### Test Invalid Department
1. Go to `/dashboard`
2. Enter "CS101" in department field
3. Try to submit
4. Should see error message

### Test Valid Data
1. Name: "Ahmed Ali"
2. Student ID: "HU/1234/15"
3. Department: "Computer Science"
4. Phone: "+251 912 345 678"
5. Should submit successfully ✅

## 📱 Error Messages

| Field | Error Message |
|-------|--------------|
| Name | "Name must contain only letters and spaces" |
| Department | "Department must contain only letters and spaces" |
| Student ID | "Student ID is required" |
| Phone | "Valid phone number required" |

## 🔧 Technical Details

### Regex Pattern Used
```javascript
/^[a-zA-Z\s]+$/
```

This pattern:
- `^` - Start of string
- `[a-zA-Z\s]` - Letters (uppercase/lowercase) and spaces
- `+` - One or more characters
- `$` - End of string

### Where Applied
1. `src/components/dashboard/RegistrationForm.tsx`
2. `src/components/dashboard/AddUserDialog.tsx`
3. `src/components/dashboard/DataTable.tsx`

---

**Last Updated**: December 24, 2025
**Status**: Active ✅
