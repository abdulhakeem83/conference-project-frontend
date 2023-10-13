//React Library
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//scroll to top when we navigate to other pages
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScrollToTop = ({ children }: any): JSX.Element => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }, [hash, pathname]);

  return children;
};
export default ScrollToTop;
