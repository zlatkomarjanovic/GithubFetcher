import React, {Fragment, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Users from './Components/users/Users';
import User from './Components/users/User';
import Search from './Components/users/Search';
import Alert from './Components/layout/Alert';
import axios from 'axios';
import About from './Components/pages/About';

const App =() =>{
  const [users, setUsers] = useState([]);
  const [user, setUsers] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);




//  async componentDidMount() {
//    this.setState({loading: true});

//    const res = await axios.get(
//      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID
//      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//    );

//    this.setState({users: res.data, loading:false});

//  }

//Search Github users
  searchUsers = async text =>{
  setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
  }
//Get single Github USER

getUser = async (username) => {
  setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        setUser(res.data);
    setLoading(false);
}
//Get users Repos
getUserRepos = async username => {
  setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
}


//Clear users from setState

clearUsers = () =>  {
  setUsers([]);
  setLoading(false);
}


//Set setAlert
setAlert = (msg, type) => {

  set.Alert({msg, type});
  setTimeout(() => setAlert(null), 5000);
}



  render() {
    const {users, loading, alert, user, repos} = this.state;


    return(
      <Router>
      <div className = 'App'>
        <Navbar />
        <div className = 'container'>
          <Alert alert = {alert} />
          <Switch>
            <Route exact path = '/' render = {props => (
              <Fragment>
                <Search searchUsers = {this.searchUsers} clearUsers={this.clearUsers}
                showClear = {users.length > 0 ? true: false}
                setAlert={this.setAlert}
                />
                <Users loading={loading} users={users}/>

              </Fragment>
            )} />

            <Route exact path = '/about' component = {About} />
            <Route exact path = '/user/:login' render = {props => (
              <User {...props}
              getUser={this.getUser}
              getUserRepos ={this.getUserRepos}
              user = {user}
              repos={repos}
              loading ={loading}/>

            )}/>
          </Switch>

        </div>

      </div>
      </Router>
    );
  }
}

export default App;
