import fetch from "./fetch";
// 用户登录
export const login = (username: string, password: string) => {
  return fetch({
    url: "/api/user/login",
    method: "post",
    data: { username, password },
  });
};

// 用户注册
export const register = (
  username: string,
  password: string,
  nickname: string
) => {
  return fetch({
    url: "/api/user/register",
    method: "post",
    data: { username, password, nickname },
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return fetch({
    url: "/api/user/info",
    method: "get",
  });
};
