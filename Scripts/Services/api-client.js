// http/https call
import URL from '../utils/constant.js'

export const makeNetworkCall=async ()=>{
    try {
        const response= await fetch(URL);  //BLOCK
        const data = await response.json();  //BLOCK
        return data; // wrap promise   
    } catch (err) {
        console.log('Some problem with API calls',err);
        throw err;
    }
   
        }

export default makeNetworkCall;

/*DOM features:
        
window.document
1.document.createElement();
2.document.getElementByid
3.document.getElementByClassName
4.document.getElementByTagName
5.document.querySelector(use #)
6.document.querySelectorAll()

        */