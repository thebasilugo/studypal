"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { UpcomingFeatureModal } from "@/components/ui/upcoming-feature-modal";

export function AITutor() {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	const handleSubmit = () => {
		// Placeholder for AI integration
		setAnswer(
			"This feature is coming soon! We're working on integrating a powerful AI model to answer your questions and help with your studies."
		);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>AI Tutor</CardTitle>
				<CardDescription>
					Ask questions and get AI-powered assistance with your studies.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Textarea
					placeholder="Type your question here..."
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					rows={4}
				/>
				<Button onClick={handleSubmit} className="w-full">
					Ask AI Tutor
				</Button>
				{answer && (
					<div className="mt-4 p-4 bg-secondary rounded-md">
						<h4 className="font-semibold mb-2">Answer:</h4>
						<p>{answer}</p>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-center space-x-4">
				<UpcomingFeatureModal
					featureName="Subject-Specific Tutoring"
					description="We're working on AI models specialized in various subjects to provide more accurate and in-depth assistance."
				/>
				<UpcomingFeatureModal
					featureName="Interactive Problem Solving"
					description="Soon, you'll be able to solve problems step-by-step with AI guidance."
				/>
			</CardFooter>
		</Card>
	);
}
