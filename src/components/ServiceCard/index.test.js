import { render, screen } from "@testing-library/react";
import ServiceCard from "./index";

describe("When a service card is created", () => {
  it("an image is display with alt value", () => {
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">{" "}</ServiceCard>
    );
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });
  it("a content is displayed", () => {
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">
        This is the card content
      </ServiceCard>
    );
    const contentElement = screen.getByText(/This is the card content/);
    expect(contentElement).toBeInTheDocument();
  });
});

 // Test pour vérifier que la prop `imageAlt` par défaut fonctionne
 it("should use the default alt text if none is provided", () => {
  render(
    <ServiceCard imageSrc="http://src-image">{" "}</ServiceCard>
  );
  const imageElement = screen.getByTestId("card-image-testid");
  expect(imageElement.alt).toEqual("image"); // Le texte par défaut pour `imageAlt`
});

// Test pour vérifier si le contenu enfant est vide
it("should render without content when children is empty", () => {
  render(
    <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text"> </ServiceCard>
  );
  const contentElement = screen.queryByText(/This is the card content/);
  expect(contentElement).not.toBeInTheDocument();
});

// Test pour vérifier que le composant gère un contenu HTML
it("should render HTML content correctly", () => {
  render(
    <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">
      <strong>This is bold content</strong>
    </ServiceCard>
  );
  const htmlContentElement = screen.getByText(/This is bold content/);
  expect(htmlContentElement).toBeInTheDocument();
  expect(htmlContentElement.tagName).toBe("STRONG"); // Vérifier que l'élément est bien rendu en <strong>
});

