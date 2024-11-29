"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type UpcomingFeatureModalProps = {
	featureName: string;
	description: string;
};

export function UpcomingFeatureModal({
	featureName,
	description,
}: UpcomingFeatureModalProps) {
	const [suggestion, setSuggestion] = useState("");

	const handleSubmitSuggestion = () => {
		// In a real app, you'd send this to your backend or a service like Firebase
		console.log("Suggestion submitted:", suggestion);
		// You could also save this to localStorage for now
		const suggestions = JSON.parse(
			localStorage.getItem("featureSuggestions") || "[]"
		);
		suggestions.push({
			featureName,
			suggestion,
			timestamp: new Date().toISOString(),
		});
		localStorage.setItem("featureSuggestions", JSON.stringify(suggestions));
		setSuggestion("");
		// Here you would typically close the modal or show a success message
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{featureName}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{featureName}</DialogTitle>
					<DialogDescription>
						This functionality is coming soon. {description}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="suggestion">
							Have a suggestion for this feature?
						</Label>
						<Textarea
							id="suggestion"
							value={suggestion}
							onChange={(e) => setSuggestion(e.target.value)}
							placeholder="Your suggestion here..."
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleSubmitSuggestion} type="submit">
						Submit Suggestion
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
