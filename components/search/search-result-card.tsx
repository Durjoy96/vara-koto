"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Circle, CircleDashedIcon, Info, MapPin } from "lucide-react";
import { englishToBanglaNumber } from "@/utils/english-to-bangla-number";
import { Badge } from "../ui/badge";
import { VehicleToGari } from "@/utils/vehicle-to-gari";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

function VehicleCard({ vehicle }: { vehicle: string }) {
  return (
    <span className="inline-flex flex-col items-center bg-secondary py-1 px-3 rounded-lg text-sm text-muted-foreground border border-border">
      <img
        src={`/vehicles/${vehicle}.png`}
        alt={vehicle}
        width={40}
        height={40}
        className="object-contain"
      />
      {VehicleToGari(vehicle)}
    </span>
  );
}

export default function SearchResultCard({
  data,
  buttons,
}: {
  data?: any;
  buttons: boolean;
}) {
  return (
    <Card className="w-full transition-all gap-2 hover:border-primary/50 shadow-sm hover:shadow-md">
      <CardHeader className="relative">
        {data?.district && (
          <CardTitle className="absolute top-0 right-4 flex justify-end">
            <Badge variant="outline" className="text-muted-foreground">
              {data?.district}
            </Badge>
          </CardTitle>
        )}
        <CardDescription className="flex items-center gap-2 text-base lg:text-lg font-semibold text-card-foreground">
          <div className="flex flex-col items-center gap-0">
            <Circle className="w-4 h-4 text-primary" />
            <div className="w-px h-[15px] border border-dashed border-muted-foreground"></div>
            <CircleDashedIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-card-foreground max-w-[380px] truncate">
              {data?.original_from || "From Destination"}
            </span>
            <span className="text-card-foreground max-w-[380px] truncate">
              {data?.original_to || "To Destination"}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-xs lg:text-sm font-medium text-muted-foreground">
            যানবাহন
          </p>
          <div className="flex gap-2 mt-1">
            {data?.vehicles.map((v: string, idx: number) => (
              <VehicleCard key={idx} vehicle={v} />
            ))}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs lg:text-sm font-medium text-muted-foreground mb-1">
            ভাড়া
          </p>
          <div className="flex items-center justify-between">
            <p className="-mt-2 text-3xl lg:text-4xl text-primary font-extrabold tracking-tight">
              ৳ {englishToBanglaNumber(data?.fare || 0)}
            </p>
            {buttons && (
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">edit</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Comming soon</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">delete</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Comming soon</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      {data?.tips && (
        <CardFooter className="gap-1">
          <Info className="w-3 h-3 text-muted-foreground" />{" "}
          <span className="text-xs text-muted-foreground">{data?.tips}</span>
        </CardFooter>
      )}
    </Card>
  );
}
