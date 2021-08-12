import './styles/App.css';
import GerenciarVendedores from './pages/GerenciarVendedores';
import ConsultaVenda from './pages/ConsultaVenda';
import CadastrarVenda from './pages/CadastrarVenda';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const TITLE = 'Tray Homework';

export default function App() {
  return (
    <section className="App">
      <header>
        <Router>
          <section className="nav">
            <h1>Tray Homework</h1>
            <section className="links">
              <Link to="/">Consultar vendas realizadas</Link>
              <Link to="/vendedores">Gerenciar vendedores</Link>
              <Link to="/venda">Cadastrar nova venda</Link>
            </section>
          </section>

          <section className="content">
          <Switch>
            <Route exact path='/'>
              <ConsultaVenda />
            </Route>
            
            <Route path="/vendedores">
              <GerenciarVendedores />
            </Route>

            <Route path="/venda">
              <CadastrarVenda />
            </Route>
          </Switch>
          </section>
        </Router>
      </header>
    </section>
  );
}
