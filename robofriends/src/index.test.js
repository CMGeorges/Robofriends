jest.mock("react-dom", () => ({
  render: jest.fn(),
}));

jest.mock("./containers/App/App", () => () => <div>Mock App</div>);
jest.mock("./reportWebVitals", () => jest.fn());

import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

describe("index", () => {
  it("renders the app and starts web vitals", () => {
    require("./index");

    expect(ReactDOM.render).toHaveBeenCalled();
    expect(reportWebVitals).toHaveBeenCalled();
  });
});
