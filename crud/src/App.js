import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Add New Product',
      head: 'Products List',
      products: [
        {
          name:'Mi',
          price:6000,
          quantity:3
        },
        {
          name:'HP',
          price:70000,
          quantity:2
        }
      ],
      showForm:false,
      isEdit:false,
      act: 0,
      index: ''
    }
    this.onAdd = this.onAdd.bind(this);
    this.addForm=this.addForm.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
  }
  addForm(){
    this.setState({showForm:true});   
  }
  onAdd = (e) => {
    e.preventDefault();
    let products = this.state.products;
    let name = this.refs.name.value;
    let price = this.refs.price.value;
    let quantity = this.refs.quantity.value;
    if (this.state.act === 0) { //new
      let product = {
        name, price, quantity
      }
      products.push(product);
      this.setState({showForm:false});
    } 
    else { //update
      let index = this.state.index;
      products[index].name = name;
      products[index].price = price;
      products[index].quantity = quantity;
      console.log('Hello')
      console.log(this.state.showForm)
    }
    this.setState({
      products: products,
      act: 0
    })
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  editSubmit(){
    console.log(this.state.showForm);
    this.setState({isEdit:true})
  }
  onEdit = (i) => {
    this.setState({isEdit:false})
    let product = this.state.products[i];
    this.refs.name.value = product.name;
    this.refs.address.value = product.address;
    this.setState({
      act: 1,
      index: i
    });
    this.refs.name.focus();
  }  

   onRemove = (i) => {
    let products = this.state.products;
    products.splice(i,1);
    this.setState({
      products: products
    });
  }

  render() {
    let products = this.state.products;
    return(
      this.state.showForm ?
      (<div className='App'>
        {/*inject title*/}
        <h2><font color='#66ff33'>{this.state.title}</font></h2>
        <div align='center'>
          <form ref="myForm">
            <table border='1'>
            <tbody>
              <tr><th>Goods Name</th><td><input type='text'ref='name' placeholder='Enter goods name' required/></td></tr>
              <tr><th>Price</th><td><input type='number' ref='price' placeholder='Enter price' /></td></tr>
              <tr><th>Quantity</th><td><input type='number' ref='quantity' placeholder='Enter quantity' /></td></tr>
              <tr>
                <th></th><td><button onClick={(e)=>this.onAdd(e)} className='Add-button'>Add</button></td>
              </tr>
            </tbody>
            </table>
          </form>
        </div>
      </div>)
        :
      (<div className="App">
        <h2><font color='#0000ff'>{this.state.head}</font><font color='#b833ff' className='glyphicon glyphicon-shopping-cart'/></h2>

          <table border='2' align='center'>
          <thead>
            <tr>
              <th>Goods Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>
                <button onClick={this.addForm.bind(this)} className="Add-button"><b className="glyphicon glyphicon-plus-sign"/></button>
              </th>
            </tr>
          </thead>
            <tbody>
          {products.map((product, i) =>
            <tr key={i}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td colSpan='2'>
                  <button onClick={this.editSubmit.bind(this)} className='Edit-button'><b className='glyphicon glyphicon-pencil'/></button>
                  <button onClick={()=>this.onRemove(i)} className='Delete-button'><b className='glyphicon glyphicon-remove'/></button>
                </td>
              </tr>
			)}
            </tbody>
          </table>
      </div>)
    )
  }
}
export default App;