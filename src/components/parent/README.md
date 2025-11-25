# Spectrum Parent Portal

## Overview
The Parent Portal is a comprehensive dashboard that allows parents to monitor and manage their child's learning experience on the Spectrum educational platform.

## Features

### 1. Authentication System (`ParentAuth.tsx`)
- **Login**: Secure login with email and password
- **Sign Up**: Create new parent account with:
  - Parent's full name and email
  - Secure password (minimum 6 characters)
  - Child's name and age (3-12 years)
  - Terms of service agreement
- **Password Visibility Toggle**: Show/hide password fields
- **Form Validation**: Real-time validation for all inputs
- **Local Storage**: Account data saved locally for demo purposes

### 2. Enhanced Dashboard (`EnhancedParentDashboard.tsx`)
The dashboard features multiple tabs and comprehensive analytics:

#### Dashboard Tab
- **Quick Stats Banner**: 4 key metrics cards showing:
  - Total learning hours this month
  - Levels completed
  - Average quiz score
  - Current streak
  
- **Weekly Activity Chart**: Bar chart showing daily hours and activities

- **Category Progress**: Visual progress bars for each learning category:
  - Space Explorer
  - Chemistry Lab
  - Plants & Animals
  - Motion & Energy

- **Recent Achievements**: Grid of earned badges with dates

- **Screen Time Widget**: 
  - Real-time screen time tracking
  - Daily limit management
  - Visual progress bar
  - Adjustable limits

- **Parental Controls**:
  - Bedtime mode toggle (8:00 PM - 7:00 AM)
  - Notifications toggle
  
- **Quick Actions**:
  - View all badges
  - Access art gallery
  - Customize child's avatar

#### Progress Tab
- **Skills Development Radar Chart**: Visual representation of 5 key skills:
  - Problem Solving
  - Critical Thinking
  - Creativity
  - Memory
  - Focus

- **Category Detail Cards**: Individual progress for each learning category with:
  - Completion percentage
  - Completed levels count
  - In-progress levels count
  - Total levels available

#### Settings Tab
- **Account Information**:
  - Edit parent name and email
  - Update child's name and age
  - Save changes with confirmation

- **Password & Security**:
  - Change password securely
  - Current password verification
  - Password strength requirements
  - Show/hide password toggles

- **Privacy & Safety**:
  - Content filtering toggle
  - Safe search toggle

## Navigation

### Access Parent Portal
- From Child Portal: Click "Parent Portal" button in header
- Direct URL: `/parent`

### Logout
- Click "Logout" button in header
- Redirects to authentication page

### Switch to Child Portal
- Click "Child Portal" button in dashboard header
- Seamlessly transition between portals

## Design System

### Color Palette
- **Primary**: Gray scale (gray-700 to gray-900) for professional look
- **Accents**: 
  - Blue: Screen time, information
  - Green: Success, completed items
  - Purple: Skills, achievements
  - Orange: Streaks, energy
  - Red: Alerts, important items

### Typography
- Uses default system font (not Comic Sans) for professional appearance
- Clear hierarchy with proper heading sizes
- Readable body text with good contrast

### Components
- Shadcn/UI components for consistency
- Recharts for data visualization
- Lucide React icons throughout
- Responsive grid layouts
- Smooth transitions and hover effects

## Data Storage

### LocalStorage Keys
- `parentAccount`: Stores parent account data (name, email, password, child info)
- `isParentLoggedIn`: Boolean flag for login state
- `parentName`: Quick access to parent's name
- `childName`: Quick access to child's name

### Account Data Structure
```json
{
  "name": "Parent Name",
  "email": "parent@example.com",
  "password": "securepassword",
  "childName": "Child Name",
  "childAge": 8,
  "createdAt": "2024-11-21T..."
}
```

## Mock Data

The dashboard currently uses mock data for:
- Weekly activity statistics
- Category progress percentages
- Skills development scores
- Achievement badges
- Screen time tracking

In a production environment, this would be replaced with real API calls to a backend service.

## Security Notes

⚠️ **Important**: This is a demo implementation. In a production environment:
- Never store passwords in localStorage
- Use secure backend authentication (JWT, OAuth)
- Implement proper session management
- Use HTTPS for all communications
- Add CSRF protection
- Implement rate limiting
- Use secure password hashing (bcrypt, Argon2)
- Add email verification
- Implement password reset functionality

## Future Enhancements

Potential features for production version:
- Email notifications for achievements
- Detailed activity logs
- Weekly/monthly reports via email
- Multiple child profiles per parent
- Custom learning goals and targets
- Real-time activity monitoring
- Content recommendation engine
- Parent-child messaging
- Teacher collaboration features
- Export progress reports (PDF)
- Mobile app companion
- Two-factor authentication

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Requires localStorage support
- Responsive design for tablet and desktop
