import React, {PureComponent} from 'react'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'
import './App.css'
import CreateAccount from './page/CreateAccount/CreateAccount'
import LoginForm from './page/LoginForm/LoginForm'
import FullForm from './page/FullForm/FullForm'
import Standard from './page/Standard/Standard'
import AppBarSN from './component/appBarSN/AppBarSN'
import NotificationBar from "./component/notificationBar/NotificationBar";
import {
    Home,
    About,
    Events,
    Products,
    Contact, Whoops404,
    GetParam
} from './test/PlaceholderComponent'






class App
    extends PureComponent {
    state = {
        response: ''
    };

    componentWillMount()  {

    }

    render() {
        console.log('--------->', window.location.href)

        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                        <Route path='/events' component={Events} />
                        <Route path='/products' component={Products} />
                        <Route path='/contact' component={Contact} />
                        <Route exact path='/takeit/:id' component={GetParam}/>
                        <Route component={Whoops404}/>
                    </Switch>



            <div className="App" style={{width: '100%'}}>

                    <header>
                        <Link to="/">Home</Link>
                        <Link to="/login">login</Link>
                        <Link to="/full">Full</Link>
                        <Link to='/test'>Test</Link>
                    </header>


                    <p className="App-intro">{this.state.response}</p>
                <AppBarSN/>
                <NotificationBar/>
            </div>
                </div>
            </HashRouter>
        )
    }
}

export default App
