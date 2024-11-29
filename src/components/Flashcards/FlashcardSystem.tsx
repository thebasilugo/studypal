"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpcomingFeatureModal } from "@/components/ui/upcoming-feature-modal";

type Flashcard = {
	id: string;
	question: string;
	answer: string;
	lastReviewed: number;
	nextReview: number;
	difficulty: number;
};

const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 90, 180]; // in days

export function FlashcardSystem() {
	const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		const savedFlashcards = localStorage.getItem("flashcards");
		if (savedFlashcards) {
			setFlashcards(JSON.parse(savedFlashcards));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("flashcards", JSON.stringify(flashcards));
	}, [flashcards]);

	const addFlashcard = () => {
		if (question && answer) {
			const newFlashcard: Flashcard = {
				id: Date.now().toString(),
				question,
				answer,
				lastReviewed: Date.now(),
				nextReview: Date.now() + 24 * 60 * 60 * 1000, // Next day
				difficulty: 0,
			};
			setFlashcards([...flashcards, newFlashcard]);
			setQuestion("");
			setAnswer("");
		}
	};

	const getNextCard = () => {
		const now = Date.now();
		const dueCards = flashcards.filter((card) => card.nextReview <= now);
		if (dueCards.length > 0) {
			return dueCards[Math.floor(Math.random() * dueCards.length)];
		}
		return null;
	};

	const startReview = () => {
		const nextCard = getNextCard();
		setCurrentCard(nextCard);
		setShowAnswer(false);
	};

	const updateCardDifficulty = (difficulty: number) => {
		if (currentCard) {
			const updatedCard = {
				...currentCard,
				difficulty,
				lastReviewed: Date.now(),
				nextReview:
					Date.now() + REVIEW_INTERVALS[difficulty] * 24 * 60 * 60 * 1000,
			};
			setFlashcards(
				flashcards.map((card) =>
					card.id === currentCard.id ? updatedCard : card
				)
			);
			startReview();
		}
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Flashcard System</CardTitle>
				<CardDescription>
					Create and review flashcards with spaced repetition.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="create">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="create">Create</TabsTrigger>
						<TabsTrigger value="review">Review</TabsTrigger>
					</TabsList>
					<TabsContent value="create">
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="question">Question</Label>
								<Input
									id="question"
									value={question}
									onChange={(e) => setQuestion(e.target.value)}
									placeholder="Enter the question"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="answer">Answer</Label>
								<Textarea
									id="answer"
									value={answer}
									onChange={(e) => setAnswer(e.target.value)}
									placeholder="Enter the answer"
								/>
							</div>
							<Button onClick={addFlashcard} className="w-full">
								Add Flashcard
							</Button>
						</div>
					</TabsContent>
					<TabsContent value="review">
						{currentCard ? (
							<div className="space-y-4">
								<div className="text-center">
									<h3 className="text-lg font-semibold">Question:</h3>
									<p>{currentCard.question}</p>
								</div>
								{showAnswer && (
									<div className="text-center mt-4">
										<h3 className="text-lg font-semibold">Answer:</h3>
										<p>{currentCard.answer}</p>
									</div>
								)}
								<div className="flex justify-center space-x-2">
									{!showAnswer && (
										<Button onClick={() => setShowAnswer(true)}>
											Show Answer
										</Button>
									)}
									{showAnswer && (
										<>
											<Button onClick={() => updateCardDifficulty(0)}>
												Easy
											</Button>
											<Button onClick={() => updateCardDifficulty(2)}>
												Medium
											</Button>
											<Button onClick={() => updateCardDifficulty(4)}>
												Hard
											</Button>
										</>
									)}
								</div>
							</div>
						) : (
							<div className="text-center">
								<p className="mb-4">No cards due for review.</p>
								<Button onClick={startReview}>Start Review</Button>
							</div>
						)}
					</TabsContent>
				</Tabs>
				<div className="mt-8 flex justify-center space-x-4">
					<UpcomingFeatureModal
						featureName="AI-Generated Questions"
						description="We're working on integrating AI to automatically generate relevant questions based on your study materials."
					/>
					<UpcomingFeatureModal
						featureName="Image Flashcards"
						description="Soon, you'll be able to create flashcards with images for visual learning."
					/>
				</div>
			</CardContent>
		</Card>
	);
}
