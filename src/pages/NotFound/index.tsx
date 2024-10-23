import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h1>404 Not Found</h1>
    <p>The page you&apos;re looking for does not exist</p>
    <Link to="/">Go to Main Page</Link> {/* Ссылка на главную страницу */}
  </div>
);

export default NotFoundPage;
