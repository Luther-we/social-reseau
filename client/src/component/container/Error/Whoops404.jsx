import React, {PureComponent} from 'react'
import App from '../../App/App'

class Whoops404
    extends PureComponent {
    render() {
        const {location} = this.props
        return (
                <div>
                    <App/>
                    < h1 > Resource not found at '{ location.pathname}' </ h1 >
                </div>
        )
    }
}

export default Whoops404