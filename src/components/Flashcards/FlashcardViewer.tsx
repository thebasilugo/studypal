"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Shuffle, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type Flashcard = {
	id: string;
	question: string;
	answer: string;
};

export function FlashcardViewer() {
	const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		const savedFlashcards = localStorage.getItem("flashcards");
		if (savedFlashcards) {
			setFlashcards(JSON.parse(savedFlashcards));
		}
	}, []);

	const nextCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
		setShowAnswer(false);
	};

	const prevCard = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
		);
		setShowAnswer(false);
	};

	const toggleAnswer = () => {
		setShowAnswer(!showAnswer);
	};

	const shuffleCards = () => {
		const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
		setFlashcards(shuffled);
		setCurrentIndex(0);
		setShowAnswer(false);
	};

	if (flashcards.length === 0) {
		return (
			<Card className="w-full">
				<CardContent className="pt-6">
					<p className="text-center text-muted-foreground">
						No flashcards available. Create some flashcards to start studying!
					</p>
				</CardContent>
			</Card>
		);
	}

	const currentCard = flashcards[currentIndex];

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Flashcard Viewer</CardTitle>
				<CardDescription>
					Card {currentIndex + 1} of {flashcards.length}
				</CardDescription>
			</CardHeader>
			<CardContent className="text-center min-h-[200px] flex flex-col justify-center">
				<div className="mb-4">
					<h3 className="text-lg font-semibold mb-2">Question:</h3>
					<p>{currentCard.question}</p>
				</div>
				{showAnswer && (
					<div className="mt-4">
						<h3 className="text-lg font-semibold mb-2">Answer:</h3>
						<p>{currentCard.answer}</p>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex flex-wrap justify-between gap-2">
				<Button onClick={prevCard} variant="outline" size="icon">
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button onClick={toggleAnswer}>
					{showAnswer ? "Hide Answer" : "Show Answer"}
				</Button>
				<Button onClick={shuffleCards} variant="outline">
					<Shuffle className="h-4 w-4 mr-2" />
					Shuffle
				</Button>
				<Button onClick={nextCard} variant="outline" size="icon">
					<ChevronRight className="h-4 w-4" />
				</Button>
			</CardFooter>
		</Card>
	);
}
