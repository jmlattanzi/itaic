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
            <HashRouter>
                <Provider store={store}>
                    <div>
                        <Header />
                        {routes}
                    </div>
                </Provider>
            </HashRouter>
        )
    }
}

export default App
