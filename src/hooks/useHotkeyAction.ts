/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { useEffect, useRef } from 'react';

import {
    HotkeyActionType,
    type HotkeyEvent,
    hotkeyEventManager,
    type HotkeySubscriber,
} from '../utils/hotkeyEventManager';

export const useHotkeyAction = (
    actionType: HotkeyActionType,
    handler: HotkeySubscriber,
) => {
    const handlerRef = useRef(handler);
    handlerRef.current = handler;

    useEffect(() => {
        const stableHandler: HotkeySubscriber = (...args) =>
            handlerRef.current(...args);
        const unsubscribe = hotkeyEventManager.subscribe(
            actionType,
            stableHandler,
        );
        return unsubscribe;
    }, [actionType]);
};

export type { HotkeyEvent, HotkeySubscriber };
export { HotkeyActionType };
