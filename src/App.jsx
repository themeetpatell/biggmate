import React, { useEffect, Suspense, lazy, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth } from './store/slices/authSlice.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Performance optimizations
const LoadingFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
    <div className="text-center animate-fade-in">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
));

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar.jsx'));
const Home = lazy(() => import('./components/Home.jsx'));
const SprintDashboard = lazy(() => import('./components/SprintDashboard.jsx'));
const Auth = lazy(() => import('./components/Auth.jsx'));
const Landing = lazy(() => import('./components/Landing.jsx'));
const AboutUs = lazy(() => import('./components/AboutUs.jsx'));
const Onboarding = lazy(() => import('./components/onboarding/Onboarding.jsx'));
const StartupPitchCreator = lazy(() => import('./components/StartupPitchCreator.jsx'));
const PitchBackSystem = lazy(() => import('./components/PitchBackSystem.jsx'));
const ProjectBoard = lazy(() => import('./components/ProjectBoard.jsx'));
const TeamWorkspace = lazy(() => import('./components/TeamWorkspace.jsx'));
const MVPTracker = lazy(() => import('./components/MVPTracker.jsx'));
const EquityFramework = lazy(() => import('./components/EquityFramework.jsx'));
const CollaborationTools = lazy(() => import('./components/CollaborationTools.jsx'));
const LaunchPreparation = lazy(() => import('./components/LaunchPreparation.jsx'));
const EntrepreneurProfile = lazy(() => import('./components/EntrepreneurProfile.jsx'));
const Sprinto = lazy(() => import('./components/SprintingModule.jsx'));
const MyPitches = lazy(() => import('./components/MyPitches.jsx'));
const Messages = lazy(() => import('./components/Messages.jsx'));
const Settings = lazy(() => import('./components/Settings.jsx'));

// Sprint Tools
const IdeaFurnishing = lazy(() => import('./components/sprint-tools/IdeaFurnishing.jsx'));
const MVPBuilder = lazy(() => import('./components/sprint-tools/MVPBuilder.jsx'));
const IdeaValidator = lazy(() => import('./components/sprint-tools/IdeaValidator.jsx'));
const MarketResearch = lazy(() => import('./components/sprint-tools/MarketResearch.jsx'));
const ValidationEngine = lazy(() => import('./components/sprint-tools/ValidationEngine.jsx'));
const PitchDeckBuilder = lazy(() => import('./components/sprint-tools/PitchDeckBuilder.jsx'));
const PitchPrep = lazy(() => import('./components/sprint-tools/PitchPrep.jsx'));
const ZeroToMVPBuilder = lazy(() => import('./components/sprint-tools/ZeroToMVPBuilder.jsx'));
const RevenueModelBuilder = lazy(() => import('./components/RevenueModelBuilder.jsx'));

// Skills Tools
const SkillsDashboard = lazy(() => import('./components/SkillsDashboard.jsx'));
const SkillsShowcase = lazy(() => import('./components/skills-tools/SkillsShowcase.jsx'));
const ServicePackages = lazy(() => import('./components/skills-tools/ServicePackages.jsx'));
const ProjectTracker = lazy(() => import('./components/skills-tools/ProjectTracker.jsx'));
const ClientManagement = lazy(() => import('./components/skills-tools/ClientManagement.jsx'));
const AvailabilityRates = lazy(() => import('./components/skills-tools/AvailabilityRates.jsx'));
const Marketplace = lazy(() => import('./components/Marketplace.jsx'));

// AI Co-Founder
const AICoFounder = lazy(() => import('./components/ai-cofounder/AICoFounder.jsx'));
const StakeholderCRM = lazy(() => import('./components/StakeholderCRM.jsx'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  
  if (isLoading) {
    return <LoadingFallback />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Main Layout Component
const MainLayout = ({ children }) => (
  <div className="App min-h-screen bg-gray-50">
    <Suspense fallback={<LoadingFallback />}>
      <Navbar />
    </Suspense>
    <main className="main-content pt-20">
      {children}
    </main>
  </div>
);

// Home Router - Routes to correct dashboard based on user type
const HomeRouter = () => {
  return <Home />;
};

const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Show loading screen
  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App min-h-screen">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding/*" element={<Onboarding />} />
              
              {/* Protected Routes */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <MainLayout>
                    <HomeRouter />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <MainLayout>
                    <EntrepreneurProfile />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/connections" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PitchBackSystem />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/workspace" element={
                <ProtectedRoute>
                  <MainLayout>
                    <TeamWorkspace />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/create-pitch" element={
                <ProtectedRoute>
                  <MainLayout>
                    <StartupPitchCreator />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/projects" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProjectBoard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/mvp-tracker" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MVPTracker />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/equity" element={
                <ProtectedRoute>
                  <MainLayout>
                    <EquityFramework />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/ai-cofounder" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AICoFounder />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/collaboration" element={
                <ProtectedRoute>
                  <MainLayout>
                    <CollaborationTools />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/launch-prep" element={
                <ProtectedRoute>
                  <MainLayout>
                    <LaunchPreparation />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprinto" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Sprinto />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/my-pitches" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MyPitches />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/messages" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Messages />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/launch" element={
                <ProtectedRoute>
                  <MainLayout>
                    <LaunchPreparation />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Sprint Tools Routes */}
              <Route path="/sprint/idea-furnishing" element={
                <ProtectedRoute>
                  <MainLayout>
                    <IdeaFurnishing />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/mvp-builder" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MVPBuilder />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/idea-validator" element={
                <ProtectedRoute>
                  <MainLayout>
                    <IdeaValidator />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/market-research" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MarketResearch />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/validation-engine" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ValidationEngine />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/pitch-deck" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PitchDeckBuilder />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/pitch-prep" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PitchPrep />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/zero-to-mvp" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ZeroToMVPBuilder />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/sprint/revenue-model" element={
                <ProtectedRoute>
                  <MainLayout>
                    <RevenueModelBuilder />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Skills Tools Routes */}
              <Route path="/skills/showcase" element={
                <ProtectedRoute>
                  <MainLayout>
                    <SkillsShowcase />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/skills/packages" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ServicePackages />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/skills/projects" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProjectTracker />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/skills/clients" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ClientManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/skills/availability" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AvailabilityRates />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/marketplace" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Marketplace />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/crm" element={
                <ProtectedRoute>
                  <MainLayout>
                    <StakeholderCRM />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
