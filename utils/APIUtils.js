class APIUtils
{

    constructor(apiContext,loginPayload)
    {
         this.apiContext= apiContext;
         this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const logresponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
           {
             data:this.loginPayload
           })
        
           const loginResponseJson = await logresponse.json();
           const tokenVal=loginResponseJson.token;
           console.log(tokenVal);
           return tokenVal;      
    }

    async createOrder(orderPayload)
    {

        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

            {
                 data : orderPayload,
                 headers : {
                      'Authorization' : response.token,
                      'content-type' :'application/json'
                 }
            }
          )
       
          const createOrderResponse = await orderResponse.json();
          console.log(await createOrderResponse);
          const orderId = await createOrderResponse.orders[0];
          response.orderId = orderId;
          console.log(orderId);
          return response;
    }
}

module.exports={APIUtils};