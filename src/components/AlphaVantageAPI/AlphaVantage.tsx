// import React, { Component } from 'react';
import * as React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
// import NewSingle from './NewSingle';

interface IState {
    currencies: ICurrency
    value : number
    to: string
    from: string
}

interface ICurrency {
    "1. From_Currency Code": string;
    "2. From_Currency Name": string;
    "3. To_Currency Code": string;
    "4. To_Currency Name": string;
    "5. Exchange Rate": number;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
}

// const currencies = ['USD', 'NZD', 'GBP', 'BTC'];

export default class CurrencyConverter extends React.Component<{}, IState> {

    public key : string = "apikey=QF7ROWEDDACI2HYS";
    public apiURL : string = "https://www.alphavantage.co/query?";
    public exchangeRate : number = 1;
    public calculatedRate: number = 1;

    constructor(props : any) {
        super(props);
        this.state = {
            currencies : {
                "1. From_Currency Code":"",
                "2. From_Currency Name":"",
                "3. To_Currency Code":"",
                "4. To_Currency Name":"",
                "5. Exchange Rate":0,
                "6. Last Refreshed":"",
                "7. Time Zone":""
            },
            from: "NZD",
            to: "USD",
            value : 1
        };
        this.calculateCurrency = this.calculateCurrency.bind(this);
    }

    public componentDidMount() {
        const url = this.apiURL + 'function=CURRENCY_EXCHANGE_RATE&from_currency=' + this.state.from + '&to_currency=' + this.state.to + '&' + this.key;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    currencies: data["Realtime Currency Exchange Rate"]
                })
                this.exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                this.calculatedRate = this.exchangeRate*this.state.value; 
            })
            .catch((error) => console.log(error));
    }

    public calculateCurrency(event : any) {
        // const nextState = JSON.parse(JSON.stringify(this.state));
        // nextState.value = event.target.value;
        this.setState({value: event.target.value});
        this.calculatedRate = this.exchangeRate*event.target.value;
    }

    // public changeCurrency(currency: any) {
    //     this.setState({to: currency});
    // }

    public renderToDropDownButton() {        
        return(
            <DropdownButton
                // bsStyle={title.toUpperCase()}
                bsStyle={'primary'}
                title={this.state.to}
                // key={i}
                id={`dropdown-basic-${this.state.to}`}
            >
                <MenuItem eventKey="1" onClick={() => this.setState({to: "USD"})}>USD</MenuItem>
                <MenuItem eventKey="2" onClick={() => this.setState({to: "NZD"})}>NZD</MenuItem>
                <MenuItem eventKey="3" onClick={() => this.setState({to: "GBP"})}>GBP</MenuItem>
                <MenuItem divider={true}/>
                <MenuItem eventKey="4" onClick={() => this.setState({to: "BTC"})}>BTC</MenuItem>
            </DropdownButton>
        );
    }

    public renderFromDropDownButton() {
        return(
            <DropdownButton
                bsStyle={'primary'}
                title={this.state.from}
                id={`dropdown-basic-${this.state.from}`}
            >
                <MenuItem eventKey="1" onClick={() => this.setState({from: "USD"})}>USD</MenuItem>
                <MenuItem eventKey="2" onClick={() => this.setState({from: "NZD"})}>NZD</MenuItem>
                <MenuItem eventKey="3" onClick={() => this.setState({from: "GBP"})}>GBP</MenuItem>
                <MenuItem divider={true}/>
                <MenuItem eventKey="4" onClick={() => this.setState({to: "BTC"})}>BTC</MenuItem>
            </DropdownButton>
        );
    }
    
    public render() {
        return (
            <ul>
                <h2>
                <Input type="number" name="amt" value={this.state.value} onChange={this.calculateCurrency} />
                {this.renderFromDropDownButton()} = {this.calculatedRate} {this.renderToDropDownButton()}
                </h2>
                <Button variant="contained" color="primary" onClick={() => this.componentDidMount()}>Update Foreign Exchange</Button>
            </ul>
        );
    }
}
