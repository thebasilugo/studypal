"use client";

import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";

type Flashcard = {
	id: string;
	question: string;
	answer: string;
};

export function FlashcardCreator() {
	const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const { toast } = useToast();

	const addFlashcard = () => {
		if (question && answer) {
			const newFlashcard: Flashcard = {
				id: Date.now().toString(),
				question,
				answer,
			};
			setFlashcards([...flashcards, newFlashcard]);
			setQuestion("");
			setAnswer("");
			localStorage.setItem(
				"flashcards",
				JSON.stringify([...flashcards, newFlashcard])
			);
			toast({
				title: "Flashcard Created",
				description: "Your new flashcard has been added to the deck.",
			});
		} else {
			toast({
				title: "Error",
				description: "Please enter both a question and an answer.",
				variant: "destructive",
			});
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Create Flashcard</CardTitle>
				<CardDescription>
					Add a new flashcard to your study deck.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid w-full gap-4">
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
							rows={4}
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={addFlashcard} className="w-full">
					Add Flashcard
				</Button>
			</CardFooter>
		</Card>
	);
}
