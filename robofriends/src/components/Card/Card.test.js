import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders robot details and triggers share", () => {
    const onShareAvatar = jest.fn();

    render(
      <Card
        id={4}
        name="Patricia Lebsack"
        email="patricia@example.com"
        onShareAvatar={onShareAvatar}
      />
    );

    expect(screen.getByText("Patricia Lebsack")).toBeInTheDocument();
    expect(screen.getByText("patricia@example.com")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /share avatar qr/i }));
    expect(onShareAvatar).toHaveBeenCalledWith({
      id: 4,
      name: "Patricia Lebsack",
      email: "patricia@example.com",
    });
  });
});
