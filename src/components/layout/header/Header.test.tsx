import {
  cleanup,
  fireEvent,
  waitFor,
  render,
  RenderResult,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";
import Header from "./Header";

describe("Register Component test cases", () => {
  const navigate = jest.fn();
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  let container: RenderResult;
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
  });
  afterEach(cleanup);
  it("render header component", async () => {
    const title = container.queryByTestId("headerTitle")!;
    expect(title).toBeInTheDocument();
  });

  it("navbar is rendered or not", async () => {
    const navbar = container.queryByTestId("navbar")!;
    expect(navbar).toBeInTheDocument();
  });

  it("click on home link should navigate to home page ", async () => {
    const home = container.queryByTestId("home")!;
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    await waitFor(() => {
      expect(navigate).toBeCalledWith("/", expect.objectContaining({}));
    });
  });
  it("click on about link should navigate to about page ", async () => {
    const about = container.queryByTestId("about")!;
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    await waitFor(() => {
      expect(navigate).toBeCalledWith("/about", expect.objectContaining({}));
    });
  });

  it("click on contact link should navigate to contact page ", async () => {
    const contact = container.queryByTestId("contact")!;
    expect(contact).toBeInTheDocument();
    fireEvent.click(contact);
    await waitFor(() => {
      expect(navigate).toBeCalledWith("/contact", expect.objectContaining({}));
    });
  });

  it("click on conferences link should navigate to conferences page ", async () => {
    const conferences = container.queryByTestId("conferences")!;
    expect(conferences).toBeInTheDocument();
    fireEvent.click(conferences);
    await waitFor(() => {
      expect(navigate).toBeCalledWith(
        "/conferences",
        expect.objectContaining({}),
      );
    });
  });
  it("is image displayed", async () => {
    const { getByAltText } = container;
    const image = getByAltText("rgtlogo");
    expect(image).toHaveAttribute("src", "[object Object]");
  });
  it("click on home link should navigate to home page ", async () => {
    const homelink = container.queryByTestId("homeLink")!;
    expect(homelink).toBeInTheDocument();
    fireEvent.click(homelink);
    await waitFor(() => {
      expect(navigate).toBeCalledWith("/", expect.objectContaining({}));
    });
  });
});
