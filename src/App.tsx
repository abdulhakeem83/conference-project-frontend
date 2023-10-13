import ErrorBoundary from "./genericComponents/errorBoundary/ErrorBoundary";
import Routing from "./routing/Routing";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

function App () {
  injectStyle();
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ErrorBoundary>
        <Routing />
      </ErrorBoundary>
    </>
  );
}

export default App;
