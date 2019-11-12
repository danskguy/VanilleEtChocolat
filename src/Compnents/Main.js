import React, {Component} from 'react';
import "./style.css"

export default class Main extends Component {
    state = {
        cost: '' || '0',
        earnings: '' || '0',
        time: '' || '0',
        hours: '' || '00',
        minutes: '' || '00',
        wage: '' || '0',
        pay: '' || '0',
        sellingPrice: '' || '0',
        businessIncome: '' || '0',
        total: '' || '0',
        quantity: '' || '0',
        earnPercent: '' || '0',
      };
    calculatePrice(cost, earnings, time, wage, quan){
      let earnPercent = this.cutting((earnings/100) * cost);
      let businessIncome = this.cutting(parseFloat(cost) + earnPercent);
      let income = this.cutting(parseFloat(time/60 * wage));
      this.setState({sellingPrice: businessIncome+income, earnPercent: earnPercent, cost: cost, pay: income, wage: wage, earnings: earnings, total: ((businessIncome+income)*quan)});
      this.calcHours(quan, time);
    };
    cutting(num){
        let rounded = num.toString();
        for(let i = 0; i < rounded.length; i++){
            if (!rounded.includes('.') && rounded.length <= 4){
                return(parseInt(num));
            } else if(rounded.includes('.') && rounded[i] === '.'){
                let newNum = rounded.slice(0, i + 3);
                return(parseFloat(newNum));
            }
        }
    };
    calcHours(quan, time){
      if(quan*time < 60){
        this.setState({minutes: quan*time, hours: '00'});
      } else{
        let hour = Math.floor(quan*time/60);
        let minutes = quan*time % 60;
        if(minutes === 0){
          return(this.setState({minutes: "00", hours: parseInt(hour)}));
        } else{
          return(this.setState({hours: parseInt(hour), minutes: minutes}));
        }
      }
    }
    handleFormChange = event => {
        this.setState({ [event.target.getAttribute('id')]: event.target.value });
      };
    render(){
      return (
        <div id="pricing">
          <div id="info">
            <div id="text">
              <div>Cost:</div>
              <div>Margin:</div>
              <div>Minutes taken:</div>
              <div>Hourly Pay:</div>
              <div>Quantity:</div>
            </div>
            <div className="page">
              <label className="field a-field a-field_a2">
                <input className="field__input a-field__input" placeholder="Cost to make" id="cost" type="text" onChange={this.handleFormChange} required></input>
                <span className="a-field__label-wrap">
                  <span className="a-field__label">Material Cost</span>
                </span>
              </label>
              <label className="field a-field a-field_a2">
                <input className="field__input a-field__input" placeholder="How much earnings" id="earnings" type="text" onChange={this.handleFormChange} required></input>
                <span className="a-field__label-wrap">
                  <span className="a-field__label">Margin</span>
                </span>
              </label>    
              <label className="field a-field a-field_a2">
                <input className="field__input a-field__input" placeholder="Time Spent" id="time" type="text" onChange={this.handleFormChange} required></input>
                <span className="a-field__label-wrap">
                  <span className="a-field__label">Minutes Taken</span>
                </span>
              </label>
              <label className="field a-field a-field_a2">
                <input className="field__input a-field__input" placeholder="Wage" id="wage" type="text" onChange={this.handleFormChange} required></input>
                <span className="a-field__label-wrap">
                  <span className="a-field__label">Hourly Pay</span>
                </span>
              </label>
              <label className="field a-field a-field_a2">
                <input className="field__input a-field__input" placeholder="How Many" id="quantity" type="text" onChange={this.handleFormChange} required></input>
                <span className="a-field__label-wrap">
                  <span className="a-field__label">Quantity</span>
                </span>
              </label>
            
              <div id="calculate">
                <button className="button4" onClick={() => this.calculatePrice(this.state.cost, this.state.earnings, this.state.time, this.state.wage, this.state.quantity)} >Calculate</button>
              </div>
            </div>
          </div>
          <div id="value">
            <div className="break-down">
              <div className="box">Business Earnings:
                <div className="income">${this.cutting(this.state.earnPercent)}</div>
              </div>
              <div className="symbols">+</div>
              <div className="box">Personal Earnings:
                <div className="income">${this.state.pay}</div>
              </div>
              <div className="symbols">+</div>
              <div className="box">Cost:
                <div className="income">${this.state.cost}</div>
              </div>
              <div className="symbols">=</div>
              <div className="box">Selling Price:
                <div className="income">${this.cutting(this.state.sellingPrice)}</div>
              </div>
            </div>
            <div className="break-down">
            <div className="box">Hourly:
                <div className="income">${this.state.wage}</div>
              </div>
              <div className="symbols">*</div>
              <div className="box">Time:
                <div className="income">{this.state.hours}:{this.state.minutes}</div>
              </div>
              <div className="symbols">=</div>
              <div className="box">Total earnings:
                <div className="income">${this.cutting(this.state.pay*this.state.quantity)}</div>
              </div>
            </div>
            <div className="break-down">
              <div className="box">Cost:
                <div className="income">${this.cutting(this.state.cost)}</div>
              </div>
              <div className="symbols">*</div>
              <div className="box">Quantity:
                <div className="income">{this.state.quantity}</div>
              </div>
              <div className="symbols">=</div>
              <div className="box">The total cost:
                <div className="income">${this.cutting(this.state.cost*this.state.quantity)}</div>
              </div>
            </div>
            <div className="break-down">
              <div className="box">Business Earnings:
                <div className="income">${this.cutting(this.state.earnPercent)}</div>
              </div>
              <div className="symbols">*</div>
              <div className="box">Quantity:
                <div className="income">{this.state.quantity}</div>
              </div>
              <div className="symbols">=</div>
              <div className="box">Total Business Earnings:
                <div className="income">${this.cutting(this.state.earnPercent*this.state.quantity)}</div>
              </div>
            </div>
          </div> 
        </div>
    )
  }
}
