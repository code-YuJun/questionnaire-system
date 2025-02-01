import fetch from "./fetch";

// 获取单个问卷信息
export function getQuestionService(id: string) {
  return fetch({
    url: `/api/question/${id}`,
    method: "get",
  });
}
// 创建问卷
export function createQuestionService() {
  return fetch({
    url: "/api/question",
    method: "post",
  });
}
// 查询问卷列表
export function getQuestionListService(opt: any) {
  return fetch({
    url: "/api/question",
    method: "get",
    params: opt,
  });
}
// 更新问卷
export function updateQuestionService(id: string, opt: { [key: string]: any }) {
  return fetch({
    url: `/api/question/${id}`,
    method: "patch",
    data: opt,
  });
}
// 复制问卷
export function copyQuestionService(id: string) {
  return fetch({
    url: `/api/question/duplicate/${id}`,
    method: "post",
  });
}
// 批量彻底删除
export function deleteQuestionService(ids: string[]) {
  return fetch({
    url: "/api/question",
    method: "delete",
    data: { ids },
  });
}
