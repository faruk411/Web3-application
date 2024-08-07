import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import piyango from './piyango';

class App extends Component{

  state = {

    manager: '',

    players: [],

    balance: '',

    value: '',

    message: ''
  };

  async componentDidMount(){

    const manager = await piyango.methods.manager().call();
    const players = await piyango.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(piyango.options.address);

    this.setState({manager, players, balance});


  }

  onSubmit = async (event)=>{

    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Trasnfer bekleniliyor....'});

    await piyango.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'Piyangoya giriş yapıldı....'});

  };
  
  onClick = async() => {

    const accounts = web3.eth.getAccounts();

    this.setState({message: 'Kazanan seçiliyor....'});
    await piyango.methods.pickWinner().send({
        from: accounts[0]
    });
    this.setState({message: 'Bir kazanan seçildi !!!'});

  };

  render(){

    return (
      
      <div className='container my-3'>
        <div className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
          <h2>Piyango Sözleşmesi</h2>
          <p> 
            Bu sözleşmenin yöneticisi bay {this.state.manager}
            <br/>
            Şuanda giriş yapan {this.state.players.length} bu kadar insan var.
            <br/>
            <mark className='custom-mark'>{web3.utils.fromWei(this.state.balance, 'ether')}</mark> bu kadar ether kazanmak için yarışıyorlar!!!
          </p>
        </div>
        
        <div className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>

          <form onSubmit={this.onSubmit}>
            <h4>Şansını denemek ister misin?</h4>
            <div className='form-group my-3'>
              <label>Ether göndermek için  </label>
              <input
                className='form-control'
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
              />
            </div>
            <button className='btn btn-success'>Göner</button>
          </form>
          
        </div>

        <hr/>

        <div className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>

          <h4>Kazananı seçmeye hazır mısın?</h4>
          <button className='btn btn-primary' onClick={this.onClick}>Kazananı seç</button>
        </div>

        <hr/>

        {this.state.message && (
          <div className='alert alert-warning' role='alert'>
            <h1>{this.state.message}</h1>
          </div>
        )}
        
      </div>

    );
  }
}


export default App;
