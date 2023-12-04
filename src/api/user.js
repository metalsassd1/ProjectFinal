// import React from 'react'
// import axios from 'axios'

// import {setupAxios} from '../../modules/auth'
// import {SwalAlert} from '../SwalMessage/SwalMessageComponent'
// import Swal from 'sweetalert2'

// const MODULE_PATH = '/api/user'
// // const API_URL = CONFIG_URL + MODULE_PATH
// const API_URL = MODULE_PATH

// interface RequestUserList {
//   userId?: number
//   roleIdList: number[]
//   username: string
//   password: string
//   firstname: string
//   lastname: string
//   email: string
//   subEmail: string
//   phone: string
//   pageSize: number
//   page: number
// }

// export const UserListApi = async (params: RequestUserList): Promise<any> => {
//   setupAxios(axios)

//   let requestParams = {
//     userId: params?.userId,
//     roleIdList: params.roleIdList || [],
//     username: params.username || '',
//     firstname: params.firstname || '',
//     lastname: params.lastname || '',
//     email: params.email || '',
//     pageSize: params.pageSize || 10,
//     page: params.page || 1,
//   }

//   return await axios({
//     url: `${API_URL}/users-list`,
//     method: 'GET',
//     params: requestParams,
//   })
//     .then((response: any) => {
//       return response.data
//     })
//     .catch((error: any) => {
//       SwalAlert(error)
//     })
// }

// export const UserByIdApi = async (userId: number): Promise<any> => {
//   setupAxios(axios)

//   let requestParams = {
//     userId: userId,
//   }

//   return await axios({
//     url: `${API_URL}/edit-user`,
//     method: 'POST',
//     data: requestParams,
//   })
//     .then((response: any) => {
//       return response.data
//     })
//     .catch((error: any) => {
//       SwalAlert(error)
//     })
// }

// interface RequestCreateUser {
//   roleIdList: number[]
//   username: string
//   password: string
//   firstname: string
//   lastname: string
//   email: string
//   subEmail: string
//   phone: string
// }

// const CreateUserSuccessAlert = (resp: any) => {
//   resp.title = 'Add user'
//   SwalAlert(resp)
// }

// export const CreateUserApi = async (params: RequestCreateUser): Promise<any> => {
//   setupAxios(axios)
//   return await axios({
//     url: `${API_URL}/create-user`,
//     method: 'POST',
//     data: params,
//   })
//     .then((response: any) => {
//       CreateUserSuccessAlert(response.data)
//     })
//     .catch((error: any) => {
//       SwalAlert(error)
//     })
// }

// const UpdateUserSuccessAlert = (resp: any) => {
//   resp.title = 'Update user'
//   SwalAlert(resp)
// }

// interface RequestUpdateUser {
//   userId: number
//   roleIdList: number[]
//   username: string
//   password?: string
//   firstname: string
//   lastname: string
//   email: string
//   subEmail: string
//   phone: string
// }

// export const UpdateUserApi = async (params: RequestUpdateUser): Promise<any> => {
//   setupAxios(axios)
//   return await axios({
//     url: `${API_URL}/update-user`,
//     method: 'PUT',
//     data: params,
//   })
//     .then((response: any) => {
//       UpdateUserSuccessAlert(response.data)
//     })
//     .catch((error: any) => {
//       SwalAlert(error)
//     })
// }

// interface RequestDeleteUser {
//   userId: number
// }

// const DeleteUserSuccessAlert = (resp: any) => {
//   resp.title = 'Delete user'
//   SwalAlert(resp)
// }

// export const DeleteUserApi = async (params: RequestDeleteUser): Promise<any> => {
//   setupAxios(axios)
//   return await axios({
//     url: `${API_URL}/delete-user`,
//     method: 'DELETE',
//     data: params,
//   })
//     .then((response: any) => {
//       DeleteUserSuccessAlert(response.data)
//     })
//     .catch((error: any) => {
//       SwalAlert(error)
//     })
// }
