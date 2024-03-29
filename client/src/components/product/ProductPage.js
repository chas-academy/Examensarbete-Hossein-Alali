import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { getProductById } from '../../actions/productActions';

import './Product.css';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: '',
      price: null,
      category: [],
      stock: null,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.product.title,
      description: nextProps.product.description,
      image: nextProps.product.image,
      price: nextProps.product.price,
      category: nextProps.product.category,
      stock: nextProps.product.stock
    });
  }

  componentDidMount() {
    this.props.getProductById(this.props.match.params.id);
  }

  componentWillUpdate(prevProps) {
    if (this.props.product._id !== prevProps.match.params.id) {
      this.props.getProductById(prevProps.match.params.id);
    }
  }

  onCartClick(id) {
    this.props.addToCart(id);
  }

  render() {
    const inStock = (
      <div className='product-stock'>
        <i className='fas fa-check' /> In Stock
      </div>
    );

    const outOfStock = (
      <div className='product-stock'>
        <i className='fas fa-times' /> In Stock
      </div>
    );

    return (
      <div className='product-page'>
        <div className='container'>
          <div className='product'>
            <div className='product-img'>
              <img src={this.state.image} alt='product' />
            </div>
            <div className='product-info'>
              <h4 className='product-title'>{this.state.title}</h4>
              <p className='product-price'> {this.state.price} SEK</p>
              <div className='category-container'>
                <ul className='category'>
                  <p>Category:</p>
                  {this.state.category.slice(0, 6).map((category, index) => (
                    <li key={index} className='padded'>
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              {this.state.stock > 0 ? inStock : outOfStock}
              <div className='add-cart'>
                <button
                  onClick={this.onCartClick.bind(
                    this,
                    this.props.match.params.id
                  )}
                  className='btn btn-success'
                >
                  <i className='fas fa-cart-plus' /> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='container product-description'>
          <p className='description-header'>Description:</p>
          <p>{this.state.description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product
});

const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    },
    getProductById: id => {
      dispatch(getProductById(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductPage));
