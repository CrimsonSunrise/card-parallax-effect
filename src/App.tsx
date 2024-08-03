import { useEffect, useState, MouseEvent } from "react";
import "./App.scss";

type CardProps = {
	title: string;
	bg: string;
	img: string;
	thumb: string;
	selectImage: (card: CardProps) => void;
};

/**
 * Card component
 * @param card - CardProps object containing card details and the selectImage function
 * @returns JSX.Element representing the card
 */
const Card = (card: CardProps): JSX.Element => {
	const { selectImage } = card;

	/**
	 * Handles the card click event to mark it as active and call selectImage
	 * @param e - MouseEvent object
	 */
	const alternateCard = (e: MouseEvent<HTMLDivElement>) => {
		document.querySelectorAll(".card").forEach((card) => {
			card.classList.remove("active");
		});
		(e.target as HTMLElement).classList.add("active");

		selectImage(card);
	};

	return (
		<div className="card" onClick={alternateCard}>
			<div className="mark">
				<div className="check"></div>
			</div>
			<img src={card.thumb} alt="" />
		</div>
	);
};

/**
 * Main App component
 * @returns JSX.Element representing the main app
 */
function App(): JSX.Element {
	const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		document.querySelectorAll(".card")[0].classList.add("active");
		setSelectedCard({
			title: "Card 1",
			bg: "/assets/arts/1_bg.png",
			img: "/assets/arts/1.png",
			thumb: "/assets/arts/1_thumb.png",
			selectImage: selectImage,
		});
	}, []);

	/**
	 * Handles selecting an image by setting the selected card
	 * @param card - CardProps object
	 */
	const selectImage = (card: CardProps) => {
		setSelectedCard(card);
	};

	/**
	 * Handles mouse move events to update mouse position state
	 * @param e - MouseEvent object
	 */
	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const x = (e.clientX - width / 2) / 100;
		const y = (height / 2 - e.clientY) / -1 / 100;

		setMousePos({ x, y });
	};

	const cards: CardProps[] = Array.from({ length: 5 }, (_, index) => ({
		title: `Card ${index + 1}`,
		bg: `/assets/arts/${index + 1}_bg.png`,
		img: `/assets/arts/${index + 1}.png`,
		thumb: `/assets/arts/${index + 1}_thumb.png`,
		selectImage: selectImage,
	}));

	return (
		<div className="container" onMouseMove={handleMouseMove}>
			<div className="preview">
				<div className="preview-bg">
					<img
						src={selectedCard?.bg}
						alt=""
						style={{
							transform: `scale(1.1) translate(${-mousePos.x}px, ${-mousePos.y}px)`,
						}}
					/>
				</div>
				<div
					className="preview-image"
					style={{
						transform: `scale(1.1) translate(${mousePos.x}px, ${mousePos.y}px)`,
					}}
				>
					<img src={selectedCard?.img} alt="" />
				</div>
			</div>

			<div className="cards">
				{cards.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>
		</div>
	);
}

export default App;
