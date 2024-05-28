"use client";

import {Follow} from "@prisma/client";
import {User} from "@prisma/client";

import {useSidebar} from "@/store/use-sidebar";

import {UserItem, UserItemSkeleton} from "./user-item";

interface FollowingProps {
    data: (Follow & {
        following: User & {
            meet: { isLive: boolean } | null;
        },
    })[];
}

export const Following = ({
                              data,
                          }: FollowingProps) => {
    const {collapsed} = useSidebar((state) => state);

    if (!data.length) {
        return null;
    }

    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4 mt-4">
                    <p className="text-sm text-muted-foreground">
                        Отслеживаемые
                    </p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl!}
                        isLive={follow.following.meet?.isLive}
                    />
                ))}
            </ul>
        </div>
    );
};

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    );
};