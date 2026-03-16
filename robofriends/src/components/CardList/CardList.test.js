import { fireEvent, render, screen } from "@testing-library/react";
import CardList from "./CardList";

describe("CardList", () => {
  it("renders all robots and forwards share actions", () => {
    const onShareAvatar = jest.fn();

    render(
      <CardList
        robots={[
          { id: 1, name: "Leanne Graham", email: "leanne@example.com" },
          { id: 2, name: "Ervin Howell", email: "ervin@example.com" },
        ]}
        onShareAvatar={onShareAvatar}
      />
    );

    expect(screen.getByLabelText(/robot directory/i)).toBeInTheDocument();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /share avatar qr/i })[1]);
    expect(onShareAvatar).toHaveBeenCalledWith({
      id: 2,
      name: "Ervin Howell",
      email: "ervin@example.com",
    });
  });
});
