import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "@/components/CustomButton";

describe("CustomButton", () => {
  test("renders correctly with text and icon", () => {
    const { getByText, getByTestId } = render(
      <CustomButton callback={() => {}} enabled={true} icon="check">
        Login
      </CustomButton>
    );

    expect(getByText("Login")).toBeTruthy();

    const button = getByTestId("custom-button");
    expect(button).toBeTruthy();
  });

  test("calls callback when pressed", () => {
    const callbackMock = jest.fn();
    const { getByTestId } = render(
      <CustomButton callback={callbackMock} enabled={true}>
        Login
      </CustomButton>
    );

    const button = getByTestId("custom-button");
    fireEvent.press(button);

    expect(callbackMock).toHaveBeenCalled();
  });
});
