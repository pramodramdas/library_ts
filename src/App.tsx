import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MsgStore } from "./context/message"
import DisplayMsg from "./components/display_msg"
import GetCatalog from './components/get_catalog'
import Catalog from './components/catalog'
import CreateCatalog from './components/create_catalog'
import Home from './components/home'

class App extends React.Component {
	render() {
		return (
			<div className="App" style={{height: "100%", width:"100%"}}>
				<MsgStore>
					<DisplayMsg/>
					<Router>
						<div className="ui grid container" style={{height: "100%", width:"100%", float:"left"}}>
							<div className="row">
								<div className="four wide column">
										<div className="three wide row" style={{height: "50%"}}>
											<GetCatalog />
										</div>
										<hr />
										<div className="three wide row" style={{height: "50%", position: "relative"}}>
											<CreateCatalog />
										</div>
								</div>
								<div className="ten wide column">
									<Switch>
										<Route exact path="/"><Home /></Route>
										<Route path="/catalog" render={(props) => (<Catalog {...props}/>)} />
									</Switch>
								</div>
							</div>
						</div>
					</Router>
				</MsgStore>
			</div>
		);
	}
}

export default App;
