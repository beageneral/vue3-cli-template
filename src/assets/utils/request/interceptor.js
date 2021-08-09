/*
 * @Date: 2021-01-13 11:57:41
 * @LastEditTime: 2021-06-18 18:17:01
 * @Description: axios 拦截器
 */
import axios from 'axios'
import { handleError } from './handleException'
import { requestTimeout } from '@/config'
import handleRequest from './handleRequest'
import handleResponse from './handleResponse'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  timeout: requestTimeout,
})

http.interceptors.request.use(
  (config) => handleRequest(config),
  (err) => handleError(err)
)

http.interceptors.response.use(
  (res) => handleResponse(res),
  (err) => handleError(err)
)

export default http
