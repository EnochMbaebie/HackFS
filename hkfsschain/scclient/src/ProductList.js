import React, { Component } from 'react';
import './App.css';

class ProductList extends Component {
  
  render() {
    return (
      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center mt-3">
          <div id="content">
            <form 
              onSubmit={(event) => {
                event.preventDefault()
                this.props.createProduct(this.product.value)
              }}>
              <label>
                Enter Product Name:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productName"
                  className="form-control"  
                  type="text" 
                  placeholder="Add name..." 
                  required 
                  /*onChange={this.prodChangeHandler}*/
                />
              </label>
              <br />
              <label>
                Enter Product Info:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productInfo"
                  className="form-control"  
                  type="text" 
                  placeholder="Add info..." 
                  required 
                  /*onChange={this.prodChangeHandler}*/
                />
              </label>
              <br />
              <label>
                Enter Product Value:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productValue"
                  className="form-control"  
                  type="number" 
                  placeholder="Add value..." 
                  required
                  /*onChange={this.prodChangeHandler}*/
                />
              </label>
              <br />
              <label>
                Enter Product Gppa:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productGpgga"
                  className="form-control"  
                  type="text" 
                  placeholder="Add gpgga..." 
                  required
                  /*onChange={this.prodChangeHandler}*/
                />
              </label>
              <br />
              <label>
                Enter Product Dest:
                <input 
                  ref={(input) => {
                    this.product = input
                  }}
                  name="productDest"
                  className="form-control"  
                  type="text" 
                  placeholder="Add dest..." 
                  required
                  /*onChange={this.prodChangeHandler}*/
                />
              </label>
              <input type="submit" hidden={true} />
            </form>
            <ul className="list-unstyled" id="productList">
              { this.props.products.map((product, key) => {
                return(
                  <div className="productTemplate" key={key}>
                    <label>
                      <span className="content">{product.content}</span>
                    </label>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;