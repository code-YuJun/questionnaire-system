import { RouterProvider } from "react-router-dom";
import router from "./router";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerColor: "#ffffff",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
