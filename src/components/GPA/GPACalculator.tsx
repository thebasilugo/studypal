"use client";

import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Course = {
	name: string;
	grade: string;
	credits: number;
};

const gradePoints: { [key: string]: number } = {
	A: 4.0,
	"A-": 3.7,
	"B+": 3.3,
	B: 3.0,
	"B-": 2.7,
	"C+": 2.3,
	C: 2.0,
	"C-": 1.7,
	"D+": 1.3,
	D: 1.0,
	"D-": 0.7,
	F: 0.0,
};

export function GPACalculator() {
	const [courses, setCourses] = useState<Course[]>([
		{ name: "", grade: "", credits: 0 },
	]);
	const [gpa, setGPA] = useState<number | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const { toast } = useToast();

	const addCourse = () => {
		setCourses([...courses, { name: "", grade: "", credits: 0 }]);
	};

	const removeCourse = (index: number) => {
		const updatedCourses = courses.filter((_, i) => i !== index);
		setCourses(updatedCourses);
	};

	const updateCourse = (
		index: number,
		field: keyof Course,
		value: string | number
	) => {
		const updatedCourses = courses.map((course, i) => {
			if (i === index) {
				return { ...course, [field]: value };
			}
			return course;
		});
		setCourses(updatedCourses);
	};

	const calculateGPA = async () => {
		setIsCalculating(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let totalPoints = 0;
		let totalCredits = 0;

		courses.forEach((course) => {
			if (course.grade && course.credits) {
				totalPoints += gradePoints[course.grade] * course.credits;
				totalCredits += course.credits;
			}
		});

		if (totalCredits > 0) {
			const calculatedGPA = Number((totalPoints / totalCredits).toFixed(2));
			setGPA(calculatedGPA);
			toast({
				title: "GPA Calculated",
				description: `Your GPA is ${calculatedGPA}`,
			});
		} else {
			toast({
				title: "Error",
				description:
					"Please enter valid grades and credits for at least one course.",
				variant: "destructive",
			});
			setGPA(null);
		}
		setIsCalculating(false);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>GPA Calculator</CardTitle>
				<CardDescription>
					Enter your courses, grades, and credits to calculate your GPA.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{courses.map((course, index) => (
					<div key={index} className="grid gap-4 mb-4">
						<div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
							<div className="space-y-2 sm:col-span-2">
								<Label htmlFor={`course-${index}`}>Course</Label>
								<Input
									id={`course-${index}`}
									value={course.name}
									onChange={(e) => updateCourse(index, "name", e.target.value)}
									placeholder="Course name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor={`grade-${index}`}>Grade</Label>
								<Select
									value={course.grade}
									onValueChange={(value) => updateCourse(index, "grade", value)}
								>
									<SelectTrigger id={`grade-${index}`}>
										<SelectValue placeholder="Select grade" />
									</SelectTrigger>
									<SelectContent>
										{Object.keys(gradePoints).map((grade) => (
											<SelectItem key={grade} value={grade}>
												{grade}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor={`credits-${index}`}>Credits</Label>
								<div className="flex items-center space-x-2">
									<Input
										id={`credits-${index}`}
										type="number"
										value={course.credits || ""}
										onChange={(e) =>
											updateCourse(index, "credits", Number(e.target.value))
										}
										placeholder="Credits"
									/>
									<LoadingButton
										variant="outline"
										size="icon"
										onClick={() => removeCourse(index)}
										className="flex-shrink-0"
									>
										<Trash2 className="h-4 w-4" />
									</LoadingButton>
								</div>
							</div>
						</div>
					</div>
				))}
				<LoadingButton
					onClick={addCourse}
					variant="outline"
					className="w-full mt-2"
				>
					Add Course
				</LoadingButton>
			</CardContent>
			<CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
				<LoadingButton
					onClick={calculateGPA}
					isLoading={isCalculating}
					className="w-full sm:w-auto"
				>
					Calculate GPA
				</LoadingButton>
				{gpa !== null && <div className="text-2xl font-bold">GPA: {gpa}</div>}
			</CardFooter>
		</Card>
	);
}
