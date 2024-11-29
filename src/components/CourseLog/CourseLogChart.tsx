"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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

type CourseLog = {
	id: string;
	name: string;
	weeks: { [key: number]: number };
	desirableGrade: number;
};

type Props = {
	courses: CourseLog[];
};

export function CourseLogChart({ courses }: Props) {
	const [selectedCourse, setSelectedCourse] = useState<string | null>(
		courses[0]?.id || null
	);

	const getChartData = () => {
		const course = courses.find((c) => c.id === selectedCourse);
		if (!course) return [];

		return Object.entries(course.weeks).map(([week, grade]) => ({
			week: `Week ${week}`,
			grade,
			desirableGrade: course.desirableGrade,
		}));
	};

	const chartData = getChartData();

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Grade Progress Chart</CardTitle>
				<CardDescription>
					Visualize your grade progress over time
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<Select
						value={selectedCourse || undefined}
						onValueChange={setSelectedCourse}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a course" />
						</SelectTrigger>
						<SelectContent>
							{courses.map((course) => (
								<SelectItem key={course.id} value={course.id}>
									{course.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="week" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="grade"
								stroke="#8884d8"
								name="Actual Grade"
							/>
							<Line
								type="monotone"
								dataKey="desirableGrade"
								stroke="#82ca9d"
								name="Desirable Grade"
								strokeDasharray="5 5"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
