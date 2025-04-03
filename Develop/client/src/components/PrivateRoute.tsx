import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import Auth from '../utils/auth';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;




// === Usage Example in App.tsx ===
// import PrivateRoute from './components/PrivateRoute';
// <Route path="/" element={
//   <PrivateRoute>
//     <KanbanBoard />
//   </PrivateRoute>
// } />