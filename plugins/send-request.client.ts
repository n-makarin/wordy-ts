export default ({ app, store, redirect }: any, inject: any): any => {
  inject('sendRequest', ({
    method,
    url,
    params,
    data,
    ...options
  }: any) => {
    const endpoint: string = 'http://127.0.0.1:8000'
    const headers: string = ''
    return app.$axios({
      method,
      url: endpoint + url,
      params,
      data,
      headers,
      ...options
    })
  })
}
