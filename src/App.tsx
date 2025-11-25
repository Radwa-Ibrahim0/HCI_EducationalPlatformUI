import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChildLanding from './components/child/ChildLanding';
import ChildDashboard from './components/child/ChildDashboard';
import ProgressMap from './components/child/ProgressMap';
import VideoLevel from './components/child/VideoLevel';
import QuizLevel from './components/child/QuizLevel';
import Whiteboard from './components/child/Whiteboard';
import ArtGallery from './components/child/ArtGallery';
import AvatarCustomization from './components/child/AvatarCustomization';
import BadgesPage from './components/child/BadgesPage';
import ParentAuth from './components/parent/ParentAuth';
import EnhancedParentDashboard from './components/parent/EnhancedParentDashboard';
import ParentArtGallery from './components/parent/ParentArtGallery';
import ParentBadges from './components/parent/ParentBadges';
import ParentAvatar from './components/parent/ParentAvatar';
import ProtectedRoute from './components/parent/ProtectedRoute';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <Router basename="/">
      <Toaster position="top-right" />
      <Routes>
        {/* Child Portal */}
        <Route path="*" element={<ChildLanding />} />
        <Route path="/" element={<ChildLanding />} />
        <Route path="/child" element={<ChildLanding />} />
        <Route path="/child/dashboard" element={<ChildDashboard />} />
        <Route path="/child/progress/:category" element={<ProgressMap />} />
        <Route path="/child/level/:id" element={<VideoLevel />} />
        <Route path="/child/quiz/:id" element={<QuizLevel />} />
        <Route path="/child/whiteboard" element={<Whiteboard />} />
        <Route path="/child/gallery" element={<ArtGallery />} />
        <Route path="/child/avatar" element={<AvatarCustomization />} />
        <Route path="/child/badges" element={<BadgesPage />} />
        
        {/* Parent Portal */}
        <Route path="/parent" element={<ParentAuth />} />
        <Route 
          path="/parent/dashboard" 
          element={
            <ProtectedRoute>
              <EnhancedParentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/gallery" 
          element={
            <ProtectedRoute>
              <ParentArtGallery />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/badges" 
          element={
            <ProtectedRoute>
              <ParentBadges />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/avatar" 
          element={
            <ProtectedRoute>
              <ParentAvatar />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}