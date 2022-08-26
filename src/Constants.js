import axios from 'axios';

export var APIURL = 'http://3.141.33.10:3100/api/';

function handleErrorObservable(error) {
   var response = error.message || error;
   let responseJson = { is_error: true, message: response };
   return responseJson;
}

export const PostAPI = async (URL, Data) => {
    try {
       const response = await axios.post(APIURL + URL, Data);
       return response.data;
    }
    catch (error) {
       handleErrorObservable(error);
    }
}

export const GetAPI = async (URL, props) => {
   try {
      const response = await axios.get(APIURL + URL);
      return response.data;
   }
   catch (error) {
      handleErrorObservable(error);
   }
}

export const PutAPI = async (URL, Data) => {
   try {
      const response = await axios.put(APIURL + URL, Data);
      return response.data;
   }
   catch (error) {
      handleErrorObservable(error);
   }
}

export const DeleteAPI = async (URL) => {
   try {
      const response = await axios.delete(APIURL + URL);
      return response;
   }
   catch (error) {
      handleErrorObservable(error);
   }
}