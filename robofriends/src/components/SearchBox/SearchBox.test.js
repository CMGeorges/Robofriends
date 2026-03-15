import { fireEvent, render, screen } from "@testing-library/react";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("renders a controlled search input", () => {
    const searchChange = jest.fn();

    render(<SearchBox searchField="lea" searchChange={searchChange} />);

    const input = screen.getByLabelText(/search robot directory/i);
    expect(input).toHaveValue("lea");

    fireEvent.change(input, { target: { value: "leanne" } });
    expect(searchChange).toHaveBeenCalled();
  });
});
