import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Root>
      <App />
    </Root>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
