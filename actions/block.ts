"use server";

import {revalidatePath} from "next/cache";
import {RoomServiceClient} from "livekit-server-sdk";

import {getSelf} from "@/services/session-service";
import {blockUser, unblockUser} from "@/services/block-service"


export const onBlock = async (id: string) => {

    const self = await getSelf();

    if(!self?.id) {
        throw new Error("Вы не авторизованы");
    }

    let blockedUser;

    try {
        blockedUser = await blockUser(id, self.id!);
    } catch (err) {
        throw new Error("Ошибка при скрытии пользователя!");
    }

    return blockedUser;
};

export const onUnblock = async (id: string) => {

    const self = await getSelf();

    if(!self?.id) {
        throw new Error("Вы не авторизованы!");
    }

    let unblockedUser
    try {
        unblockedUser = await unblockUser(id, self.id!);
    } catch (err) {
        throw new Error("Ошибка при раскрытии пользователя!");
    }

    return unblockedUser;
};

