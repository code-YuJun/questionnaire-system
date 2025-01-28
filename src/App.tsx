/*
 * @Author: qiangyujun qiangyujun@jd.com
 * @Date: 2025-01-26 14:16:58
 * @LastEditors: qiangyujun qiangyujun@jd.com
 * @LastEditTime: 2025-01-26 15:04:52
 * @FilePath: /project/questionnaire-system/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RouterProvider } from "react-router-dom";
import router from "./router";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
