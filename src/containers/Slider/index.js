import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  // Tri des événements par date descendante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer au slide suivant
  const nextCard = () => {
    setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
  };

  // Utiliser useEffect avec la dépendance "index" pour mettre à jour le slide toutes les 5 secondes
  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer); // Nettoie le timer à chaque mise à jour
  }, [index]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event) => (
        <div
          key={`slide-${event.id}`}  // Utilisation de l'ID de l'événement comme clé unique
          className={`SlideCard SlideCard--${
            index === byDateDesc.indexOf(event) ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event) => (
            <input
              key={`pagination-${event.id}`} // Utilisation de l'ID de l'événement comme clé unique pour chaque bouton de pagination
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))} // Permet de sélectionner directement une slide
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
