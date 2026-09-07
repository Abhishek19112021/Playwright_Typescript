import { APIRequestContext } from '@playwright/test';

export class APiUtils {
  apiContext: APIRequestContext;
  loginPayLoad: any;

  constructor(apiContext: APIRequestContext, loginPayLoad: any) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken(): Promise<string> {
    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: this.loginPayLoad,
    });
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    // keep console log for backward compatibility
    // eslint-disable-next-line no-console
    console.log('APiUtils:getToken token=', token);
    return token;
  }

  async createOrder(orderPayLoad: any): Promise<{ token?: string; orderId?: any }> {
    const response: any = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
      data: orderPayLoad,
      headers: {
        Authorization: response.token,
        'Content-Type': 'application/json',
      },
    });
    const orderResponseJson = await orderResponse.json();
    // eslint-disable-next-line no-console
    console.log('createOrder response=', orderResponseJson);
    const orderId = orderResponseJson.orders && orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}
