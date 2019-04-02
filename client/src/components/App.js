import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../history';
import CustomerList from "./customers/CustomerList";
import CustomerCreate from "./customers/CustomerCreate";
import CustomerDelete from "./customers/CustomerDelete";
import CustomerEdit from "./customers/CustomerEdit";
import CustomerSelect from "./customers/CustomerSelect";



class App extends React.Component{
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Route path="/" exact component={CustomerList} />
            <Route path="/customers/new/" component={CustomerCreate}/>
            <Route path="/customers/delete/:id" component={CustomerDelete}/>
            <Route path="/customers/edit/:id" component={CustomerEdit}/>
            <Route path="/customers/show" component={CustomerSelect}/>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;