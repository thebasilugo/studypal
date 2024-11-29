"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { UpcomingFeatureModal } from "@/components/ui/upcoming-feature-modal";

type CourseLog = {
	id: string;
	name: string;
	weeks: { [key: number]: number };
	desirableGrade: number;
};

export function CourseLogTable() {
	const [courses, setCourses] = useState<CourseLog[]>([]);
	const [newCourseName, setNewCourseName] = useState("");
	const [newCourseDesirableGrade, setNewCourseDesirableGrade] = useState("");

	useEffect(() => {
		const savedCourses = localStorage.getItem("courseLogs");
		if (savedCourses) {
			setCourses(JSON.parse(savedCourses));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("courseLogs", JSON.stringify(courses));
	}, [courses]);

	const addCourse = () => {
		if (newCourseName && newCourseDesirableGrade) {
			setCourses([
				...courses,
				{
					id: Date.now().toString(),
					name: newCourseName,
					weeks: {},
					desirableGrade: Number(newCourseDesirableGrade),
				},
			]);
			setNewCourseName("");
			setNewCourseDesirableGrade("");
		}
	};

	const updateGrade = (courseId: string, week: number, grade: number) => {
		setCourses(
			courses.map((course) => {
				if (course.id === courseId) {
					return {
						...course,
						weeks: {
							...course.weeks,
							[week]: grade,
						},
					};
				}
				return course;
			})
		);
	};

	const getWeeks = () => {
		const allWeeks = courses.flatMap((course) =>
			Object.keys(course.weeks).map(Number)
		);
		return [...new Set(allWeeks)].sort((a, b) => a - b);
	};

	const getGradeTrend = (course: CourseLog) => {
		return Object.entries(course.weeks)
			.map(([week, grade]) => ({
				week: Number(week),
				grade,
			}))
			.sort((a, b) => a.week - b.week);
	};

	const getStudyRecommendation = (course: CourseLog) => {
		const grades = Object.values(course.weeks);
		const averageGrade =
			grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
		if (averageGrade < course.desirableGrade) {
			return `Your average grade (${averageGrade.toFixed(
				2
			)}) is below your desired grade (${
				course.desirableGrade
			}). Consider increasing your study time for this course.`;
		} else {
			return `Great job! Your average grade (${averageGrade.toFixed(
				2
			)}) is meeting or exceeding your desired grade (${
				course.desirableGrade
			}).`;
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Course Log</CardTitle>
				<CardDescription>
					Track your weekly grades and compare them to your desired grade.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 mb-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="new-course">New Course</Label>
							<Input
								id="new-course"
								value={newCourseName}
								onChange={(e) => setNewCourseName(e.target.value)}
								placeholder="Enter course name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="desirable-grade">Desirable Grade</Label>
							<Input
								id="desirable-grade"
								type="number"
								value={newCourseDesirableGrade}
								onChange={(e) => setNewCourseDesirableGrade(e.target.value)}
								placeholder="Enter desirable grade"
							/>
						</div>
					</div>
					<Button onClick={addCourse}>Add Course</Button>
				</div>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Course</TableHead>
								<TableHead>Desirable Grade</TableHead>
								{getWeeks().map((week) => (
									<TableHead key={week}>Week {week}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{courses.map((course) => (
								<TableRow key={course.id}>
									<TableCell>{course.name}</TableCell>
									<TableCell>{course.desirableGrade}</TableCell>
									{getWeeks().map((week) => (
										<TableCell key={week}>
											<Input
												type="number"
												value={course.weeks[week] || ""}
												onChange={(e) =>
													updateGrade(course.id, week, Number(e.target.value))
												}
												className="w-16"
											/>
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				{courses.map((course) => (
					<Card key={course.id} className="mt-8">
						<CardHeader>
							<CardTitle>{course.name} - Grade Trend</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<LineChart data={getGradeTrend(course)}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="week" />
									<YAxis domain={[0, 100]} />
									<Tooltip />
									<Legend />
									<Line
										type="monotone"
										dataKey="grade"
										stroke="#8884d8"
										activeDot={{ r: 8 }}
									/>
								</LineChart>
							</ResponsiveContainer>
							<div className="mt-4">
								<h4 className="font-semibold">Study Recommendation:</h4>
								<p>{getStudyRecommendation(course)}</p>
							</div>
						</CardContent>
					</Card>
				))}
				<div className="mt-8 flex justify-center">
					<UpcomingFeatureModal
						featureName="AI-Powered Study Recommendations"
						description="We're working on integrating AI to provide personalized study recommendations based on your grade trends and learning style."
					/>
				</div>
			</CardContent>
		</Card>
	);
}
