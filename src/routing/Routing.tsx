import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ScrollToTop from "../genericComponents/scroll/ScrollToTop";
import Spinner from "../genericComponents/spinner/Spinner";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import PageNotFound from "../genericComponents/pageNotFound/PageNotFound";
const Home = lazy(() => import("../components/home/Home"));
const About = lazy(() => import("../components/about/About"));
const Contact = lazy(() => import("../components/contact/Contact"));
const Conferences = lazy(() => import("../components/conferences/conferences"));
const ConferenceDetails = lazy(
  () => import("../components/conferenceDetails/ConferenceDetails"),
);
function Routing () {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Spinner />}>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route
              path="/conferenceDetails/:id"
              element={<ConferenceDetails />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ScrollToTop>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default Routing;
