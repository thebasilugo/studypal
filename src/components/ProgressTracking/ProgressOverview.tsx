"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ProgressData = {
	totalFlashcards: number;
	flashcardsLearned: number;
	studyTimeToday: number;
	studyTimeGoal: number;
	averageGrade: number;
};

export function ProgressOverview() {
	const [progressData, setProgressData] = useState<ProgressData>({
		totalFlashcards: 0,
		flashcardsLearned: 0,
		studyTimeToday: 0,
		studyTimeGoal: 120, // 2 hours in minutes
		averageGrade: 0,
	});

	useEffect(() => {
		// In a real application, this data would come from your state management or API
		// For now, we'll use mock data
		const mockData: ProgressData = {
			totalFlashcards: 50,
			flashcardsLearned: 30,
			studyTimeToday: 90, // 1.5 hours in minutes
			studyTimeGoal: 120, // 2 hours in minutes
			averageGrade: 85,
		};
		setProgressData(mockData);
	}, []);

	const calculatePercentage = (value: number, total: number) => {
		return Math.round((value / total) * 100);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Progress Overview</CardTitle>
				<CardDescription>
					Track your study progress and achievements
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<div className="flex justify-between mb-1">
						<span className="text-sm font-medium">Flashcards Learned</span>
						<span className="text-sm font-medium">
							{progressData.flashcardsLearned} / {progressData.totalFlashcards}
						</span>
					</div>
					<Progress
						value={calculatePercentage(
							progressData.flashcardsLearned,
							progressData.totalFlashcards
						)}
					/>
				</div>
				<div>
					<div className="flex justify-between mb-1">
						<span className="text-sm font-medium">Study Time Today</span>
						<span className="text-sm font-medium">
							{progressData.studyTimeToday} / {progressData.studyTimeGoal}{" "}
							minutes
						</span>
					</div>
					<Progress
						value={calculatePercentage(
							progressData.studyTimeToday,
							progressData.studyTimeGoal
						)}
					/>
				</div>
				<div>
					<div className="flex justify-between mb-1">
						<span className="text-sm font-medium">Average Grade</span>
						<span className="text-sm font-medium">
							{progressData.averageGrade}%
						</span>
					</div>
					<Progress value={progressData.averageGrade} />
				</div>
			</CardContent>
		</Card>
	);
}
