"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	children: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
	({ className, isLoading, children, ...props }, ref) => {
		return (
			<Button
				className={cn(className)}
				disabled={isLoading}
				ref={ref}
				{...props}
			>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Loading...
					</>
				) : (
					children
				)}
			</Button>
		);
	}
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
