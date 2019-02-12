import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import routes from './routes'
import Header from './components/Header/Header'
import './App.scss'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <Header />
                        {routes}
                    </div>
                </HashRouter>
            </Provider>
        )
    }
}

export default App
