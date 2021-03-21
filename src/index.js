import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SEO from './HOC/seo';

ReactDOM.render(
    <>
        <SEO
            title="FoodDude"
            lang="en-US"
            description="Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city. We assure you of satisfying your palette minus the food colours and unnecessary oil."
            meta={[{ property: 'title', content: 'fooddude' }]}
        />
        <Router>
            <Route path="/" component={App} />
        </Router>
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
