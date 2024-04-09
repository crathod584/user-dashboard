import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import UserForm from "../components/userForm/userForm";

describe("UserForm", () => {
  it("updates name field correctly", () => {
    const { getByLabelText } = render(<UserForm onSubmit={() => {}} />);
    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "John" } });
    expect(nameInput).toHaveValue("John");
  });

  it("updates hobby field correctly", () => {
    const { getByLabelText } = render(<UserForm onSubmit={() => {}} />);
    const hobbyInput = getByLabelText("Hobby");
    fireEvent.change(hobbyInput, { target: { value: "Reading" } });
    expect(hobbyInput).toHaveValue("Reading");
  });

  it("submits form with correct user data", () => {
    const mockSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <UserForm onSubmit={mockSubmit} />,
    );

    fireEvent.change(getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Hobby"), { target: { value: "Reading" } });
    fireEvent.click(getByText("Add User"));

    expect(mockSubmit).toHaveBeenCalledWith({
      id: "",
      name: "John",
      hobby: "Reading",
      createdAt: "",
      location: "",
    });
  });
});
