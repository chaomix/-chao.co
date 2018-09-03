// import React, { Component } from 'react';
import * as React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
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

export default class CurrencyConverter extends React.Component<{}, IState> {

    public key : string = "apikey=QF7ROWEDDACI2HYS";
    public apiURL : string = "https://www.alphavantage.co/query?";
    public exchangeRate : number = 1;

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
            })
            .catch((error) => console.log(error));
    }

    public calculateCurrency(event : any) {
        this.setState({
            value : event.target.value
        })
    }

    public renderDropDownButton(title: any, i: any) {
        return(
            <DropdownButton
                bsStyle={title.toUpperCase()}
                title={title}
                key={i}
                id={`dropdown-basic-${i}`}
            >
                <MenuItem eventKey="1">USD</MenuItem>
                <MenuItem eventKey="2" active>NZD</MenuItem>
                <MenuItem eventKey="3">GBP</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="4">BTC</MenuItem>
            </DropdownButton>
        );
    }
    
    public render() {
        return (
            <ul>
                <h2>
                <input type="number" min="0" name="amt" value={this.state.value} onChange={this.calculateCurrency} /> 
                {this.state.currencies["1. From_Currency Code"]} = {this.state.currencies["5. Exchange Rate"]} {this.state.currencies["3. To_Currency Code"]}
                </h2>
                {this.renderDropDownButton("Default",1)}
            </ul>
        );
    }
}
