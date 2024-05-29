import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogoutForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/login'); // Redirect to sign-in page after logging out
  }, [logout, navigate]);

  return null; // Render nothing
};

export default LogoutForm;



// component for going back to the page //

    export const GoBack = () => {

      const navigate = useNavigate();
    
      const handleGoBack = () => {
        navigate('/');
      };
    
      return (
       
          <button onClick={handleGoBack}>Go Back</button>
       
      )
    };


