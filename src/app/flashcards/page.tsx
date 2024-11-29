import { FlashcardSystem } from "@/components/Flashcards/FlashcardSystem";

export default function FlashcardsPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Flashcards</h1>
			<FlashcardSystem />
		</div>
	);
}
