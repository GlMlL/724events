import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

// Début de notre suite de tests pour vérifier les fonctionnalités de la page "Home"
describe("When Form is created", () => {
  // Ce test vérifie si, lorsque le formulaire est affiché, les champs nécessaires sont bien présents
  it("a list of fields card is displayed", async () => {
    // J'affiche le composant Home
    render(<Home />);

    // Je m'assure que les champs du formulaire sont visibles sur la page
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Cette partie teste ce qui se passe lorsqu'on clique sur le bouton "Envoyer"
  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      // J'affiche encore le composant Home
      render(<Home />);

      // Je simule un clic sur le bouton "Envoyer"
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true, // Je rends l'événement annulable
          bubbles: true, // L'événement se propage dans le DOM
        })
      );

      // Je m'assure que les messages indiquant l'envoi du formulaire sont bien affichés
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

// Nouvelle suite de tests pour vérifier que d'autres éléments de la page "Home" sont bien affichés
describe("When a page is created", () => {
  // Ce test vérifie si une liste d'événements (réalisations) est affichée
  it("a list of events is displayed", async () => {
    // J'affiche le composant Home
    render(<Home />);

    // Je récupère tous les éléments avec le texte "Nos réalisations"
    const eventHeadings = screen.getAllByText("Nos réalisations");

    // Je vérifie qu'au moins un de ces éléments est un titre <H2>
    expect(eventHeadings.some((el) => el.tagName === "H2")).toBe(true);
  });

  // Ce test vérifie si une liste de membres d'équipe est affichée
  it("a list of people is displayed", () => {
    // J'affiche encore le composant Home
    render(<Home />);

    // Je récupère tous les éléments avec le texte "Notre équipe"
    const peopleHeadings = screen.getAllByText("Notre équipe");

    // Je vérifie qu'au moins un de ces éléments est un titre <H2>
    expect(peopleHeadings.some((el) => el.tagName === "H2")).toBe(true);

    // Je m'assure que les noms des membres de l'équipe sont visibles sur la page
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  // Ce test vérifie si le footerest affiché correctement
  it("a footer is displayed", () => {
    // J'affiche à nouveau le composant Home
    render(<Home />);

    // Je vérifie que les informations de contact sont présentes dans le footer
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(
      screen.getByText("45 avenue de la République, 75000 Paris")
    ).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument();
  });

  // Ce test vérifie si une carte contenant les détails du dernier événement est affichée
  it("an event card, with the last event, is displayed", async () => {
    // J'affiche une dernière fois le composant Home
    render(<Home />);

    // J'attends que le texte concernant "Notre dernière prestation" apparaisse dans le DOM
    await waitFor(() => screen.getByText(/notre dernière prestation/i));

    // Je m'assure que ce texte est bien présent sur la page
    expect(screen.getByText(/notre dernière prestation/i)).toBeInTheDocument();
  });
});
