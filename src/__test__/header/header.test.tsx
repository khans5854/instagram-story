import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/header";

jest.mock("../../components/icons", () => ({
    Instagram: () => <svg data-testid="instagram-icon" />,
}));

describe("Header", () => {
    test("renders the Instagram icon", () => {
        render(<Header />);

        const instagramIcon = screen.getByTestId("instagram-icon");
        expect(instagramIcon).toBeInTheDocument();
    });
});
