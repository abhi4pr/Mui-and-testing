import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Listings from '../Listings';
import * as Constants from '../Constants';
import axios from 'axios';

// it == test and test == it

jest.mock('axios');

describe("render Listing component", ()=>{

  it("should render header", ()=>{
    render(<Listings />);
    expect(screen.getByText('MUI')).toBeInTheDocument();
  })

  it('should call api and display list type 2', async () => {
    const products = [
      {
        "_id": "62e905ef9045f1fa6cfe0cc7",
        "name": "product2",
        "description": "tu hi song new",
        "image": "http://www.localhost:4500/public/uploads/gaztelugatxe4.jpg-1659433635439.jpeg",
        "images": [],
        "brand": "mochi",
        "price": 123,
        "category": {
            "_id": "62d91737bd704236c29370f0",
            "name": "mobiles",
            "icon": "fa fa-mobile",
            "__v": 0
        },
        "countInStock": 88,
        "rating": 0,
        "numReviews": 0,
        "dateCreated": "2022-08-02T09:47:15.488Z",
        "__v": 0
      }
    ];

    axios.get.mockImplementation(() => {
      return Promise.resolve({ data: products })
    });
    const result = await Constants.GetAPI('getallproduct');
    expect(result).toEqual(products);
  })  

  it("should call api and display list type 3", async()=>{
    const products = [
      {
        "_id": "62e905ef9045f1fa6cfe0cc7",
        "name": "product2",
        "description": "tu hi song new",
        "image": "http://www.localhost:4500/public/uploads/gaztelugatxe4.jpg-1659433635439.jpeg",
        "images": [],
        "brand": "mochi",
        "price": 123,
        "category": {
            "_id": "62d91737bd704236c29370f0",
            "name": "mobiles",
            "icon": "fa fa-mobile",
            "__v": 0
        },
        "countInStock": 88,
        "rating": 0,
        "numReviews": 0,
        "dateCreated": "2022-08-02T09:47:15.488Z",
        "__v": 0
      }
    ];

    axios.get.mockImplementation(url => {
      if(url == Constants.APIURL+'getallproduct'){
        return Promise.resolve({data: products})
      }
    })
    render(<Listings />)
    const text = await screen.findByText('product2')
    expect(text).toBeInTheDocument();
  })

  it("should handle error when products api fails", async () => {
      const message = undefined;
      axios.get.mockImplementation(() => {
        throw new Error();
      });
      const result = await Constants.GetAPI('getallproduct');
      expect(result).toEqual(message);
  });

})