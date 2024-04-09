import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "../components/userForm/userList";

describe("UserList Component", () => {
  const users = [
    {
      id: "1",
      name: "Alice",
      hobby: "Reading",
      createdAt: "2023-01-01",
      location: "BENGALURU",
    },
    {
      id: "2",
      name: "Bob",
      hobby: "Gardening",
      createdAt: "2023-01-02",
      location: "BRUSSELS",
    },
  ];

  it("renders table headers correctly", () => {
    render(
      <UserList users={[]} onDelete={() => {}} onLocationChange={() => {}} />,
    );
    expect(screen.getByText("User Name")).toBeInTheDocument();
    expect(screen.getByText("Hobby")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders user data correctly", () => {
    render(
      <UserList
        users={users}
        onDelete={() => {}}
        onLocationChange={() => {}}
      />,
    );
    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.hobby)).toBeInTheDocument();
      expect(screen.getByText(user.location)).toBeInTheDocument();
    });
  });

  it("calls onDelete prop when delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    render(
      <UserList
        users={users}
        onDelete={onDeleteMock}
        onLocationChange={() => {}}
      />,
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);

    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });
});
