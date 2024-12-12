import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const IncludeExcludeBox = ({
    baseItems,
    setBaseItems,
    selectedItems,
    setSelectedItems,
    selectedItemsName,
    baseItemsName,
    className,
}: {
    baseItems: Array<string>;
    selectedItems: Array<string>;
    setBaseItems: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
    selectedItemsName: string;
    baseItemsName: string;
    className?: string;
}) => {
    useEffect(() => {
        setBaseItems(baseItems.filter((item) => !selectedItems.includes(item)));
    }, []);
    const handleAdd = (item: string) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems((prev) => [...prev, item]);
            setBaseItems((prev) =>
                prev.filter((baseItem) => baseItem !== item)
            );
        }
    };

    const handleRemove = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems((prev) =>
                prev.filter((selectedItem) => selectedItem !== item)
            );
            setBaseItems((prev) => [...prev, item]);
        }
    };

    return (
        <div className={cn("flex gap-2 h-full", className)}>
            <div className="border p-5 rounded-md flex flex-col w-full">
                <Label className="text-center">{selectedItemsName}</Label>
                <Separator className="my-2 " />
                {selectedItems.length > 0 ? (
                    <ScrollArea>
                        <ul className="flex flex-col">
                            {selectedItems.map((item) => (
                                <Button
                                    key={item}
                                    type="button"
                                    onClick={() => handleRemove(item)}
                                    variant="ghost"
                                >
                                    {item}
                                </Button>
                            ))}
                        </ul>
                    </ScrollArea>
                ) : (
                    <div className="bg-baseGrey flex h-full justify-center items-center rounded-md">
                        <Label>No Available Items</Label>
                    </div>
                )}
            </div>

            <div className="border p-5 rounded-md flex flex-col w-full">
                <Label className="text-center">{baseItemsName}</Label>
                <Separator className="my-2 " />
                {baseItems.length > 0 ? (
                    <ScrollArea>
                        <ul className="flex flex-col">
                            {baseItems.map((item) => (
                                <Button
                                    key={item}
                                    type="button"
                                    onClick={() => handleAdd(item)}
                                    variant="ghost"
                                >
                                    {item}
                                </Button>
                            ))}
                        </ul>
                    </ScrollArea>
                ) : (
                    <div className="bg-baseGrey flex h-full justify-center items-center rounded-md">
                        <Label>No Available Items</Label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncludeExcludeBox;
