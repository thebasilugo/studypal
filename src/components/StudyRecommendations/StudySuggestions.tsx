"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function StudySuggestions() {
	const [input, setInput] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const { toast } = useToast();

	const generateSuggestions = async () => {
		// In a real application, this would call an AI service
		// For now, we'll use a simple algorithm to generate suggestions
		const keywords = input.toLowerCase().split(/\s+/);
		const generatedSuggestions = [
			"Create flashcards for key terms and concepts",
			"Use the Pomodoro technique: 25 minutes of focused study, then a 5-minute break",
			"Teach the material to someone else or explain it out loud",
			"Practice with past exam questions or problem sets",
			"Create mind maps or diagrams to visualize connections between concepts",
		];

		const filteredSuggestions = generatedSuggestions.filter((suggestion) =>
			keywords.some((keyword) => suggestion.toLowerCase().includes(keyword))
		);

		setSuggestions(
			filteredSuggestions.length > 0
				? filteredSuggestions
				: generatedSuggestions
		);
		toast({
			title: "Study Suggestions Generated",
			description: "Check out the personalized study tips below!",
		});
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>AI Study Suggestions</CardTitle>
				<CardDescription>
					Get personalized study tips based on your input
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea
					placeholder="Enter your study goals, subjects, or challenges..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					rows={4}
				/>
			</CardContent>
			<CardFooter className="flex-col items-start gap-4">
				<Button onClick={generateSuggestions}>Generate Suggestions</Button>
				{suggestions.length > 0 && (
					<div>
						<h3 className="font-semibold mb-2">Study Suggestions:</h3>
						<ul className="list-disc pl-5 space-y-1">
							{suggestions.map((suggestion, index) => (
								<li key={index}>{suggestion}</li>
							))}
						</ul>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
