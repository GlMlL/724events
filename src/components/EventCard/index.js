import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

// Fonction utilitaire pour obtenir le dernier événement en date
const getLastEvent = (events) => {
  if (!events || events.length === 0) return null;
  return events.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};

const EventCard = ({
  events, // Modifié pour accepter une liste d'événements
  imageAlt,
  small = false,
  ...props
}) => {
  // Obtenez le dernier événement en date
  const latestEvent = getLastEvent(events);

  if (!latestEvent) return null; // Ne rien afficher si aucun événement n'est disponible

  const { imageSrc, date, title, label } = latestEvent;

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt || "image"} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  imageAlt: PropTypes.string,
  small: PropTypes.bool,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
};

export default EventCard;
