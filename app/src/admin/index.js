import { render, createElement } from '@wordpress/element';
import App from './App';
import './index.scss';

// Render the main App component into the root element.
document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('th-login-admin-root');
    if (rootElement) {
        render(createElement(App), rootElement);
    } else {
        console.error('TH Login Admin: Root element #th-login-admin-root not found.');
    }
});
