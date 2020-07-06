import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div className="wrapper">
      <h1>
        Такой страницы не существует <span role="img" aria-label="emoji">😵</span>
      </h1>
      <Link to="/">Перейти на главнгую</Link>
    </div>
  );
}

export default Page404;
