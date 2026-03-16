import { render, screen } from "@testing-library/react";
import Scroll from "./Scroll";

describe("Scroll", () => {
  it("renders children inside the scroll container", () => {
    const { container } = render(
      <Scroll>
        <span>Inside scroll</span>
      </Scroll>
    );

    expect(container.querySelector(".scroll")).toBeInTheDocument();
    expect(screen.getByText("Inside scroll")).toBeInTheDocument();
  });
});
