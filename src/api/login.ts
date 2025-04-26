import request from "@/utils/request";
/** 登录表单数据 */
export interface LoginFormData {
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
}
export function login(data: LoginFormData) {
  return request({
    url: "/login",
    method: "post",
    data,
    headers: {
      Authorization: "no-auth",
    },
  });
}
