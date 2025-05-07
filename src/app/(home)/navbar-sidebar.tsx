import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link";

interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
    items,
    open,
    onOpenChange,
}: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
            >
                <SheetHeader className="p-4 border-b">
                    <div
                        className="flex items-center"
                    >
                        <SheetTitle>
                            Menu
                        </SheetTitle>
                    </div>
                </SheetHeader>
                
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    <div className = "h-full text-left-4">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="w-full ml-4 hover:bg-black hover:text-white flex items-center text-base font-medium pb-4"
                                onClick = {() => onOpenChange(false)}
                            >
                                {item.children}
                            </Link>
                        ))}
                    </div>                    

                    <div className="border-t mt-2 pt-2">
                        <Link
                            href="/sign-in"
                            className="w-full text-left hover:bg-black hover:text-white flex items-center text-base font-medium pb-4 ml-4"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/sign-up"
                            className="w-full text-left hover:bg-black hover:text-white flex items-center text-base font-medium ml-4 pb-4"
                        >
                            Start Selling
                        </Link>
                    </div>
                </ScrollArea>

            </SheetContent>
        </Sheet>
    )
}