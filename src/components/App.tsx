// import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import '../css/App.css';
import CurrencyConverter from './FixerAPI/Fixer';

export default class App extends React.Component<{}> {

  public render() {
    return (
      <div className="container-fluid">
        <div className="centreText">
          <h2>Foreign Currency Exchange Rates</h2>
          <CurrencyConverter />
        </div>
      </div>
    );
  }

}