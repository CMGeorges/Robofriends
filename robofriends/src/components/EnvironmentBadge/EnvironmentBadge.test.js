import { render, screen } from "@testing-library/react";
import EnvironmentBadge from "./EnvironmentBadge";

describe("EnvironmentBadge", () => {
  it("renders the environment name", () => {
    render(<EnvironmentBadge environment="staging" />);

    expect(screen.getByText("Staging environment")).toBeInTheDocument();
  });
});
