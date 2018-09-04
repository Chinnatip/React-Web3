import React, { Component } from 'react'
import Web3 from 'web3'
import { CONTACT_ADDRESS, ABI } from './Web3Config'
import { Form, Icon, Input, Button, Card } from 'antd'

class SimpleContract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contractAddress: CONTACT_ADDRESS,
      balance: 0,
      mycontract: null
    }
    // WEB-3
    this.web3 = new Web3(Web3.givenProvider)
    //READ MORE >> https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
  }

  componentDidMount() {
    this._getBalance()
  }

  _getBalance() {
    // SETUP VAR
    var myContract = new this.web3.eth.Contract(ABI, CONTACT_ADDRESS)
    // TRANSACTION
    myContract.methods
      .getBalance()
      .call()
      .then(_balance => {
        this.setState({ balance: _balance })
      })
    this.setState({ mycontract: myContract })
    // LOGGER
    console.log('get bank balance')
    console.log(this.state)
  }

  _setBalance() {
    alert('set new balance >>>')
    // this.state.mycontract
    //   .setBalance(999)
    //   .send({ from: this.state.contractAddress })
    //   .on('receipt', res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  render() {
    return (
      <div className="App">
        <p>SimpleContract</p>
        <Card title={'SimpleContract'} style={{ width: 350, margin: 'auto' }}>
          <Form className="login-form">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Current Balance ="
                value={this.state.balance}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon
                    type="credit-card"
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                placeholder="Amount (eth)"
                value={this.state.eth}
                onChange={this.handleChangePassword}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => this._setBalance()}
                style={{ width: 180, margin: 'auto' }}
              >
                Set New Balance
              </Button>
            </Form.Item>
            <hr />
          </Form>
        </Card>
      </div>
    )
  }
}
export default SimpleContract
