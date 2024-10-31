import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from ".";
import React from "react";
describe("Page", () => {
    it("renders title and children", () => {
        const title = "Test Title";
        const children ="Test Children";
        const { getByText } = render(<Page title={title}>{children}</Page>);
        
        //Act
        const titleElement = getByText(title);
        const childrenElement = getByText(children);

        //Assert
        expect(titleElement).toBeInTheDocument();
        expect(childrenElement).toBeInTheDocument();
    });
    it("renders the correct styling", () => {
        // Arrange
        const title = "Test Title";
        const children = "Test Children";
        const { getByTestId } = render(<Page title={title}>{children}</Page>);
    
        // Act
        const container = getByTestId("page-container");
    
        // Assert
        expect(container).toHaveStyle(`
        justify-content: center;
        `);
      });
});