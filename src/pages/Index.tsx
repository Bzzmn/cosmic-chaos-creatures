
import { useNavigate } from 'react-router-dom';
import Landing from './Landing';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to landing page
  return <Landing />;
};

export default Index;
