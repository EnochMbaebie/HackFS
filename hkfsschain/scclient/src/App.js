import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import { SCHAIN_ABI, SCHAIN_ADD } from './abis'
import ProductList from './ProductList'

// const web3 = new Web3(web3.givenProvider);
// const SChainContract = new web3.eth.Contract(sChainAbi, sChainAddr);

class App extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = "#282c34"
    document.body.style.color = "grey"
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const schainDapp = new web3.eth.Contract(SCHAIN_ABI, SCHAIN_ADD)
    this.setState({ schainDapp })
    const prodIdCount = await schainDapp.methods.productIdCounter().call
    this.setState({ prodIdCount })
    console.log(prodIdCount);
    for (let i = 1; i <= prodIdCount; i++) {
      const product = await schainDapp.methods.products(i).call()
      this.setState({
        products: [...this.state.products, product]
      })
    }
    this.setState({ loading: false})
    console.log(this.state.products);
  }
  
  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      productIdCount: 0,
      productName: "",
      productInfo: "",
      productValue: 0,
      productGpgga: "",
      productDest: "",
      products: [],
      loading: true
    }
    this.createProduct = this.createProduct.bind(this)
  }

  createProduct(content) {
    this.setState({ loading: true })
    this.state.schainDapp.methods.addProduct(
      this.state.productName, 
      this.state.productInfo, 
      this.state.productValue,
      this.state.productGpgga,
      this.state.productDest
    ).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  render() {
    return (
      <div>
        {/* Nav bar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
         <a className="navbar-brand col-sm-3 col-md-2 mr-0" 
            href="https://ethglobal.co/" target="_blank">HackFS - Supply Chain
         </a>
         <span className="navbar-text navbar-right px-2">Your account: {this.state.account}</span> 
        </nav>

        {/* Main content */}
        <div className="container-fluid">
          <div className="row mt-5">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                  <h2>Track your products on the Blockchain</h2>
                </div>
              </div>
              {/*<div className="row">Current products: { this.state.productIdCount }</div>*/}
            </main>           
          </div>
          
          {/* Main actions */}
          { this.state.loading ? <div id="loader"> <p>Loading...</p> </div>
            : <ProductList products={this.state.products} createProduct={this.createProduct} />
          }
        </div>
      </div>
    );
  }
}

export default App;
