import { apiGet, apiPost } from '@/utils/axios'

export interface Permission {
  code: string
  name: string
  description?: string
}
/**
 * 用户信息
 */
export interface UserInfo {
  userId?: string
  userName?: string
  token?: string
  permission?: Permission[]
}


export interface LoginDto {
  userId: string;
  password: string;
  factId: string,
  isRemember?: boolean;
  captcha?: string;
}

export interface ChangePasswdDto {
  oldPasswd: string;
  newPasswd: string;
}

const api = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  Companies: '/user/Companies',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
  // 更改密码
  ChangePwd: '/auth/ChangePasswd',
  ValideToken: '/auth/ValideToken/'
}

/**
 * 登录
 * @param info 登录信息
 */
export function login(info: LoginDto) {
  return apiPost<UserInfo>(api.Login, info)
}

export const valideToken = (token: string) => {
  return apiPost(api.ValideToken, {token})
}