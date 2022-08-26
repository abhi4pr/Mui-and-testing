import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Signup from '../Signup';
import * as Constants from '../Constants';
import axios from 'axios';

// it == test and test == it

jest.mock('axios');

describe("render register component", ()=>{
  it("should render hello text", ()=>{
    render(<Signup />);
    expect(screen.getByText('Hello User !!!')).toBeInTheDocument();
  })

  it("should type and valid email", ()=>{
    const result = render(<Signup />);
    const input = result.container.querySelector('#email');
    fireEvent.change(input, {target: {value: 'abhi@gmail.com'}})
  })

  it("should render blue button", ()=>{
    render(<Signup />);
    expect(screen.getByRole('button', {name: 'Register'})).toBeInTheDocument();
  })

  it("should disabled button on no input", ()=>{
    render(<Signup />);
    const input = screen.getByPlaceholderText('Email');
    fireEvent.change(input, {target:{value: ''}})
    const btn = screen.getByRole('button', {name: 'Register'})
    expect(btn).toHaveAttribute('disabled')
  })

  it("should submit form successfully", async()=>{
    render(<Signup />);
    const handleReg = jest.fn();
    fireEvent.submit(screen.getByTestId("regform"));
      const response = 
        {
          "userv": {
            "name":"user1",
            "email":"user@gmail.com",
            "password":"e30a8712f4b563f390b94f4b64d18ab2d1ee44fde4ebf0cf679a9e760d8d520b2ad752933e8285d36168cbacee3662d6e8a3b34ba157c9e132ace4d78439e66f41cf0f6c436ee947d9e97aefd8e10ceb601ecdbb5b3cd29473dde5ea82774ebaf4bd5f43b1d1efd0",
            "phone":"784561231",
            "isAdmin":false,
            "address":"user address gali no. 4",
            "_id":"630865edea0c1bf77fe03a44",
            "__v":0
          },
          "status":200
        };

      axios.post.mockImplementation(() => {
        return Promise.resolve({ data: response })
      });
      const result = await Constants.PostAPI('registeruser');
    expect(result).toEqual(response);
  })

  it("should handle error when post api fails", async () => {
      const message = undefined;
      axios.get.mockImplementation(() => {
        throw new Error();
      });
      const result = await Constants.PostAPI('registeruser');
      expect(result).toEqual(message);
  });

})
